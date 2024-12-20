import db from "../database/db.js";

import { DataTypes } from "sequelize";

const ClienteModel = db.define('clientes', {
    nombre: {type:DataTypes.STRING},
    apellidos: {type:DataTypes.STRING},
    nombreTienda: {type:DataTypes.STRING},
    telefono: {type:DataTypes.NUMBER},
    nit: {type:DataTypes.NUMBER},
    correo: {type:DataTypes.STRING},
    password: {type:DataTypes.STRING},
    username: {type:DataTypes.STRING},
    direccion: {type:DataTypes.STRING},
})

export default ClienteModel;