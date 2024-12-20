import db from "../database/db.js";

import { DataTypes } from "sequelize";

const PedidoModel = db.define('pedidos', {
    fecha: {type:DataTypes.DATE},
    estado: {type:DataTypes.STRING},
    total: {type:DataTypes.DECIMAL},
    fechaEntrega: {type:DataTypes.DATE},
    metodo_pago: {type:DataTypes.STRING},
    Usuario_idUsuario: {type:DataTypes.NUMBER},
    Cliente_idCliente: {type:DataTypes.NUMBER},
})

export default PedidoModel;