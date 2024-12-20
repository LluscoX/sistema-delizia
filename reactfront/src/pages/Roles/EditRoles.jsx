import axios from 'axios';
import React, { useEffect, useState, useTransition } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MenuInventario from '../Menus/MenuInventario';
import Swal from 'sweetalert2'


const URI = "http://localhost:8000/roles/";

const EditRoles = () => {
    const navigate =    useNavigate()
    const [nombreRoles, setNombreRoles] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const { id } = useParams()


    useEffect(() => {
        const getroles = async () => {
            const res = await axios.get(URI + id)
            setNombreRoles(res.data.nombreRol);
            setDescripcion(res.data.descripcion);
        }
        getroles();
    }, [id]);

    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI + id, {
            nombreRol: nombreRoles,
            descripcion: descripcion,
        })
        Swal.fire({
            position: "center",
            icon: "success",
            title: "ROL ACTUALIZADO CORRECTAMENTE!",
            showConfirmButton: true,
            timer: 1500
        }).then(() => {
            navigate('/roles')
        });

    }
  return (
    <div>
          <MenuInventario/>
            <div className="registro-contenedor">
                <h1 className="title-regitro">Modificar Usuario</h1>
                <form className="form_registro" onSubmit={update}>
                    <div className="campo">
                        <label htmlFor="nombre">Nombre Del rol:</label>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            value={nombreRoles}
                            onChange={(e) => setNombreRoles(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="descripcion">Descripcion:</label>
                        <input
                            id="descripcion"
                            type="text"
                            name="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <button className="btn" type="submit">
                            Actualizar Datos
                        </button>
                        <button className="btn-reset" type="button" onClick={() => navigate('/roles')}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>


    </div>
  )
}

export default EditRoles