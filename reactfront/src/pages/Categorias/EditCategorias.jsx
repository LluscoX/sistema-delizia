import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import MenuInventario from '../Menus/MenuInventario';

const URI = "http://localhost:8000/categoria/"

const EditCategorias = () => {

    const navigate = useNavigate();

    const { id } = useParams()
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI + id, {
            descripcion: descripcion,
        })
        Swal.fire({
            position: "center",
            icon: "success",
            title: "CATEGORIA ACTUALIZADO CORRECTAMENTE!",
            showConfirmButton: true,
            timer: 1500
        }).then(() => {
            navigate('/categorias')
        });
    }

    useEffect(() => {
        const getCategoriaById = async () => {
            const res = await axios.get(URI + id)
            setDescripcion(res.data.descripcion);
        }
        getCategoriaById();
    }, [id]);




    return (
        <div>
            <MenuInventario/>
            <div className='registro-contenedor'>
                <h1 className='title-regitro'>Editar Categoría</h1>

                <form onSubmit={update} className="form_registro">
                    <div className="campo">
                        <label>Nombre de Categoría:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <button className="btn" type="submit">
                            Actualizar Datos
                        </button>
                    </div>

                    <div className="campo">
                        <Link className="btn-reset" type="button" to={'/categorias'}>
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>

        </div>



    )
}

export default EditCategorias