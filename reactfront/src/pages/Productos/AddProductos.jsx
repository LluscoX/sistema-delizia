import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Productos.css'
import axios from 'axios';
import Swal from 'sweetalert2'
import MenuInventario from '../Menus/MenuInventario';
const AddProductos = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [detalle, setDetalle] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [imagen, setImagen] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('detalle', detalle);
        formData.append('imagen', imagen);
        formData.append('cantidad', cantidad);
        formData.append('precioVenta', precioVenta);
        formData.append('categoria', categoria);

        try {
            const response = await fetch('http://localhost:8000/producto/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log('Producto agregado:', data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "PRODUCTO REGISTRADO!",
                showConfirmButton: true,
                timer: 1500
                }).then(()=>{
                    navigate('/productosTable')
            });  
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };



    return (
        <div>
            <MenuInventario/>
            <div className="registro-contenedor">
                <h2 className="title-regitro">Agregue los datos de su producto</h2>
                <form onSubmit={handleSubmit} className="form_registro">
                    <div className="campo">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="detalle">Descripción:</label>
                        <input
                            type="text"
                            id="detalle"
                            name="detalle"
                            onChange={(e) => setDetalle(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="cantidad">Cantidad:</label>
                        <input
                            type="number"
                            id="cantidad"
                            name="cantidad"
                            onChange={(e) => setCantidad(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="precioVenta">Precio Venta:</label>
                        <input
                            type="text"
                            id="precioVenta"
                            name="precioVenta"
                            onChange={(e) => setPrecioVenta(e.target.value)}
                        />
                    </div>

                    <label className='campo'>Categoría:
                        <select
                            onChange={(e) => setCategoria(e.target.value)}
                            className='categoria2_listbox'
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </label>

                    <div className="campo">
                        <label htmlFor="imagen">Imagen:</label>
                        <input
                            type="file"
                            id="imagen"
                            name="imagen"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {preview && (
                        <div className="preview-container">
                            <img src={preview} alt="Previsualización" className="preview-image" />
                        </div>
                    )}


                    <div className="campo" style={{ flex: "1 1 100%" }}>
                        <button className="btn" type="submit">Agregar Datos</button>
                        <button className="btn-reset" type="button" onClick={()=>{navigate('/productosTable')}}>Cancelar</button>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default AddProductos