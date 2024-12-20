import React, { useEffect, useState } from 'react'
import { useCart } from '../../CartProvider'
import axios from 'axios';
import Cart from '../Carrito/Carrito';
import MenuInventario from '../Menus/MenuInventario';

const URI = 'http://localhost:8000/productos/imagenes';
const URIproductos = 'http://localhost:8000/producto';

const Productos = ({ products }) => {

    const [productos, setProductos] = useState([]);
    const { addToCart } = useCart();
    const getProductos = async () => {
        try {
            const res = await axios.get(URI);
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



    return (
        <div>
            <MenuInventario />
            <div className="container-productos-ninos">
                <h1>Productos Delizia Helados</h1>
                <div className="productos-layout">
                    <div className="carrito-lateral">
                        <Cart />
                    </div>
                    <div className="productos-lista">
                        <div className="tarjetas-contenedor">
                            {productos.map((product) => (
                                <div className="tarjeta" key={product.id}>
                                    {product.imagen && (
                                        <img
                                            className="imagen-productos"
                                            src={`data:image/jpeg;base64,${product.imagen}`}
                                            alt={product.nombre}
                                        />
                                    )}
                                    <h2>{product.nombre}</h2>
                                    <p>{product.detalle}</p>
                                    <p> Cantidad disponible: <strong>{product.cantidad}</strong></p>
                                    <p className="precio"> Precio por unidad: <strong>{product.precioVenta}</strong></p>
                                    <button onClick={() => addToCart(product)} className="btn-comprar">
                                        Agregar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="volver-al-index">
                    <a href="/">
                        <button>Volver al Inicio</button>
                    </a>
                </div>
            </div>
        </div>


    )
}

export default Productos