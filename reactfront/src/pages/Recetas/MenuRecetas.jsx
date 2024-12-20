import React from 'react'
import './MenuRecetas.css'
import MenuInventario from '../Menus/MenuInventario'
const MenuRecetas = () => {
    return (
        <div>
            <MenuInventario />
            <div className='containerRecetas'>
                <h1 className='text-dark'><strong>Recetas con Productos Lácteos</strong></h1>
                <div class="card-container">

                    <div class="card">
                        <h2 > <strong> Smoothie de Moras con Yogurt</strong></h2>
                        <img src="imagenes/fRUTILLASMOTY.jpg" alt="Smoothie de Moras con Yogurt" />
                        <p>Disfruta de este delicioso smoothie refrescante y saludable.</p>
                        <a href="/receta1" class="btn">Ver receta</a>
                    </div>

                    <div class="card">
                        <h2><strong>Tallarines con Crema de Leche</strong></h2>
                        <img src="imagenes/PASTA RESETA.jpg" alt="Tallarines con Crema de Leche" />
                        <p>Un plato cremoso y delicioso para disfrutar en cualquier ocasión.</p>
                        <a href="/receta2" class="btn">Ver receta</a>
                    </div>

                    <div class="card">
                        <h2><strong> Paletas de Yogurt con Granola</strong></h2>
                        <img src="imagenes/HELADO RESETA.jpg" alt="Paletas de Yogurt con Granola" />
                        <p>Un snack saludable perfecto para el verano.</p>
                        <a href="/receta3" class="btn">Ver receta</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MenuRecetas