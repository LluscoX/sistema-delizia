import React, { useState } from 'react'
import '../assets/css/registro.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const URI = 'http://localhost:8000/cliente'
const Registro = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [nombreTienda, setNombreTienda] = useState('')
    const [telefono, setTelefono] = useState('')
    const [nit, setNit] = useState('')
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [direccion, setDireccion] = useState('')

    const saveCliente = async (e) => {
        e.preventDefault()
        try {
            await axios.post(URI,
                {
                    nombre: nombre,
                    apellidos: apellidos,
                    nombreTienda: nombreTienda,
                    telefono: telefono,
                    nit: nit,
                    correo: correo,
                    password: password,
                    username: username,
                    direccion: direccion,
                })

            Swal.fire({
                position: "center",
                icon: "success",
                title: "SU CUENTA HA SIDO REGISTRADO!",
                showConfirmButton: true,
                timer: 1500
            }).then(() => {
                navigate('/');
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <div class="registro-contenedor">
                <h1 className='title-regitro'>Regístrate</h1>
                <form className='form_registro' onSubmit={saveCliente}>

                    <div class="campo">
                        <label for="username">Nombre del Cliente:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Ej. Juan"
                            pattern="[a-zA-Z0-9]+"
                            title="Solo se permiten caracteres alfanuméricos."
                            onChange={(e) => setNombre(e.target.value)}
                            required />
                    </div>

                    <div class="campo">
                        <label for="username">Apellidos del Cliente:</label>
                        <input
                            type="text"
                            placeholder="Ej. lopez"
                            pattern="[a-zA-Z0-9]+"
                            title="Solo se permiten caracteres alfanuméricos."
                            onChange={(e) => setApellidos(e.target.value)}
                            required />
                    </div>

                    <div class="campo">
                        <label for="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ej. correo@ejemplo.com"
                            onChange={(e) => setCorreo(e.target.value)}
                            required />
                    </div>

                    <div class="campo">
                        <label for="password">Telefono:</label>
                        <input
                            type="telefono"
                            id="telefono"
                            name="telefono"
                            placeholder="67500224"
                            maxlength="8" 
                            onChange={(e) => setTelefono(e.target.value)}
                            required />
                    </div>

                    <div class="campo">
                        <label for="username">Usuario:</label>
                        <input
                            type="text"
                            placeholder="Ej. Juan123"
                            pattern="[a-zA-Z0-9]+"
                            title="Solo se permiten caracteres alfanuméricos."
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                    </div>

                    <div class="campo">
                        <label for="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Crea una contraseña segura"
                            // minlength="6"
                            title="La contraseña debe tener al menos 6 caracteres."
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>


                    <div class="campo">
                        <label for="password">Nombre de su Tienda:</label>
                        <input
                            type="text"
                            id="nombretienda"
                            placeholder="Tienda Mary"
                            onChange={(e) => setNombreTienda(e.target.value)}
                            required />
                    </div>

                    <div class="campo">
                        <label for="password">Nit:</label>
                        <input
                            type="nit"
                            id="nit"
                            name="nit"
                            maxlength="9" 
                            placeholder="9998845648"
                            onChange={(e) => setNit(e.target.value)}
                            required />
                    </div>

                    <div class="campo">
                        <label for="direccion">Direccion:</label>
                        <input
                            type="direccion"
                            id="direccion"
                            name="direccion"
                            placeholder="av.America"
                            onChange={(e) => setDireccion(e.target.value)}
                            required />
                    </div>
                    <div class="campo">
                        <button type="submit" className="btn">Registrarse</button>
                        <button type="reset" className="btn-reset">Limpiar</button>
                    </div>
                </form>



                <p className='subtitles-p'>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
            </div>




        </div>
    )
}

export default Registro