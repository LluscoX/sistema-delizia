import React from 'react'
import MenuInventario from '../Menus/MenuInventario'

const Receta3 = () => {
    return (
        <div>
            <MenuInventario/>
            <div class="receta1-contenedor">
                <h1 class="receta1-titulo">Paletas de Yogurt con Granola</h1>
                <p class="receta1-subtitulo">Ingredientes:</p>
                <ul class="receta1-lista-ingredientes">
                    <li class="receta1-ingrediente">1 taza de yogurt natural o saborizado</li>
                    <li class="receta1-ingrediente">1/2 taza de granola</li>
                    <li class="receta1-ingrediente">Frutas frescas al gusto (opcional)</li>
                    <li class="receta1-ingrediente">1 cucharada de miel o azúcar (opcional)</li>
                </ul>
                <p class="receta1-subtitulo">Instrucciones:</p>
                <ol class="receta1-lista-pasos">
                    <li class="receta1-paso">Mezcla el yogurt con la miel o azúcar, si prefieres un sabor más dulce.</li>
                    <li class="receta1-paso">En moldes para paletas, coloca una capa de yogurt, luego una capa de frutas y granola.</li>
                    <li class="receta1-paso">Repite las capas hasta llenar los moldes.</li>
                    <li class="receta1-paso">Inserta los palitos y congela por al menos 4 horas.</li>
                    <li class="receta1-paso">Desmolda y disfruta de tus paletas.</li>
                </ol>
                <a href="/recetas" class="receta1-enlace">Volver a Recetas</a>
            </div>


        </div>
    )
}

export default Receta3