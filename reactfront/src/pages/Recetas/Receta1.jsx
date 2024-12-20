import React from 'react'
import './RecetasIndividuales.css'
import MenuInventario from '../Menus/MenuInventario'

const Receta1 = () => {
    return (
        <div>
            <MenuInventario/>
            <div class="receta1-contenedor">
            <h1 class="receta1-titulo">Smoothie de Moras con Yogurt</h1>
            <p class="receta1-subtitulo">Ingredientes:</p>
            <ul class="receta1-lista-ingredientes">
                <li class="receta1-ingrediente">1 taza de moras frescas</li>
                <li class="receta1-ingrediente">1 taza de yogurt natural</li>
                <li class="receta1-ingrediente">1 cucharada de miel</li>
                <li class="receta1-ingrediente">1/2 taza de hielo</li>
            </ul>
            <p class="receta1-subtitulo">Instrucciones:</p>
            <ol class="receta1-lista-pasos">
                <li class="receta1-paso">Coloca las moras, el yogurt, la miel y el hielo en la licuadora.</li>
                <li class="receta1-paso">Licúa hasta obtener una mezcla suave.</li>
                <li class="receta1-paso">Sirve inmediatamente y disfruta.</li>
            </ol>
            <a href="/recetas" class="receta1-enlace">Volver a Recetas</a>
        </div>

        </div>
    
    )
}

export default Receta1