import db from "../database/db.js";

import { DataTypes } from "sequelize";
import ProductoModel from "./ProductoModel.js";

const DetallePedidoModel = db.define('detalle_pedidos', {
    cantidad: {type:DataTypes.NUMBER},
    precio_unitario: {type:DataTypes.DECIMAL},
    subtotal: {type:DataTypes.DECIMAL},
    pedido_idOrden: {type:DataTypes.NUMBER},
    Producto_idProducto: {type:DataTypes.NUMBER},
})

DetallePedidoModel.belongsTo(ProductoModel, { foreignKey: 'Producto_idProducto' });


export default DetallePedidoModel;