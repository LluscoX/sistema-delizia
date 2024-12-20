import UsuarioModel from "../models/UsuarioModel.js";
export const getAllUsuario = async (req, res) => {
    try{
        const usuario = await UsuarioModel.findAll()
        res.json(usuario)
    }catch(error){
        res.json({message:error.message})
    }
}
export const getUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findAll({
            where:{id:req.params.id}
        })
        res.json(usuario[0])
    }catch(error){
        res.json({message:error.message})
    }
}
export const createUsuario = async (req, res) => {
    try {
        await UsuarioModel.create(req.body)
        res.json({
            "message":"registro creado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
export const updateUsuario = async (req, res) => {
    try {
        await UsuarioModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro actualizado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
export const deleteUsuario = async (req, res) => {
    try {
        await UsuarioModel.destroy({
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro eliminado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
