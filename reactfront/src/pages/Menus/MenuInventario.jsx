import React, { useEffect, useState } from 'react'
import './Menu.css'
import logoDelizia from '../../assets/img/logoDeliziaFondo.png'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const MenuInventario = () => {

    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [rol, setRol] = useState('')

    useEffect(() => {
        const nombreGuardado = localStorage.getItem('nombre');
        if (nombreGuardado) {
            setNombre(nombreGuardado);
        } else {
            setNombre("Invitado");
        }

        const rolguardado = localStorage.getItem('rol');
        if (rolguardado) {
            setRol(rolguardado);
        }
        else {
            setRol('Cliente');
        }

    }, []);

    const logout = () => {
        Swal.fire({
            title: "¿Esta seguro de Cerrar Sesion?",
            text: "Debera volver a ingresar sus datos para iniciar sesion!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Cerrar Sesion!"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('id');
                localStorage.removeItem('nombre');
                localStorage.removeItem('rol');
                Swal.fire({
                    title: "Has Cerrado sesion",
                    // text: "Your file has been deleted.",
                    icon: "warning"
                }).then(() => {
                    navigate('/login', { replace: true });
                })
            }
        });
    };





    if (rol === 'ADMINISTRADOR' || rol === "GERENTE") {
        return (
            <header className="unique-menu">
                <img className='logoDelizia' src={logoDelizia} alt="Logo de Delizia" />
                <label className='text-light' htmlFor="">Usuario activo: <strong> {nombre} </strong></label>
                <label className='text-light' htmlFor="">Rol: <strong>{rol}</strong></label>
                <ul className="unique-menu-list">

                    <li className="unique-menu-item">
                        <a href="/" className="unique-menu-link">Inicio</a>
                    </li>
                    {/* DESPLEGABLE */}
                    <li class="unique-menu-item">
                        <a class="nav-link dropdown-toggle" href="#" id="inventarioDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <strong>Administracion</strong>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="inventarioDropdown">
                            <li>
                                <a class="dropdown-item" href="/usuarios">Usuarios</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="/roles">Roles</a>
                            </li>
                        </ul>
                    </li>
                    <li class="unique-menu-item">
                        <a class="nav-link dropdown-toggle" href="#" id="inventarioDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <strong>Ventas</strong>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="inventarioDropdown">
                            <li>
                                <a class="dropdown-item" href="/clientes">Clientes</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="/verVentas">Ventas</a>
                            </li>
                        </ul>
                    </li>

                    <li class="unique-menu-item">
                        <a class="nav-link dropdown-toggle" href="#" id="inventarioDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <strong>Inventario</strong>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="inventarioDropdown">
                            <li>
                                <a class="dropdown-item" href="/productosTable">Productos</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="/categorias">Categorías</a>
                            </li>
                        </ul>
                    </li>

                    <li className="unique-menu-item">
                        <a onClick={logout} className="unique-menu-link">Cerrar Sesion</a>
                    </li>



                </ul>
            </header>
        )
        // FIN IF 
    } else if (rol == "Cliente") {
        return (
            <header className="unique-menu">
                <img className='logoDelizia' src={logoDelizia} alt="Logo de Delizia" />
                <label className='text-light' htmlFor="">Usuario activo: <strong> {nombre} </strong></label>
                <label className='text-light' htmlFor="">Rol: <strong>{rol}</strong></label>
                <ul className="unique-menu-list">

                    <li className="unique-menu-item">
                        <a href="/" className="unique-menu-link">Inicio</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/recetas" className="unique-menu-link">Recetas Delizia</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/sucursales" className="unique-menu-link">Nuestras Sucursales</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/contacto" className="unique-menu-link">Contactanos</a>
                    </li>

                    <li className="unique-menu-item">
                        <a onClick={logout} className="unique-menu-link">Cerrar Sesion</a>
                    </li>
                </ul>
            </header>
        )
        // Fin if
    } else if (nombre === 'invitado') {
        return (
            <header className="unique-menu">
                <img className='logoDelizia' src={logoDelizia} alt="Logo de Delizia" />
                <label className='text-light' htmlFor="">Usuario activo: <strong> {nombre} </strong></label>
                <label className='text-light' htmlFor="">Rol: <strong>{rol}</strong></label>
                <ul className="unique-menu-list">

                    <li className="unique-menu-item">
                        <a href="/" className="unique-menu-link">Inicio</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/recetas" className="unique-menu-link">Recetas Delizia</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/sucursales" className="unique-menu-link">Nuestras Sucursales</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/contacto" className="unique-menu-link">Contactanos</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/registroCliente" className="unique-menu-link">Registrarse</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/login" className="unique-menu-link">Iniciar Sesion</a>
                    </li>

                </ul>
            </header>
        )
    } else{
        <header className="unique-menu">
                <img className='logoDelizia' src={logoDelizia} alt="Logo de Delizia" />
                <label className='text-light' htmlFor="">Usuario activo: <strong> {nombre} </strong></label>
                <label className='text-light' htmlFor="">Rol: <strong>{rol}</strong></label>
                <ul className="unique-menu-list">

                    <li className="unique-menu-item">
                        <a href="/" className="unique-menu-link">Inicio</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/recetas" className="unique-menu-link">Recetas Delizia</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/sucursales" className="unique-menu-link">Nuestras Sucursales</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/contacto" className="unique-menu-link">Contactanos</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/registroCliente" className="unique-menu-link">Registrarse</a>
                    </li>

                    <li className="unique-menu-item">
                        <a href="/login" className="unique-menu-link">Iniciar Sesion</a>
                    </li>

                </ul>
            </header>
    }
}



export default MenuInventario