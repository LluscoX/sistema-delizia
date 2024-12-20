import CategoriaModel from "../models/CategoriaModel.js";

export const getAllCategoria = async (req, res) => {
    try{
        const categoria = await CategoriaModel.findAll()
        res.json(categoria)
    }catch(error){
        res.json({message:error.message})
    }
}
export const getCategoria = async (req, res) => {
    try {
        const categoria = await CategoriaModel.findAll({
            where:{id:req.params.id}
        })
        res.json(categoria[0])
    }catch(error){
        res.json({message:error.message})
    }
}
export const createCategoria = async (req, res) => {
    try {
        await CategoriaModel.create(req.body)
        res.json({
            "message":"registro creado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
export const updateCategoria = async (req, res) => {
    try {
        await CategoriaModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro actualizado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
export const deleteCategoria = async (req, res) => {
    try {
        await CategoriaModel.destroy({
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro eliminado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
