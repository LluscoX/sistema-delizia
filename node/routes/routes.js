import express from 'express';
import { createUsuario, deleteUsuario, getAllUsuario, getUsuario, updateUsuario } from '../controllers/UsuarioController.js';
import { createCliente, deleteCliente, getAllCliente, getCliente, updateCliente } from '../controllers/ClienteController.js';
import { createCategoria, deleteCategoria, getAllCategoria, getCategoria, updateCategoria } from '../controllers/CategoriaController.js';
import { createPedido, deletePedido, getAllPedido, getPedido, updatePedido } from '../controllers/PedidoController.js';
import { createDetallePedido, deleteDetallePedido, getAllDetallePedido, getDetallePedido, updateDetallePedido } from '../controllers/DetallePedidoController.js';
import {  createProducto, deleteProducto, getAllProducto, getProducto, updateProducto } from '../controllers/ProductoController.js';
import { createRoles, deleteRoles, getAllRoles, getRoles, updateRoles } from '../controllers/RolesController.js';


export const RouterRoles = express.Router()
RouterRoles.get('/', getAllRoles)
RouterRoles.get('/:id', getRoles)
RouterRoles.post('/', createRoles)
RouterRoles.put('/:id', updateRoles)
RouterRoles.delete('/:id', deleteRoles)
export const RouterProducto = express.Router()
RouterProducto.get('/', getAllProducto)
RouterProducto.get('/:id', getProducto)
RouterProducto.post('/', createProducto)
RouterProducto.put('/:id', updateProducto)
RouterProducto.delete('/:id', deleteProducto)
export const RouterDetallePedido = express.Router()
RouterDetallePedido.get('/', getAllDetallePedido)
RouterDetallePedido.get('/:id', getDetallePedido)
RouterDetallePedido.post('/', createDetallePedido)
RouterDetallePedido.put('/:id', updateDetallePedido)
RouterDetallePedido.delete('/:id', deleteDetallePedido)
export const RouterPedido = express.Router()
RouterPedido.get('/', getAllPedido)
RouterPedido.get('/:id', getPedido)
RouterPedido.post('/', createPedido)
RouterPedido.put('/:id', updatePedido)
RouterPedido.delete('/:id', deletePedido)
export const RouterCategoria = express.Router()
RouterCategoria.get('/', getAllCategoria)
RouterCategoria.get('/:id', getCategoria)
RouterCategoria.post('/', createCategoria)
RouterCategoria.put('/:id', updateCategoria)
RouterCategoria.delete('/:id', deleteCategoria)
export const RouterUsuario = express.Router()
RouterUsuario.get('/', getAllUsuario)
RouterUsuario.get('/:id', getUsuario)
RouterUsuario.post('/', createUsuario)
RouterUsuario.put('/:id', updateUsuario)
RouterUsuario.delete('/:id', deleteUsuario)
export const RouterCliente = express.Router()
RouterCliente.get('/', getAllCliente)
RouterCliente.get('/:id', getCliente)
RouterCliente.post('/', createCliente)
RouterCliente.put('/:id', updateCliente)
RouterCliente.delete('/:id', deleteCliente)


