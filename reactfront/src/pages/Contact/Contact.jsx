import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Contac.css'

const Contact = () => {
    return (
        <div className='container-padre-contacts'>

            <h1>Contacto</h1>
            <p>¿Tienes alguna pregunta o quieres comunicarte con nosotros? Llena el formulario y nos pondremos en contacto contigo.</p>

            <form method="POST" class="contact-form" action="">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required/>
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required/>

                <label for="message">Mensaje:</label>
                <textarea id="message" name="message" rows="4" required></textarea>

                <button type="submit" class="submit-btn">Enviar Mensaje</button>
            </form>

            <div class="register-section">
            <p>¿Interesado en nuestros productos o servicios? <br/>Regístrate para obtener más información.</p>
            <a href="/registroCliente" class="register-btn">Ir al Registro</a>
        </div>

        </div>
        
    )
}

export default Contact