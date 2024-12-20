import DetallePedidoModel from "../models/DetallePedidoModel.js";
import PedidoModel from "../models/PedidoModel.js";

export const getAllPedido = async (req, res) => {
    try{
        const Pedido = await PedidoModel.findAll()
        res.json(Pedido)
    }catch(error){
        res.json({message:error.message})
    }
}
export const getPedido = async (req, res) => {
    try {
        const Pedido = await PedidoModel.findAll({
            where:{id:req.params.id}
        })
        res.json(Pedido[0])
    }catch(error){
        res.json({message:error.message})
    }
}
export const createPedido = async (req, res) => {
    try {
        const pedido = await PedidoModel.create(req.body);
        
        res.json({
            message: "Registro creado correctamente",
            id: pedido.id 
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const updatePedido = async (req, res) => {
    try {
        const { id } = req.params; 
        const { estado } = req.body; 
        if (estado !== 'Entregado') {
            return res.status(400).json({ message: "El estado debe ser 'Entregado'" });
        }
        const pedido = await PedidoModel.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        pedido.estado = estado;
        await pedido.save();
        res.status(200).json({ message: "Estado del pedido actualizado correctamente", pedido });
    } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
export const deletePedido = async (req, res) => {
    try {
        await PedidoModel.destroy({
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro eliminado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}