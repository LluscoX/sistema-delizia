import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../Tables.css'
import MenuInventario from '../Menus/MenuInventario';


const URI = "http://localhost:8000/categoria/";
const Categorias = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);

    const getCategorias = async () => {
        const res = await axios.get(URI);
        setCategorias(res.data);
    };
    useEffect(() => {
        getCategorias();
    }, []);
    const deleteCategoria = async (id) => {
        Swal.fire({
            title: "Producto eliminado correctamente",
        }).then(async () => {
            await axios.delete(`${URI}${id}`)
            getCategorias()
        });
    };
    return (
        <div>
            <MenuInventario />
            <main className="main-container">
                <div className="page-title">
                    <h1>Categorías</h1>
                </div>

                <section className="section">
                    <div className="card-custom">
                        <div className="card-body">
                            <h5 className="card-title-custom">Listado de Categorías</h5>
                            <button
                                className="button-add-custom"
                                onClick={() => { navigate('/addCategorias') }}
                            >
                                Agregar Categoría
                            </button>

                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th className="table-header-custom">COD</th>
                                        <th className="table-header-custom">NOMBRE DE CATEGORÍA</th>
                                        <th className="table-header-custom">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.map((catego) => (
                                        <tr key={catego.id}>
                                            <td className="table-cell-custom">{catego.id}</td>
                                            <td className="table-cell-custom">{catego.descripcion}</td>
                                            <td className="table-cell-custom">
                                                <Link
                                                    to={`/editCategorias/${catego.id}`}
                                                    className="button-edit-custom"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => deleteCategoria(catego.id)}
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

export default Categorias