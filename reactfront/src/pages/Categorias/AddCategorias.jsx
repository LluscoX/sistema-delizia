import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import MenuInventario from '../Menus/MenuInventario';

const URI = "http://localhost:8000/categoria/";
const AddCategorias = () => {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState('');
    const saveCategoria = async (e) => {
        e.preventDefault()
        try {
            await axios.post(URI,
                {
                    descripcion: categoria,
                })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "CATEGORIA REGISTRADO!",
                showConfirmButton: true,
                timer: 1500
            }).then(() => {
                navigate('/categorias')
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div>
            <MenuInventario/>
            <div className="form-container">
                <h2 className="form-title">Agregue los datos de su categoría</h2>
                <form onSubmit={saveCategoria}>
                    <div className="form-label-custom">
                        Categoría:
                        <input
                            className="input-field-custom"
                            type="text"
                            name="categoria"
                            onChange={(e) => setCategoria(e.target.value)}
                        />
                    </div>

                    <div className="button-container">
                        <button className="button-submit-custom" type="submit">
                            Agregar Datos
                        </button>
                        <button className="button-cancel-custom" type="button" onClick={() => { navigate('/categorias') }}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default AddCategorias