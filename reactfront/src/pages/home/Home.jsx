import React, { useEffect, useState } from 'react'
import '../../assets/css/styles.css'
import logoDelizia from '../../assets/img/logoDeliziaFondo.png'
import { useNavigate } from 'react-router-dom';
import MenuInventario from '../Menus/MenuInventario';



const Home = () => {
    const navigate = useNavigate();

    return (
        <div >
            <MenuInventario/>
            {/* <!-- Header --> */}
            {/* <header>
                <img src={logoDelizia} alt="Logo de Delizia" />
                <label className='text-light' htmlFor=""> {nombre}</label>
                <label className='text-light' htmlFor=""> {rol}</label>
                <nav>
                    <a href="/">Inicio</a>
                    <a href="/registro">Regístrate</a>
                    <a href="/login">Iniciar Sesion</a>
                    <a href="recetas">Recetas DELIZIA</a>
                    <a href="/sucursales">Nuestras Sucursales</a>
                    <a href="/contacto">Contáctanos</a>
                    <a href="/menuinventario"> Inventario</a>
                    <a  onClick={logout}>Cerrar Sesion</a>
                </nav>
            </header> */}

            {/* <!-- Sección Hero --> */}
            <section class="hero">
                <h1>Productos Lácteos Frescos</h1>
                <p>Descubre nuestra selección de leche fresca, yogurt y queso directamente de nuestras granjas. Calidad garantizada para ti y tu familia.</p>
                <a href="/productos">Ver productos</a>
            </section>

            {/* <!-- Sección Historia de la Lechería --> */}
            <section class="historia-lecheria">
                <h2>Historia de la Lechería</h2>
                <p>La lechería ha sido una parte esencial de nuestra cultura alimentaria durante siglos. Desde las antiguas civilizaciones hasta las modernas granjas de hoy, la producción de lácteos ha evolucionado, pero sigue manteniendo la misma misión: brindar productos frescos y nutritivos a las familias. En Delizia, combinamos las mejores prácticas tradicionales con tecnología avanzada para garantizar que cada vaso de leche y cada bocado de queso sea de la más alta calidad.</p>
            </section>

            {/* <!-- Sección de tarjetas --> */}
            <div class="tarjetas-contenedors">
                <div class="tarjeta">
                    <h2>Productos Artesanales</h2>
                    <p>Nuestros lácteos y helados artesanales son elaborados con técnicas tradicionales, ofreciendo un sabor auténtico y único en cada bocado.</p>
                    <a href="/productosnacionales" class="btn">Explorar sobre lácteos y helados</a>
                </div>
                <div class="tarjeta">
                    <h2>Beneficios de los Lácteos</h2>
                    <p>Los productos lácteos son esenciales para una dieta equilibrada. Ricos en calcio y vitaminas, son ideales para mantener tus huesos fuertes.</p>
                    <a href="/InfoLacteos" class="btn">Conoce más</a>
                </div>
                <div class="tarjeta">
                    <h2>Promociones Especiales</h2>
                    <p>Aprovecha nuestras ofertas semanales en una gran variedad de productos lácteos. ¡No te lo pierdas!</p>
                    <a href="/" class="btn">Ver promociones</a>
                </div>
            </div>

            {/* <!-- Sección Público Disponible --> */}
            <section class="publico-disponibless">
                <h2>Público Disponible</h2>
                <div class="tarjetas-contenedors">
                    <div class="tarjeta tarjeta-adultos-mayores">
                        <h2>Adultos Mayores</h2>
                        <p>Productos diseñados para una dieta equilibrada y pensados especialmente para el bienestar de los adultos mayores.</p>
                        <a href="/productosadultos" class="btn">Ver productos para adultos</a>
                    </div>

                    <div class="tarjeta tarjeta-ninos">
                        <h2>Niños</h2>
                        <p>Deliciosos productos lácteos llenos de energía para los más pequeños de la casa.</p>
                        <a href="/productosninios" class="btn">Ver productos para niños</a>
                    </div>

                    <div class="tarjeta tarjeta-mascotas">
                        <h2>Mascotas</h2>
                        <p>Cuidado especial para tus compañeros peludos con productos hechos a medida.</p>
                        <a href="/productosmascotas" class="btn">Ver productos para mascotas</a>
                    </div>


                </div>
            </section>

            {/* <!-- Footer --> */}
            <footer>
                <p>&copy; 2024 Delizia. Todos los derechos reservados.</p>
                <a href="#">Política de privacidad</a> | <a href="#">Términos y condiciones</a>
            </footer>



        </div>
    )
}

export default Home