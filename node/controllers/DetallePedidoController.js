import DetallePedidoModel from "../models/DetallePedidoModel.js";
import ProductoModel from "../models/ProductoModel.js";

export const getAllDetallePedido = async (req, res) => {
    try{
        const DetallePedido = await DetallePedidoModel.findAll()
        res.json(DetallePedido)
    }catch(error){
        res.json({message:error.message})
    }
}
export const getDetallePedido = async (req, res) => {
    try {
        const DetallePedido = await DetallePedidoModel.findAll({
            where:{id:req.params.id}
        })
        res.json(DetallePedido[0])
    }catch(error){
        res.json({message:error.message})
    }
}
export const createDetallePedido = async (req, res) => {
    try {
        console.log('Detalles recibidos:', req.body);

        for (const detalle of req.body) {
            const producto = await ProductoModel.findByPk(detalle.Producto_idProducto);
            if (!producto) {
                return res.status(404).json({ message: `Producto con ID ${detalle.Producto_idProducto} no encontrado` });
            }

            if (producto.cantidad < detalle.cantidad) {
                return res.status(400).json({ message: `Cantidad insuficiente para el producto ${producto.nombre}` });
            }

            producto.cantidad -= detalle.cantidad;
            await producto.save();
        }

        const detalles = await DetallePedidoModel.bulkCreate(req.body);
        console.log('Detalles insertados:', detalles);

        res.json({
            message: "Detalles del pedido registrados correctamente",
            detalles: detalles
        });
    } catch (error) {
        console.error('Error al registrar los detalles:', error);
        res.status(500).json({ message: error.message });
    }
};  
export const updateDetallePedido = async (req, res) => {
    try {
        await DetallePedidoModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro actualizado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
export const deleteDetallePedido = async (req, res) => {
    try {
        await DetallePedidoModel.destroy({
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro eliminado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
