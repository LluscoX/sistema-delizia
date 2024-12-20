import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MenuInventario from '../Menus/MenuInventario';


const URI = "http://localhost:8000/roles";

const AddRoles = () => {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState()
    const [descripcion, setdescripcion] = useState()


    const saveRol = async (e) => {
        e.preventDefault()

        try {

            await axios.post(URI,
                {
                    nombreRol: nombre,
                    descripcion: descripcion,
                })

            Swal.fire({
                position: "center",
                icon: "success",
                title: "ROL REGISTRADO!",
                showConfirmButton: true,
                timer: 1500
            }).then(() => {
                navigate('/roles')
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }



    return (
        <div>
            <MenuInventario/>
            <div className="form-container">
                <h2 className="form-title">Crear Nuevo Rol</h2>
                <form onSubmit={saveRol}>
                    <label className="form-label-custom">
                        Nombre del Rol:
                        <input
                            className="input-field-custom"
                            type="text"
                            placeholder="Ej. ADMINISTRADOR"
                            name="nombreRol"
                            required
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </label>
                    <label className="form-label-custom">
                        Descripción:
                        <textarea
                            className="input-field-custom"
                            rows="3"
                            placeholder="Describa el rol aquí..."
                            name="descripcionRol"
                            required
                            onChange={(e) => setdescripcion(e.target.value)}
                        ></textarea>
                    </label>
                    <div className="button-container">
                        <button className="button-submit-custom" type="submit">
                            Crear Rol
                        </button>
                        <button
                            className="button-cancel-custom"
                            type="button"
                            onClick={() => navigate('/roles')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

        </div>



    )
}

export default AddRoles