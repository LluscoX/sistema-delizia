import ClienteModel from "../models/ClienteModel.js";
export const getAllCliente = async (req, res) => {
    try{
        const cliente = await ClienteModel.findAll()
        res.json(cliente)
    }catch(error){
        res.json({message:error.message})
    }
}
export const getCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.findAll({
            where:{id:req.params.id}
        })
        res.json(cliente[0])
    }catch(error){
        res.json({message:error.message})
    }
}
export const createCliente = async (req, res) => {
    try {
        await ClienteModel.create(req.body)
        res.json({
            "message":"registro creado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
export const updateCliente = async (req, res) => {
    try {
        await ClienteModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro actualizado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
export const deleteCliente = async (req, res) => {
    try {
        await ClienteModel.destroy({
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro eliminado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
