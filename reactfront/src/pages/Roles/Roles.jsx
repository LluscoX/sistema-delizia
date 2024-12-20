import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../Tables.css'
import MenuInventario from '../Menus/MenuInventario';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const URI = "http://localhost:8000/roles";
const URIroldelete = "http://localhost:8000/roles/";

const Roles = () => {

    const navigate = useNavigate()
    const [nombre, setNombre ] = useState()
    const [descripcion, setdescripcion ] = useState()
    
    const [roles, setRoles ] = useState([])

    const getRoles = async () => {
        const res = await axios.get(URI);
        setRoles(res.data);
    };
    useEffect(() => {
        getRoles();
    }, []);

    const deleteRoles = async (id) => {
        Swal.fire({
            title: "Rol eliminado correctamente",
        }).then(async () => {
            await axios.delete(`${URIroldelete}${id}`)
            getRoles()
        });
    };


    return (
        <div>
        <MenuInventario/>
        <main className="main-container">
            <div className="page-title">
                <h1>Roles</h1>
            </div>
    
            <section className="section">
                <div className="card-custom">
                    <div className="card-body">
                        <h5 className="card-title-custom">Listado de Roles</h5>
                        <button
                            className="button-add-custom"
                            onClick={() => { navigate('/addRoles') }}
                        >
                            Registrar Rol
                        </button>
                        <table className="table-custom">
                            <thead>
                                <tr>
                                    <th className="table-header-custom">ID</th>
                                    <th className="table-header-custom">NOMBRE DEL ROL</th>
                                    <th className="table-header-custom">DESCRIPCIÓN</th>
                                    <th className="table-header-custom">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((rol) => (
                                    <tr key={rol.id}>
                                        <td className="table-cell-custom">{rol.id}</td>
                                        <td className="table-cell-custom">{rol.nombreRol}</td>
                                        <td className="table-cell-custom">{rol.descripcion}</td>
                                        <td className="table-cell-custom">
                                            <Link
                                                to={`/editRoles/${rol.id}`}
                                                className="button-edit-custom"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => deleteRoles(rol.id)}
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

export default Roles