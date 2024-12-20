import ProductoModel from "../models/ProductoModel.js";
import { Buffer } from "buffer";
export const getAllProducto = async (req, res) => {
    try {
        const productos = await ProductoModel.findAll();

        const productosConImagenes = productos.map((producto) => {
            const imagenBase64 = producto.imagen
                ? Buffer.from(producto.imagen).toString('base64')
                : null;

            return {
                ...producto.toJSON(),
                imagen: imagenBase64, 
            };
        });

        res.json(productosConImagenes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getProducto = async (req, res) => {
    try {
        const Producto = await ProductoModel.findAll({
            where:{id:req.params.id}
        })
        res.json(Producto[0])
    }catch(error){
        res.json({message:error.message})
    }
}
export const createProducto = async (req, res) => {
    try {
        const { nombre, detalle, cantidad, precioVenta, categoria, imagen } = req.body;
        const imagenBuffer = imagen
            ? Buffer.from(imagen.split(",")[1], "base64")
            : null;

        await ProductoModel.create({
            nombre,
            detalle,
            cantidad,
            precioVenta,
            categoria,
            imagen: imagenBuffer,
        });

        res.json({ message: "Registro creado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateProducto = async (req, res) => {
    try {
        await ProductoModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro actualizado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}
export const deleteProducto = async (req, res) => {
    try {
        await ProductoModel.destroy({
            where: { id: req.params.id}
        })
        res.json({
            "message":"registro eliminado correctamente"
        })
    }catch(error){
        res.json({message:error.message})
    }
}