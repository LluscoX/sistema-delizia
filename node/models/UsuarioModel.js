import db from "../database/db.js";

import { DataTypes } from "sequelize";



const UsuarioModel = db.define('usuarios', {
    nombre: {type:DataTypes.STRING},
    username: {type:DataTypes.STRING},
    password: {type:DataTypes.STRING},
    rol: {type:DataTypes.STRING},
    telefono: {type:DataTypes.NUMBER},
})

export default UsuarioModel;