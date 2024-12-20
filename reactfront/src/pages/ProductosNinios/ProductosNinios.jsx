import React, { useEffect, useState } from 'react'
import './ProductosNinios.css'
import { useCart } from '../../CartProvider'
import axios from 'axios';
import Cart from '../Carrito/Carrito';

const URI = 'http://localhost:8000/producto';

const ProductosNinios = ({ products }) => {

    const [productos, setProductos] = useState([]);

    const { addToCart } = useCart();

    const getProductos = async () => {
        const res = await axios.get(URI);
        setProductos(res.data);
    };
    useEffect(() => {
        getProductos();
    }, []);

    return (
        <div className='container-productos-ninos'>

            <h1>Productos</h1>
            
            <Cart/>

            <div class="tarjetas-contenedor">
            </div>
            

            <div class="volver-al-index">
                <a href="/">
                    <button>Volver al Inicio</button>
                </a>
            </div>





        </div>
    )
}

export default ProductosNinios