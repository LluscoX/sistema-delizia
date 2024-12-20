import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MenuInventario from '../Menus/MenuInventario';
const URI = 'http://localhost:8000/detalle_ventas/';
const Verventas = () => {
    const navigate = useNavigate();
    const [fecha, setFecha] = useState('')
    const [estado, setEstado] = useState('')
    const [total, setTotal] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [metodo_pago, setMetodo_pago] = useState('')
    const [Tienda_idTienda, setTienda_idTienda] = useState('')
    const [Cliente_idCliente, setCliente_idCliente] = useState('')
    const [pedidos, setPedidos] = useState([])
    const getPedidos = async () => {
        const res = await axios.get(URI);
        console.log(res)
        setPedidos(res.data);
    };
    useEffect(() => {
        getPedidos();
    }, []);

    const cambiarEstadoPedido = async (pedidoId) => {
        try {
            const respuesta = await axios.put(`http://localhost:8000/pedido/${pedidoId}`, {
                estado: 'Entregado'
            });
            console.log('Estado actualizado:', respuesta.data); // Verifica la respuesta
            alert('El pedido ha sido marcado como entregado');
        } catch (error) {
            console.error('Error al cambiar el estado del pedido:', error);
            alert('Hubo un error al actualizar el estado del pedido');
        }
    };
    const handleCambiarEstado = (pedidoId) => {
        cambiarEstadoPedido(pedidoId);
        useEffect(() => {
            getPedidos();
        }, []);
    };
    return (
        <div>
        <MenuInventario />
        <main className="main-container">
            <div className="page-title">
                <h1>Ventas Realizadas</h1>
            </div>
    
            <section className="section">
                <div className="card-custom">
                    <div className="card-body">
                        <h5 className="card-title-custom">Listado de Ventas</h5>
    
                        <table className="table-custom">
                            <thead>
                                <tr>
                                    <th className="table-header-custom">COD</th>
                                    <th className="table-header-custom">FECHA</th>
                                    <th className="table-header-custom">TOTAL</th>
                                    <th className="table-header-custom">ESTADO</th>
                                    <th className="table-header-custom">FECHA ENTREGA</th>
                                    <th className="table-header-custom">METODO DE PAGO</th>
                                    <th className="table-header-custom">CLIENTE</th>
                                    <th className="table-header-custom">DETALLES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.map((pedi) => (
                                    <tr key={pedi.id}>
                                        <td className="table-cell-custom">{pedi.id_pedido}</td>
                                        <td className="table-cell-custom">{pedi.fecha}</td>
                                        <td className="table-cell-custom">{pedi.cantidad_total}</td>
                                        <td className="table-cell-custom">{pedi.estado}</td>
                                        <td className="table-cell-custom">{pedi.fechaEntrega}</td>
                                        <td className="table-cell-custom">{pedi.metodo_pago}</td>
                                        <td className="table-cell-custom">{pedi.nombre}</td>
                                        <td className="table-cell-custom">
                                            <button onClick={() => handleCambiarEstado(pedi.id_pedido)} className="button-edit-custom">
                                                Cambiar Estado
                                            </button>
                                            <Link to={`/detalleVenta/${pedi.id_pedido}`} className="button-view-custom">
                                                <i className="fa-solid fa-eye"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
    
                    </div>
                </div>
            </section>
        </main>
    </div>
    
    )
}

export default Verventas