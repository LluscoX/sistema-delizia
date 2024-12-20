import React from 'react'
import './productosmascotas.css'

const ProductosMascotas = () => {
    return (
        <div className='container-mascotas'>
            <h1>Productos para Mascotas</h1>

            <div class="tarjetas-contenedor">
                <div class="tarjeta">
                    <img src="imagenes/Mascotas/Imagen de WhatsApp 2024-11-18 a las 12.42.25_07d712c7.jpg" alt="Producto 1"/>
                        <h2>Pack Argus 250 ml X6</h2>
                        <p>Descripción breve del producto para mascotas 1.</p>
                        <p class="precio">$10.00</p>
                        <button class="btn-comprar">Comprar</button>
                </div>

                <div class="tarjeta">
                    <img src="imagenes/Mascotas/Imagen de WhatsApp 2024-11-18 a las 12.42.37_ac2d4921.jpg" alt="Producto 2"/>
                        <h2>Pack Argus 150 ml X6</h2>
                        <p>Descripción breve del producto para mascotas 2.</p>
                        <p class="precio">$20.00</p>
                        <button class="btn-comprar">Comprar</button>
                </div>

            </div>

            <div class="volver-al-index">
                <a href="/">
                    <button>Volver al Inicio</button>
                </a>
            </div>
        </div>
    )
}

export default ProductosMascotas