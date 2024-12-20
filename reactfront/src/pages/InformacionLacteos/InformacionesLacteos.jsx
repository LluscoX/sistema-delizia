import React from 'react'
import './InformacionLacteos.css'

const InformacionesLacteos = () => {
    return (

        <div className='container-infoLacteos '>
            <header className='header-infolacteos'>
                <h1 className='titleinfolacteos'>Información sobre Lácteos Delizia</h1>
                <p className='pInfoLacteos'>Conoce nuestra variedad de productos lácteos de alta calidad.</p>
            </header>

            <section class="descripcion">
                <h2>Productos Lácteos de Calidad</h2>
                <p>En Delizia ofrecemos una amplia gama de productos lácteos frescos y saludables, elaborados con los más altos estándares de calidad. Nuestros productos están pensados para ofrecerte lo mejor en cada momento del día, con el sabor auténtico y la frescura que te mereces.</p>
            </section>

            <section class="categorias">
                <h2>Categorías de Productos</h2>
                <div class="categoria">
                    <h3>Yogures</h3>
                    <p>Yogures naturales y saborizados, ideales para un desayuno o merienda saludable.</p>
                    <img src="imagenes/YOGURT.jpg" alt="Yogur Delizia"/>
                </div>
                <div class="categoria">
                    <h3>Leche</h3>
                    <p>Leche fresca, con todos los nutrientes esenciales para tu salud. Ideal para toda la familia.</p>
                    <img src="imagenes/LECHE.jpg" alt="Leche Delizia"/>
                </div>
                <div class="categoria">
                    <h3>Quesos</h3>
                    <p>Una selección de quesos frescos y curados, perfectos para acompañar tus platillos favoritos.</p>
                    <img src="imagenes/CREMAUNTABLE.jpg" alt="Queso Delizia"/>
                </div>

            </section>
            <div class="volver-al-index">
                <a href="/">
                    <button>Volver al Inicio</button>
                </a>
            </div>

            <footer>
                <p>&copy; 2024 Delizia Lácteos. Todos los derechos reservados.</p>
            </footer></div>
    )
}

export default InformacionesLacteos