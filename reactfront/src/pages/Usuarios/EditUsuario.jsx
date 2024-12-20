import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import MenuInventario from '../Menus/MenuInventario';
const URI = "http://localhost:8000/usuario/";
const EditUsuario = () => {
    const [nombre, setNombre] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('')
    const [telefono, setTelefono] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const navigate = useNavigate();
    const { id } = useParams()
    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI + id, {
            nombre: nombre,
            username: username,
            password: password,
            rol: rol,
            telefono: telefono,
        })
        Swal.fire({
            position: "center",
            icon: "success",
            title: "USUARIO ACTUALIZADO CORRECTAMENTE!",
            showConfirmButton: true,
            timer: 1500
        }).then(() => {
            navigate('/usuarios')
        });

    }
    useEffect(() => {
        const getUsuarioById = async () => {
            const res = await axios.get(URI + id)
            setNombre(res.data.nombre);
            setUsername(res.data.username);
            setPassword(res.data.password);
            setRol(res.data.rol);
            setTelefono(res.data.telefono);
        }
        getUsuarioById();
    }, [id]);
    return (
        <div>
            <MenuInventario/>
            <div className="registro-contenedor">
                <h1 className="title-regitro">Modificar Usuario</h1>
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
                        <label htmlFor="rol">Rol:</label>
                        <select
                            id="rol"
                            name="rol"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            <option value="VENDEDOR">VENDEDOR</option>
                            <option value="REPARTIDOR">REPARTIDOR</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                            id="telefono"
                            type="text"
                            name="telefono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <button className="btn" type="submit">
                            Actualizar Datos
                        </button>
                        <button className="btn-reset" type="button" onClick={() => navigate('/usuarios')}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

        </div>


    )
}

export default EditUsuario