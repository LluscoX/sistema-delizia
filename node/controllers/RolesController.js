import RolesModel from "../models/RolesModel.js"
export const getAllRoles = async (req, res) => {
    try{
        const roles = await RolesModel.findAll()
        res.json(roles)
    }catch(error){
        res.json({message:error.message})
    }
}
export const getRoles = async (req, res) => {
    try {
        const roles = await RolesModel.findAll({
            where:{id:req.params.id}
        })
        res.json(roles[0])
    }catch(error){
        res.json({message:error.message})
    }
}
export const createRoles = async (req, res) => {
    try {
        await RolesModel.create(req.body)
        res.json({
            "message":"registro creado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
export const updateRoles = async (req, res) => {
    try {
        await RolesModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro actualizado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
export const deleteRoles = async (req, res) => {
    try {
        await RolesModel.destroy({
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro eliminado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
