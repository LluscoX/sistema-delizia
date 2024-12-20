import React from 'react'
import '../assets/css/login.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import imagenDelizia from '../assets/img/logoDeliziaFondo.png' 
const URI = 'http://localhost:8000/auth/';
const URITOKEN = 'http://localhost:8000/usuario/';
const URIcliente = 'http://localhost:8000/cliente/';
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cliente, setCliente] = useState('Cliente');
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(URI, { username, password });
            console.log(res.data.status);
            if (res.data.status === "success_usuario") {
                // const token = res.data.token;
                const idUsuarioActivo = res.data.id;

                // localStorage.setItem('token', token);

                const respuesta = await axios.get(`${URITOKEN}${idUsuarioActivo}`);

                const data = respuesta.data;
                const nombre = data.nombre;
                const username = data.username;
                const password = data.password;
                const rol = data.rol;

                localStorage.setItem('nombre', nombre);
                localStorage.setItem('rol', rol);
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);

                Swal.fire({
                    title: `BIENVENIDO "${nombre}"`,
                    text: `Has iniciado sesión como: ${rol}`,
                    icon: "success"
                }).then(() => {
                    navigate('/');
                });
                
            } else if (res.data.status === "success_cliente") {

                const idClienteActivo = res.data.id;

                // localStorage.setItem('token', token);

                const respuesta = await axios.get(`${URIcliente}${idClienteActivo}`);

                const data = respuesta.data;
                const nombre = data.nombre;
                const username = data.username;
                const password = data.password;

                localStorage.setItem('id', idClienteActivo);
                localStorage.setItem('nombre', nombre);
                localStorage.setItem('rol', cliente);
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                
                Swal.fire({
                    title: `BIENVENIDO "${nombre}"`,
                    text: `Que tengas una buena instancia`,
                    icon: "success"
                }).then(() => {
                    navigate('/');
                });
                
            }  else {
                Swal.fire({
                    title: "Advertencia",
                    text: "Contraseña y/o usuario incorrectos",
                    icon: "warning"
                });
            }

        } catch (err) {
            console.error(err);
            console.log("eror : " + err)
            alert("A error occurredaaaaaaaaaaaa");
        }
    };
    const loginInvitado= ()=> {
        localStorage.setItem('nombre', 'invitado');
        localStorage.setItem('rol', 'cliente');
        navigate('/')
    }
    return (
        <div className='container-padre'>
            <div className="login-container">
                <h2 className="login-title">Login <img  className='logoDelizia' src={imagenDelizia} alt="" /></h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Usuario</label>
                        <input
                            type="text"
                            className="form-input"
                            id="username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-input"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                        >
                            Recordarme
                        </label>
                    </div>
                    <button type="submit" className="btn-submit">Iniciar sesión</button>
                </form>
                <div  onClick={loginInvitado} className="forgot-password">
                    <a onClick={loginInvitado} className="forgot-link">Entrar como Invitado</a>
                </div>
                <div className="register-container">
                    <p className='text-dark'>¿No tienes una cuenta?</p>
                    <a href="/registroCliente" className="btn-register">Registrarse</a>
                </div>
            </div>
        </div>
    )
}
export default Login