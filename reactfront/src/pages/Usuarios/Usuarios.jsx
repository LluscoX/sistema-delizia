import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Usuarios.css'
import MenuInventario from '../Menus/MenuInventario';
import Productos from '../Productos/Productos';
const URI = 'http://localhost:8000/usuario/';
const Usuarios = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('')
    const [telefono, setTelefono] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const getUsuarios = async () => {
        const res = await axios.get(URI);
        setUsuarios(res.data);
    };
    useEffect(() => {
        getUsuarios();
    }, []);
    const deleteUsuario = async (id) => {
        Swal.fire({
            title: "Usuario eliminado correctamente",
        }).then(async () => {
            await axios.delete(`${URI}${id}`)
            getUsuarios()
        });
    };
    return (
        <div>
            <MenuInventario/>
            <main className="main-container">
                <div className="page-title">
                    <h1>Usuarios</h1>
                </div>

                <section className="section">
                    <div className="card-custom">
                        <div className="card-body">
                            <h5 className="card-title-custom">Listado de Usuarios</h5>
                            <button className="button-add-custom" onClick={()=>{navigate('/addUsuario')}}>
                                Registrar Usuario
                            </button>
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th className="table-header-custom">COD</th>
                                        <th className="table-header-custom">NOMBRE</th>
                                        <th className="table-header-custom">ROL</th>
                                        <th className="table-header-custom">USERNAME</th>
                                        <th className="table-header-custom">PASSWORD</th>
                                        <th className="table-header-custom">TELEFONO</th>
                                        <th className="table-header-custom">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((users) => (
                                        <tr key={users.id}>
                                            <td className="table-cell-custom">{users.id}</td>
                                            <td className="table-cell-custom">{users.nombre}</td>
                                            <td className="table-cell-custom">{users.rol}</td>
                                            <td className="table-cell-custom">{users.username}</td>
                                            <td className="table-cell-custom">{users.password}</td>
                                            <td className="table-cell-custom">{users.telefono}</td>
                                            <td className="table-cell-custom">
                                                <Link
                                                    to={`/editUsuario/${users.id}`}
                                                    className="button-edit-custom"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => deleteUsuario(users.id)}
                                                    className="button-delete-custom"
                                                >
                                                    Borrar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
export default Usuarios