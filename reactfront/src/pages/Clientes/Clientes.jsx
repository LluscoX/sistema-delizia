import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../Tables.css'
import MenuInventario from '../Menus/MenuInventario';


const URI = 'http://localhost:8000/cliente/';

const Clientes = () => {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [nit, setNit] = useState('')

    const [clientes, setClientes] = useState([])

    const getClientes = async () => {
        const res = await axios.get(URI);
        setClientes(res.data);
    };
    useEffect(() => {
        getClientes();
    }, []);

    const deleteCliente = async (id) => {
        Swal.fire({
            title: "Cliente eliminado correctamente",
        }).then(async () => {
            await axios.delete(`${URI}${id}`)
            getClientes()
        });
    };

    return (
        <div>

        <MenuInventario/>
        
        <main className="main-container">
            <div className="page-title">
                <h1>Clientes</h1>
            </div>
    
            <section className="section">
                <div className="card-custom">
                    <div className="card-body">
                        <h5 className="card-title-custom">Listado de Clientes</h5>
                        <button className="button-add-custom" onClick={() => { navigate('/registroCliente') }}>
                            Registrar Cliente
                        </button>
                            <table className="table-custom">
                            <thead>
                                <tr>
                                    <th className="table-header-custom">ID</th>
                                    <th className="table-header-custom">NOMBRE</th>
                                    <th className="table-header-custom">APELLIDOS</th>
                                    <th className="table-header-custom">NOMBRE DE TIENDA</th>
                                    <th className="table-header-custom">TELEFONO</th>
                                    <th className="table-header-custom">NIT</th>
                                    <th className="table-header-custom">CORREO</th>
                                    <th className="table-header-custom">DIRECCION</th>
                                    <th className="table-header-custom">USERNAME</th>
                                    <th className="table-header-custom">PASSWORD</th>
                                    <th className="table-header-custom">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((client) => (
                                    <tr key={client.id}>
                                        <td className="table-cell-custom">{client.id}</td>
                                        <td className="table-cell-custom">{client.nombre}</td>
                                        <td className="table-cell-custom">{client.apellidos}</td>
                                        <td className="table-cell-custom">{client.nombreTienda}</td>
                                        <td className="table-cell-custom">{client.telefono}</td>
                                        <td className="table-cell-custom">{client.nit}</td>
                                        <td className="table-cell-custom">{client.correo}</td>
                                        <td className="table-cell-custom">{client.direccion}</td>
                                        <td className="table-cell-custom">{client.username}</td>
                                        <td className="table-cell-custom">{client.password}</td>
                                        <td className="table-cell-custom">
                                            <Link to={`/editCliente/${client.id}`} className="button-edit-custom">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <button onClick={() => deleteCliente(client.id)} className="button-delete-custom">
                                                <i className="fa-solid fa-trash text-light"></i> Borrar
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

export default Clientes