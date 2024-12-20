import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


const URI = "http://localhost:8000/producto/";
const EdtProcutos = () => {
    const [nombre, setNombre] = useState('')
    const [detalle, setDetalle] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [imagen, setImagen] = useState('')
    const [precioVenta, setPrecioVenta] = useState('')
    const [categoria, setCategoria] = useState('')
    const [categorias, setCategorias] = useState([])
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const respuesta = await axios.get('http://localhost:8000/categoria');
                const data = respuesta.data;

                const categoriasExtraidas = data.map(item => item.descripcion);
                setCategorias(categoriasExtraidas);

            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCategorias();
    }, []);
    const navigate = useNavigate();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); 
            };
            reader.readAsDataURL(file); 
        } else {
            setImagen(null);
            setPreview(null);
        }
    };
    const { id } = useParams()

    const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('detalle', detalle);
        formData.append('cantidad', cantidad);
        formData.append('precioVenta', precioVenta);
        formData.append('categoria', categoria);
        if (imagen) {
            formData.append('imagen', imagen);
        }
        try {
            const response = await fetch(`http://localhost:8000/producto/edit/${id}`, {
                method: 'PUT',
                body: formData,
            });
            const data = await response.json();
            console.log('Producto actualizado:', data);
    
            Swal.fire({
                position: "center",
                icon: "success",
                title: "PRODUCTO ACTUALIZADO!",
                showConfirmButton: true,
                timer: 1500
            }).then(() => {
                navigate('/productosTable'); 
            });
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };
   
    useEffect(() => {
        const getProdcutoById = async () => {
            const res = await axios.get(URI + id)
            setNombre(res.data.nombre);
            setDetalle(res.data.detalle);
            setCantidad(res.data.cantidad);
            setPrecioVenta(res.data.precioVenta);
            setCategoria(res.data.categoria);
            if (res.data.imagen) {
                const imageBlob = new Blob([res.data.imagen], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(imageBlob); 
                setImagen(imageUrl); 
            }
        }
        getProdcutoById();
    }, [id]);
    
    
    return (
        <div className="registro-contenedor">
        <h1 className="title-regitro">Editar Producto</h1>
    
        <form className="form_registro" onSubmit={handleEditSubmit}>
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
                <label htmlFor="detalle">Detalle:</label>
                <input
                    id="detalle"
                    type="text"
                    name="detalle"
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                />
            </div>
    
            <div className="campo">
                <label htmlFor="cantidad">Cantidad:</label>
                <input
                    id="cantidad"
                    type="number"
                    name="cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Agregar en producción"
                    
                />
            </div>
    
            <div className="campo">
                <label htmlFor="precioVenta">Precio Venta:</label>
                <input
                    id="precioVenta"
                    type="text"
                    name="precioVenta"
                    value={precioVenta}
                    onChange={(e) => setPrecioVenta(e.target.value)}
                />
            </div>
    
            <div className="campo">
                <label htmlFor="form-label-custom">Categoría:</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="select-field-custom"
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
            <div className="campo">
                <label htmlFor="imagen">Imagen:</label>
                <input
                    id="imagen"
                    type="file"
                    name="imagen"
                    onChange={handleImageChange}
                />
            </div>
            {preview && (
                    <div className="preview-container">
                        <img src={preview} alt="Previsualización" className="preview-image" />
                    </div>
            )}
            <div className="campo">
                <button className="btn" type="submit">Actualizar Datos</button>
                <button className="btn-reset" type="button" onClick={() => navigate('/productosTable')}>Cancelar</button>
            </div>
        </form>
    </div>
    
    )
}

export default EdtProcutos