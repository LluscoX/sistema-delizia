import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuInventario from '../Menus/MenuInventario';
function VerDetallePedido() {
    const { id } = useParams(); 
    const [detalles, setDetalles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8000/verdetalle_pedido/${id}/detalles`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los detalles.');
                }
                return response.json();
            })
            .then((data) => {
                setDetalles(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Cargando detalles...</div>;
    }

    if (!detalles.length) {
        return <div>No hay detalles disponibles para este pedido.</div>;
    }

    return (
        <div>
            <MenuInventario/>
        <main  className="main-container">
            <div className="page-title">
                <h1>Detalles del Pedido #{id}</h1>
            </div>
    
            <table className="table-custom">
                <thead>
                    <tr>
                        <th className="table-header-custom">Nombre Del Producto</th>
                        <th className="table-header-custom">Cantidad</th>
                        <th className="table-header-custom">Precio Unitario</th>
                        <th className="table-header-custom">Subtotal</th>
                        <th className="table-header-custom">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {detalles.map((detalle) => (
                        <tr key={detalle.id}>
                            <td className="table-cell-custom">{detalle.producto?.nombre || "Producto no encontrado"}</td>
                            <td className="table-cell-custom">{detalle.cantidad}</td>
                            <td className="table-cell-custom">{detalle.precio_unitario}</td>
                            <td className="table-cell-custom">{detalle.subtotal}</td>
                            <td className="table-cell-custom">{detalle.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    </div>
    
    );
}

export default VerDetallePedido;
