import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import MenuInventario from '../Menus/MenuInventario';
import Swal from 'sweetalert2'

const URI = 'http://localhost:8000/productos/imagenes';
const URIproductos = 'http://localhost:8000/producto/';


const ProductosTable = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);

    const getProductos = async () => {
        try {
            const res = await axios.get(URI);
            // console.log('Datos recibidos:', res.data);  
            // Verifica la respuesta del servidor
            if (Array.isArray(res.data)) {
                setProductos(res.data);
            } else {
                console.error('Los productos no son un array:', res.data);
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };
    useEffect(() => {
        getProductos();
    }, []);

    const deleteProducto = async (id) => {
        try {
          // Realizamos la petición DELETE
          const respuesta = await axios.delete(`${URIproductos}${id}`);
          
          // Si la eliminación fue exitosa, mostramos el mensaje de éxito
          Swal.fire({
            title: 'Producto eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            getProductos();  // Actualizamos los productos después de la eliminación
          });
      
        } catch (error) {
          // Manejo de errores: mostramos un mensaje con la respuesta del error
          if (error.response && error.response.data) {
            // Si el error viene con un mensaje específico del servidor
            const mensajeError = error.response.data.message || 'Hubo un error al eliminar el producto. Intenta nuevamente.';
            Swal.fire({
              title: 'Error al eliminar el producto',
              text: mensajeError,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          } else {
            // Si el error es desconocido
            Swal.fire({
              title: 'Error desconocido',
              text: 'Hubo un problema al eliminar el producto. Intenta nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        }
      };
    return (
        <div>
            <MenuInventario/>
            <main className="main-container">
                <div className="page-title">
                    <h1>Productos</h1>
                </div>

                <section className="section">
                    <div className="card-custom">
                        <div className="card-body">
                            <h5 className="card-title-custom">Listado de Productos</h5>
                            <button className="button-add-custom" onClick={() => { navigate('/addproductos') }}>
                                Agregar Producto
                            </button>

                            {/* Tabla personalizada */}
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th className="table-header-custom">COD</th>
                                        <th className="table-header-custom">IMAGEN</th>
                                        <th className="table-header-custom">NOMBRE</th>
                                        <th className="table-header-custom">DETALLE</th>
                                        <th className="table-header-custom">CANTIDAD</th>
                                        <th className="table-header-custom">CATEGORIA</th>
                                        <th className="table-header-custom">PRECIO VENTA</th>
                                        <th className="table-header-custom">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((product) => (
                                        <tr key={product.id}>
                                            <td className="table-cell-custom">{product.id}</td>
                                            <td>
                                                {product.imagen && (
                                                    <img
                                                        className="imagenTable"
                                                        src={`data:image/jpeg;base64,${product.imagen}`}
                                                        alt={product.nombre}
                                                    />
                                                )}
                                            </td>
                                            <td className="table-cell-custom">{product.nombre}</td>
                                            <td className="table-cell-custom">{product.detalle}</td>
                                            <td className="table-cell-custom">{product.cantidad}</td>
                                            <td className="table-cell-custom">{product.categoria}</td>
                                            <td className="table-cell-custom">{product.precioVenta} bs</td>
                                            <td className="acciones_producto-custom">
                                                <Link to={`/editProductos/${product.id}`} className="button-edit-custom">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <button onClick={() => deleteProducto(product.id)} className="button-delete-custom">
                                                    <i className="fa-solid fa-trash text-light"></i> Borrar
                                                </button>
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

export default ProductosTable