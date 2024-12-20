import React, { useEffect, useState } from 'react'
import './AddUsuario.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import MenuInventario from '../Menus/MenuInventario';
const URI = 'http://localhost:8000/usuario/';
const AddUsuario = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('')
    const [telefono, setTelefono] = useState('')    
    const [roles, setRoles] = useState([])
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const respuesta = await axios.get('http://localhost:8000/roles');
                const data = respuesta.data;
                const rolesExtraidos = data.map(item => ({
                    id: item.id, 
                    nombre: item.nombreRol,
                }));
                setRoles(rolesExtraidos);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchRoles()
    }, []);

    const saveUsuario = async (e) => {
        e.preventDefault()

        try {
            await axios.post(URI,
                {
                    nombre: nombre,
                    username: username,
                    password: password,
                    rol: rol,
                    telefono: telefono,

                })
            Swal.fire({
                position: "center",
                icon: "success",
                title: "USUARIO REGISTRADO!",
                showConfirmButton: true,
                timer: 1500
            }).then(() => {
                navigate('/usuarios')
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const closeForm = () => {
        navigate('/usuarios')
    }

    return (
        <div>
            <MenuInventario/>
            <div className="form-container">
                <h2 className="form-title">Agregar Datos del Usuario</h2>
                <form onSubmit={saveUsuario}>
                    <label className="form-label-custom">
                        Nombre:
                        <input
                            className="input-field-custom"
                            type="text"
                            name="nombre"
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-label-custom">
                        <span>Rol:</span>
                        <select
                            onChange={(e) => setRol(e.target.value)}
                            className="select-field-custom"
                            required
                        >
                            <option value="">Asigne su Rol</option>
                            {roles.map((rol) => (
                                <option key={rol.id} value={rol.nombre}>
                                    {rol.nombre}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="form-label-custom">
                        Usuario:
                        <input
                            className="input-field-custom"
                            type="text"
                            name="usuario"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>

                    <label className="form-label-custom">
                        Contraseña:
                        <input
                            className="input-field-custom"
                            type="password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <label className="form-label-custom">
                        Teléfono:
                        <input
                            required
                            className="input-field-custom"
                            type="text"
                            name="telefono"
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </label>

                    <div className="button-container">
                        <button className="button-submit-custom" type="submit">
                            Agregar Datos
                        </button>
                        <button
                            className="button-cancel-custom"
                            type="button"
                            onClick={closeForm}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

        </div>


    )
}

export default AddUsuario