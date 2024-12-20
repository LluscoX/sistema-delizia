import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import MenuInventario from '../Menus/MenuInventario';

const URI = 'http://localhost:8000/cliente/';
const EditCliente = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [nombreTienda, setNombreTienda] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [nit, setNit] = useState('')
    const [direccion, setDireccion] = useState('')

    const navigate = useNavigate();

    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI + id, {
            nombre: nombre,
            apellidos: apellido,
            nombreTienda: nombreTienda,
            telefono: telefono,
            nit: nit,
            correo: correo,
            username: username,
            password: password,
            direccion: direccion,
        })
        Swal.fire({
            position: "center",
            icon: "success",
            title: "CLIENTE ACTUALIZADO CORRECTAMENTE!",
            showConfirmButton: true,
            timer: 1500
        }).then(() => {
            navigate('/clientes')
        });

    }
    useEffect(() => {
        const getUsuarioById = async () => {
            const res = await axios.get(URI + id)
            setNombre(res.data.nombre);
            setApellido(res.data.apellidos);
            setNombreTienda(res.data.nombreTienda);
            setCorreo(res.data.correo);
            setPassword(res.data.password);
            setUsername(res.data.username);
            setTelefono(res.data.telefono);
            setNit(res.data.nit);
            setDireccion(res.data.direccion);
        }
        getUsuarioById();
    }, [id]);


    return (
        <div>
            <MenuInventario/>
            <div className="registro-contenedor">
                <h1 className="title-regitro">Modificar Cliente</h1>

                <form className="form_registro" onSubmit={update}>
                    <div className="campo">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="apellido">Apellidos:</label>
                        <input
                            id="apellido"
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                            id="telefono"
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="nit">NIT:</label>
                        <input
                            id="nit"
                            type="text"
                            value={nit}
                            maxlength="9" 

                            onChange={(e) => setNit(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="nombreTienda">Nombre Tienda:</label>
                        <input
                            id="nombreTienda"
                            type="text"
                            value={nombreTienda}
                            onChange={(e) => setNombreTienda(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="correo">Correo:</label>
                        <input
                            id="correo"
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="direccion">Direccion:</label>
                        <input
                            id="direccion"
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <button className="btn" type="submit">Actualizar Datos</button>
                        <button className="btn-reset" type="button" onClick={() => navigate('/clientes')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default EditCliente