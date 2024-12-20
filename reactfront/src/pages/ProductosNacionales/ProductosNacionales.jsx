import React from 'react'
import './ProductosNacionales.css'
import Cart from '../Carrito/Carrito'
import { useCart } from '../../CartProvider';

const ProductosNacionales = () => {

    const { addToCart } = useCart();
    

    return (
        <div className='container-nacionales'>

            <header className='header-produ-nacionales'>
                <h1>Bienvenido a nuestra Tienda</h1>
                <p>Productos de calidad, directo a tu hogar.</p>
            </header>
            <section className='section-nacionales' id="productos-nacionales">
                <h2>Productos Nacionales</h2>
                <div class="productos">
                    <div class="producto">
                        <img src="imagenes/Tradicion/125-1369-tradicion-api.png" alt="Producto 1" />
                        <h3>Tradicion Helado de Api</h3>
                        <p>En honor a la diversidad y belleza de Bolivia con sus valles, altiplanos y
                            llanos tenemos estos tres deliciosos sabores que muestran los sabores típicos del país y su gente.</p>
                        <button class="btn-agregar" onclick="agregarProducto(1)">Agregar a la lista</button>
                        <p>En la lista: <span id="contador-1">0</span></p>
                    </div>
                    <div class="producto">
                        <img src="imagenes/Tradicion/125-1370-tradicion-huminta.png" alt="Producto 2" />
                        <h3>Tradicion Helado de Huminta</h3>
                        <p>En honor a la diversidad y belleza de Bolivia con sus valles, altiplanos y llanos tenemos estos tres deliciosos sabores que muestran los sabores típicos del país y su gente.</p>
                        <button class="btn-agregar" onclick="agregarProducto(2)">Agregar a la lista</button>
                        <p>En la lista: <span id="contador-2">0</span></p>
                    </div>
                    <div class="producto">
                        <img src="imagenes/Tradicion/125-1371-tradicion-arroz-con-leche.png" alt="Producto 3" />
                        <h3>Tradicion Helado de Arroz con Leche</h3>
                        <p>
                            En honor a la diversidad y belleza de Bolivia con sus valles, altiplanos y llanos tenemos estos tres
                            deliciosos sabores que muestran los sabores típicos del país y su gente.</p>
                        <button class="btn-agregar" onclick="agregarProducto(3)">Agregar a la lista</button>
                        <p>En la lista: <span id="contador-3">0</span></p>
                    </div>
                    <div class="producto">
                        <img src="imagenes/Tradicion/125-1374-tradicion-achachairu.png" alt="Producto 1" />
                        <h3>Tradicion Helado de Achachairu</h3>
                        <p>El sabor de la fruta natural que más representa a nuestra hermosa tierra cruceña.</p>
                        <button class="btn-agregar" onclick="agregarProducto(4)">Agregar a la lista</button>
                        <p>En la lista: <span id="contador-4">0</span></p>
                    </div>
                    <div class="producto">
                        <img src="imagenes/Tradicion/125-1375-tradicion-canela.png" alt="Producto 2" />
                        <h3>Tradicion Helado de Canela</h3>
                        <p>
                            No hay nada como un delicioso helado de canela a los pies del Cristo y con el fondo de los hermosos paisajes de la ciudad cochabambina.</p>
                        <button class="btn-agregar" onclick="agregarProducto(5)">Agregar a la lista</button>
                        <p>En la lista: <span id="contador-5">0</span></p>
                    </div>
                    <div class="producto">
                        <img src="imagenes/Tradicion/125-1376-tradicion-acai.png" alt="Producto 3" />
                        <h3>Tradicion Helado de Acai</h3>
                        <p>
                            El sabor ideal que te refresca del calor y te hace vivir la belleza del departamento de Beni.</p>
                        <button class="btn-agregar" onclick="agregarProducto(6)">Agregar a la lista</button>
                        <p>En la lista: <span id="contador-6">0</span></p>
                    </div>
                    <div class="producto">
                        <img src="imagenes/Tradicion/125-1554-tradicion-copoazu.png" alt="Producto 1" />
                        <h3>Tradicion Helado de Copoazu</h3>
                        <p>Mostramos a nuestro departamento del Beni con el sabor de la fruta que tanto representa la hospitalidad y belleza de su gente.</p>
                        <button class="btn-agregar" onclick="agregarProducto(7)">Agregar a la lista</button>
                        <p>En la lista: <span id="contador-7">0</span></p>
                    </div>

                </div>
            </section>
            <div class="volver-al-index">
                <a href="/">
                    <button>Volver al Inicio</button>
                </a>
            </div>

            <footer>
                <p>&copy; 2024 Tienda Online. Todos los derechos reservados.</p>
            </footer>


        </div>
    )
}

export default ProductosNacionales