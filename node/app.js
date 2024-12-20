
import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import multer from 'multer';
import bodyParser from 'body-parser';
import { RouterCategoria, RouterCliente, RouterDetallePedido, RouterPedido, RouterProducto, RouterRoles, RouterUsuario } from './routes/routes.js'
import DetallePedidoModel from "./models/DetallePedidoModel.js";
import ProductoModel from "./models/ProductoModel.js";

const app = express()
const SECRETKEY = 'cocacolaEspuma';
const storage = multer.memoryStorage(); 
const upload = multer({ storage });
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cors())
app.use(express.json())
app.use('/usuario', RouterUsuario)
app.use('/cliente', RouterCliente)
app.use('/categoria', RouterCategoria)
app.use('/pedido', RouterPedido)
app.use('/detalle_pedido', RouterDetallePedido)
app.use('/producto', RouterProducto)
app.use('/roles', RouterRoles)
try {
    await db.authenticate()
    console.log("conecion exitosa BD")
} catch (error) {
    console.log(`el error es: ${error}`)
}

app.get('/', (req, res) => {
    res.send("Hola mundo")
})

app.listen(8000, () => {
    console.log('server UP running in http://localhost:8000/')
})
app.post('/producto/upload', upload.single('imagen'), async (req, res) => {
    const { nombre, detalle, cantidad, precioVenta, categoria } = req.body;
    const imagen = req.file ? req.file.buffer : null;

    try {
        const nuevoProducto = await ProductoModel.create({
            nombre,
            detalle,
            imagen,
            cantidad,
            precioVenta,
            categoria,
        });

        res.status(201).json({
            message: 'Producto agregado exitosamente',
            producto: nuevoProducto,
        });
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

app.get('/producto/:id/imagen', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT imagen FROM productos WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err || results.length === 0) {
            res.status(404).send('Imagen no encontrada');
        } else {
            res.set('Content-Type', 'image/jpeg'); 
            res.send(results[0].imagen);
        }
    });
});
app.put('/producto/edit/:id', upload.single('imagen'), async (req, res) => {
    const { id } = req.params; 
    const { nombre, detalle, cantidad, precioVenta, categoria } = req.body; 
    const imagen = req.file ? req.file.buffer : null; 

    try {
        const producto = await ProductoModel.findByPk(id);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        producto.nombre = nombre || producto.nombre;
        producto.detalle = detalle || producto.detalle;
        producto.cantidad = cantidad || producto.cantidad;
        producto.precioVenta = precioVenta || producto.precioVenta;
        producto.categoria = categoria || producto.categoria;

        if (imagen) {
            producto.imagen = imagen;
        }
        await producto.save();

        res.status(200).json({
            message: 'Producto actualizado exitosamente',
            producto: producto,
        });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});


app.get('/productos/imagenes', async (req, res) => {
    try {
        const productos = await ProductoModel.findAll();

        if (!productos || productos.length === 0) {
            return res.status(404).send('No se encontraron productos');
        }
        const productosJSON = productos.map(producto => {
            const productoData = producto.toJSON();
            if (productoData.imagen) {
                productoData.imagen = productoData.imagen.toString('base64');
            }

            return productoData;
        });

        res.json(productosJSON); 
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error en el servidor');
    }
});


app.post('/auth', async (req, res) => {
    const sql = "SELECT `id`, `username`, `password` FROM `usuarios` WHERE `username` = " + `'${req.body.username}'` + " AND `password` = " + ` '${req.body.password}'`;
    const [data] = await db.query(sql, [req.body.username, req.body.clave]);
    if (data.length > 0) {
        const { id } = data[0];
        return res.json({ status: "success_usuario", id });
    } else {
        const sql1 = "SELECT `id`, `username`, `password` FROM `clientes` WHERE `username` = " + `'${req.body.username}'` + " AND `password` = " + ` '${req.body.password}'`;
        const [data] = await db.query(sql1, [req.body.username, req.body.clave]);
        if(data.length > 0 ){    
            const { id } = data[0];
            return res.json({ status: "success_cliente", id });
        }else{
            return res.json({ status: "failed" });
        }
    }
});


app.get('/detalle_ventas', async (req, res) => {
    const query = `
        SELECT 
            pedidos.id AS id_pedido,
            pedidos.fecha,
            pedidos.estado,
            pedidos.total AS cantidad_total,
            pedidos.fechaEntrega,
            pedidos.metodo_pago,
            clientes.nombre AS nombre
        FROM 
            pedidos
        JOIN 
            clientes ON pedidos.Cliente_idCliente = clientes.id;
    `;
    
    try {
        const [data] = await db.query(query);
        if (data.length > 0) {
            res.json(data);  
        } else {
            res.status(404).json({ message: 'No se encontraron registros de producción' });
        }
    } catch (error) {
        console.error('Error al obtener la producción:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


app.get('/verdetalle_pedido/:id/detalles', async (req, res) => {
    const { id } = req.params;
    try {
        const detalles = await DetallePedidoModel.findAll({
            where: { pedido_idOrden: id },
            include: {
                model: ProductoModel,
                attributes: ['nombre'], 
            },
        });

        if (!detalles || detalles.length === 0) {
            return res.status(404).json({ message: 'Detalles no encontrados' });
        }

        res.json(detalles); 
    } catch (error) {
        console.error('Error al obtener los detalles:', error);
        res.status(500).json({ message: 'Error al obtener los detalles del pedido' });
    }
});


app.put('/productosedit/:id', async (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;  // La cantidad restante después de la venta

    try {
        const producto = await ProductoModel.findByPk(id);  // Busca el producto por su ID
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualiza la cantidad en el inventario
        producto.cantidad = cantidad;

        await producto.save();  // Guarda los cambios
        res.status(200).json({ message: 'Inventario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: error.message });
    }
});