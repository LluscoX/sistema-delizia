import db from "../database/db.js";

import { DataTypes } from "sequelize";

const ProductoModel = db.define('productos', {
    nombre: {type:DataTypes.STRING},
    detalle: {type:DataTypes.STRING},
    imagen: {type:DataTypes.BLOB},
    cantidad: {type:DataTypes.NUMBER},
    categoria: {type:DataTypes.NUMBER},
    precioVenta: {type:DataTypes.DECIMAL},
    imagen: {type:DataTypes.BLOB('long')},
    
})

export default ProductoModel;