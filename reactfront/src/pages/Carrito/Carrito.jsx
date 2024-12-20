import React, { useEffect } from 'react';
import { useCart } from '../../CartProvider';
import './cart.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useState } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [metodoPago, setMetodoPago] = useState()
  const [idCliente, setIdCliente] = useState()
  const [nombreCliente, setNombreCliente] = useState()
  const [pedidoID, setPedidoID] = useState('')
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.precioVenta * item.quantity, 0);

  const fechaHoy = new Date(); 
  fechaHoy.setDate(fechaHoy.getDate() + 2);
  const fechaEntrega = fechaHoy.toISOString();
  useEffect(() => {
    const idGuardado = localStorage.getItem('id');
    const nombreGuardado = localStorage.getItem('nombre');
    console.log(idGuardado)
    if (idGuardado) {
      setIdCliente(idGuardado);
    } else {
      setIdCliente(1);
    }
    if (nombreGuardado) {
      setNombreCliente(nombreGuardado);
    } else {
      setNombreCliente(1);
    }
  }, []);
    const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('FACTURA DE COMPRA', 105, 10, { align: 'center' }); 
    
    doc.setFontSize(12);
    
    doc.text('Fecha:', 14, 30);
    doc.text(new Date().toLocaleString(), 50, 30);
    
    doc.text('Cliente:', 14, 40);
    doc.text(nombreCliente, 50, 40); 
    
    doc.text('Método de Pago:', 14, 50);
    doc.text(metodoPago, 50, 50); 
    const columns = ['Producto', 'Cantidad', 'Precio Unitario', 'Subtotal'];
    const data = cart.map((item) => [
      item.nombre,
      item.quantity,
      `$${parseFloat(item.precioVenta).toFixed(2)}`,
      `$${(item.precioVenta * item.quantity).toFixed(2)}`,
    ]);

    doc.autoTable({
      startY: 60,
      head: [columns],
      body: data,
    });

    const total = cart.reduce((sum, item) => sum + item.precioVenta * item.quantity, 0);
    doc.text(`Total: Bs${total.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save(`Factura.pdf`);
  };
  const registrarPedido = async () => {
    const cantidadesSuficientes = await Promise.all(
      cart.map(async (item) => {
        const respuestaProducto = await axios.get(`http://localhost:8000/producto/${item.id}`);
        const cantidadDisponible = respuestaProducto.data.cantidad; 
        if (item.quantity > cantidadDisponible) {
          return { id: item.id, cantidadDisponible, cantidadSolicitada: item.quantity };
        }
        return null;
      })
    );
    const productosConError = cantidadesSuficientes.filter((item) => item !== null);
    if (productosConError.length > 0) {
      let mensajeError = "No hay suficiente cantidad para los siguientes productos:\n";
      productosConError.forEach((item) => {
        mensajeError += `Producto: ${item.id}, Disponible: ${item.cantidadDisponible}, Solicitado: ${item.cantidadSolicitada}\n`;
      });
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error en la cantidad de productos',
        text: mensajeError,
        showConfirmButton: true,
      });
      return;
    }
    const pedido = {
      fecha: new Date().toISOString(),
      estado: 'Pendiente', 
      total,
      fechaEntrega: fechaEntrega,
      metodo_pago: metodoPago, 
      Usuario_idUsuario: 5,
      Cliente_idCliente: idCliente,
    };
    try {
      const URIpedido = 'http://localhost:8000/pedido/'; 
      const respuestaPedido = await axios.post(URIpedido, pedido);
      console.log('Respuesta del Pedido:', respuestaPedido.data);
      const pedidoId = respuestaPedido.data.id; 
      setPedidoID(pedidoId); 
      console.log("pedido id : ......."+ pedidoId)
      const URIdetallepedido = 'http://localhost:8000/detalle_pedido/';
      const detalles = cart.map((item) => ({
        cantidad: item.quantity,
        precio_unitario: parseFloat(item.precioVenta),
        subtotal: parseFloat(item.precioVenta * item.quantity),
        Producto_idProducto: item.id,
        pedido_idOrden: pedidoId,
      }));

      const respuestaDetalles = await axios.post(URIdetallepedido, detalles);
      console.log('Detalles registrados:', respuestaDetalles.data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Pedido creado correctamente!',
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        generarPDF();
        clearCart(); 
        navigate('/'); 
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


  return (
    <div className="cart-container">
      <h2>Carrito de compras</h2>

      <label className="payment-method">
        <span>Metodo de pago:</span>
        <select
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

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <p className="cart-item-title">{item.nombre} (x{item.quantity})</p>
          <p>Subtotal: {item.precioVenta * item.quantity}bs</p>
          <button onClick={() => removeFromCart(item.id)} className="remove-btn">
            Eliminar
          </button>
        </div>
      ))}

      <h3 className="cart-total">Total: Bs{total}</h3>

      <button onClick={registrarPedido} className="cart-submit-btn" disabled={!cart.length}>
        Realizar pedido
      </button>
    </div>
  );
};

export default Cart;
