import React from 'react'
import MenuInventario from '../Menus/MenuInventario'

const Receta2 = () => {
    return (
        <div>
            <MenuInventario/>
            <div class="receta1-contenedor">
                <h1 class="receta1-titulo">Tallarines con Crema de Leche</h1>
                <p class="receta1-subtitulo">Ingredientes:</p>
                <ul class="receta1-lista">
                    <li class="receta1-ingrediente">200 gramos de tallarines</li>
                    <li class="receta1-ingrediente">1 taza de crema de leche</li>
                    <li class="receta1-ingrediente">1 diente de ajo picado</li>
                    <li class="receta1-ingrediente">1 cucharada de mantequilla</li>
                    <li class="receta1-ingrediente">Sal y pimienta al gusto</li>
                    <li class="receta1-ingrediente">Queso parmesano rallado al gusto</li>
                </ul>
                <p class="receta1-subtitulo">Instrucciones:</p>
                <ol class="receta1-instrucciones">
                    <li class="receta1-paso">Cocina los tallarines en agua con sal según las instrucciones del paquete.</li>
                    <li class="receta1-paso">En una sartén, derrite la mantequilla y sofríe el ajo hasta que esté dorado.</li>
                    <li class="receta1-paso">Agrega la crema de leche y cocina a fuego bajo, removiendo hasta que espese.</li>
                    <li class="receta1-paso">Incorpora los tallarines y mezcla bien. Añade sal y pimienta al gusto.</li>
                    <li class="receta1-paso">Sirve caliente y espolvorea con queso parmesano rallado.</li>
                </ol>
                <a class="receta1-link" href="/recetas">Volver a Recetas</a>
            </div>

        </div>

    )
}

export default Receta2