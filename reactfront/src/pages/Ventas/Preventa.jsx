import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Preventa.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// import autoTable from 'jspdf-autotable';
// import 'jspdf-autotable';
// import { jsPDF } from "jspdf";



const URItiendas = 'http://localhost:8000/tienda/'
const URIusuarios = 'http://localhost:8000/usuario/'
const URIclientes = 'http://localhost:8000/cliente/'
const URIproducto = 'http://localhost:8000/producto'
const URIpedido = 'http://localhost:8000/pedido'
const URIdetallepedido = 'http://localhost:8000/detalle_pedido'


const URIproductoInventario = 'http://localhost:8000/productosedit'


const Preventa = () => {
    const location = useLocation(); // Obtiene la ubicación actual

    const { nombreTiendademapa } = location.state || {};  // Accede a nombreTienda desde el state

    const navigate = useNavigate();
    const [tiendas, setTiendas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    const [total, setTotal] = useState(0);
    const [metodoPago, setMetodoPago] = useState('');
    const [clienteSeleccionado, setClienteSeleccionado] = useState('');
    const [tiendaSeleccionada, setTiendaSeleccionada] = useState('');
    const [nombreGuardado, setNombreGuardado] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [estadoPedido, setEstadoPedido] = useState('')
    const [cantidad , setCantidad] = useState('')

    useEffect(() => {

        getTiendas();
        getProductos();
        getClientes();
        const nombreGuardado = localStorage.getItem('nombre');
        if (nombreGuardado) {
            setNombreGuardado(nombreGuardado);
        }

    }, []);

    const getTiendas = async () => {
        try {
            const respuesta = await axios.get(URItiendas);
            const data = respuesta.data;
            const TiendasExtraidos = data.map(item => ({
                id: item.id, 
                nombreTienda: item.nombreTienda,
            }));
            setTiendas(TiendasExtraidos);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getClientes = async () => {
        try {
            const respuesta = await axios.get(URIclientes);
            const data = respuesta.data;
            const ClienteSeleccionado = data.map(item => ({
                id: item.id, 
                nombre: item.nombre,
            }));
            setClientes(ClienteSeleccionado);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getProductos = async () => {
        try {
            const respuesta = await axios.get(URIproducto);
            setProductos(respuesta.data);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };
    const agregarProducto = (productoId) => {
        const producto = productos.find(p => p.id === parseInt(productoId));
        if (!producto) return;
        
        const productoExistente = productosSeleccionados.find(p => p.id === producto.id);
        if (productoExistente) {
            setProductosSeleccionados(prev =>
                prev.map(p => p.id === producto.id
                    ? { ...p, cantidad: p.cantidad + 1, subtotal: (p.cantidad + 1) * p.precioVenta }
                    : p
                )
            );
        } else {
            setProductosSeleccionados(prev => [
                ...prev,
                { ...producto, cantidad: 1, subtotal: producto.precioVenta }
            ]);
        }
    };
    const actualizarCantidad = (id, nuevaCantidad) => {
        setProductosSeleccionados(prev =>
            prev.map(p => p.id === id
                ? { ...p, cantidad: nuevaCantidad, subtotal: nuevaCantidad * p.precioVenta }
                : p
            )
        );
    };
    const eliminarProducto = (id) => {
        setProductosSeleccionados(prev => prev.filter(p => p.id !== id));
    };

    const registrarPedido = async () => {
        const pedido = {
            fecha: new Date().toISOString(),
            estado: estadoPedido,
            total: total,
            fechaEntrega: fechaEntrega,
            metodo_pago: metodoPago,
            Tienda_idTienda: tiendaSeleccionada,
            Usuario_idUsuario: 1, 
            Cliente_idCliente: tiendaSeleccionada,
        };
        try {
            const respuestaPedido = await axios.post(URIpedido, pedido);
            console.log('Respuesta del Pedido:', respuestaPedido.data);  
            const pedidoId = respuestaPedido.data.id;  
            const detalles = productosSeleccionados.map(producto => ({
                cantidad: producto.cantidad,
                precio_unitario: parseFloat(producto.precioVenta),  
                subtotal: parseFloat(producto.subtotal), 
                Producto_idProducto: producto.id,
                pedido_idOrden: pedidoId
            }));
            console.table(detalles);  
            const respuestaDetalles = await axios.post(URIdetallepedido, detalles);
            console.log('Detalles registrados:', respuestaDetalles.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "PEDIDO CREADO CORRECTAMENTE!",
                showConfirmButton: true,
                timer: 1500
            }).then(() => {
                navigate('/verVentas')
            });
        } catch (error) {
            if (error.response) {
                console.error('Error del servidor:', error.response.data);
                alert(`Error: ${error.response.data.message}`);
            } else {
                console.error('Error desconocido:', error);
                alert('Error al registrar pedido. Inténtalo nuevamente.');
            }
        }
    };


    useEffect(() => {
        const nuevoTotal = productosSeleccionados.reduce((sum, p) => sum + (parseFloat(p.subtotal) || 0), 0);
        setTotal(nuevoTotal);

    }, [productosSeleccionados]);


    return (
        <div id="main" className="main">
            <div className="container">
                <h2>Vendedor(a): {nombreGuardado}</h2>
                <label className="label_preventa">
                    <span>Tienda:</span>
                    <select
                        onChange={(e) => setTiendaSeleccionada(e.target.value)}
                        className="search-bar"
                        required
                    >
                        <option value='' >SELECCIONE LA TIENDA...</option>
                        {tiendas.map(tienda => (
                            <option key={tienda.id} value={tienda.id} >
                                {tienda.nombreTienda}
                            </option>
                        ))}
                    </select>
                </label>


                <label className="label_preventa">
                    <span>Fecha de entrega:</span>
                    <input className='search-bar' type="date" onChange={(e) => setFechaEntrega(e.target.value)} />
                </label>

                <label className="label_preventa">
                    <span>Estado:</span>
                    <select
                        name=""
                        id=""
                        className="search-bar"
                        required
                        onChange={(e) => setEstadoPedido(e.target.value)}

                    >
                        <option value="">SELECCIONE EL ESTADO...</option>
                        <option value='Pendiente'>Pendiente </option>
                        <option value='Entregado'>Entregado </option>
                    </select>
                </label>

                <label className="label_preventa">
                    <span>Metodo de pago:</span>
                    <select
                        name=""
                        id=""
                        required
                        className="search-bar"
                        onChange={(e) => setMetodoPago(e.target.value)}

                    >
                        <option value="">SELECCIONE EL METODO DE PAGO...</option>
                        <option value='QR'>QR </option>
                        <option value='Efectivo'>EFECTIVO </option>
                        <option value='Tarjeta'>TARJETA </option>
                    </select>
                </label>


                <label className="label_preventa">
                    <span>Producto:</span>
                    <select
                        onChange={(e) => agregarProducto(e.target.value)}
                        className="search-bar"
                        required
                    >
                        <option value="">BUSQUE UN PRODUCTO AQUÍ...</option>
                        {productos.map(producto => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>
                </label>




                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cant.</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                            <th>Quitar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosSeleccionados.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={producto.cantidad}
                                        min="1"
                                        onChange={(e) => actualizarCantidad(producto.id, parseInt(e.target.value))}
                                    />
                                </td>
                                <td>{parseFloat(producto.precioVenta).toFixed(2)}</td>
                                <td>{parseFloat(producto.subtotal).toFixed(2)}</td>
                                <td>
                                    <button className='button-delete' onClick={() => eliminarProducto(producto.id)}><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="summary">
                    <div className="summary-item">TOTAL: <span>{parseFloat(total).toFixed(2)}</span></div>
                </div>

                <div className="buttons">
                    <button className="btn btn-success" onClick={registrarPedido}>Cobrar</button>
                    <button className="btn btn-danger" onClick={() => navigate('/')}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default Preventa;
