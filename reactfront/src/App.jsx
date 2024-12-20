
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './assets/vendor/boxicons/css/boxicons.min.css'
import './assets/vendor/quill/quill.snow.css'
import './assets/vendor/quill/quill.bubble.css'
import './assets/vendor/remixicon/remixicon.css'
import './assets/vendor/simple-datatables/style.css'
import Login from './Login/Login.jsx'
import { BrowserRouter, Route, Link, Routes, Router } from 'react-router-dom';
import Contact from './pages/Contact/Contact.jsx'
import ListarProductos from './pages/Productos/Productos.jsx'
import EdtProcutos from './pages/Productos/EdtProcutos.jsx'
import Categorias from './pages/Categorias/Categorias.jsx'
import EditCategorias from './pages/Categorias/EditCategorias.jsx'
import Usuarios from './pages/Usuarios/Usuarios.jsx'
import EditUsuario from './pages/Usuarios/EditUsuario.jsx'
import Clientes from './pages/Clientes/Clientes.jsx'
import EditCliente from './pages/Clientes/EditCliente.jsx'
import Preventa from './pages/Ventas/Preventa.jsx'
import Verventas from './pages/Ventas/Verventas.jsx'
import VerDetallePedido from './pages/Ventas/VerDetallePedido.jsx'
import Home from './pages/home/Home.jsx'
import Registro from './Registro/Registro.jsx'
import ProductsAdul from './pages/productsAdultos/ProductsAdul.jsx'
import ProductosNinios from './pages/ProductosNinios/ProductosNinios.jsx'
import ProductosMascotas from './pages/ProductosMascotas/ProductosMascotas.jsx'
import ProductosNacionales from './pages/ProductosNacionales/ProductosNacionales.jsx'
import Sucursales from './pages/Sucursales/Sucursales.jsx'
import { CartProvider } from './CartProvider.jsx'
import AddProductos from './pages/Productos/AddProductos.jsx'
import Productos from './pages/Productos/Productos.jsx'
import MenuInventario from './pages/Menus/MenuInventario.jsx'
import AddUsuario from './pages/Usuarios/AddUsuario.jsx'
import AddRoles from './pages/Roles/AddRoles.jsx'
import Roles from './pages/Roles/Roles.jsx'
import AddCategorias from './pages/Categorias/AddCategorias.jsx'
import ProductosTable from './pages/Productos/ProductosTable.jsx'
import MenuRecetas from './pages/Recetas/MenuRecetas.jsx'
import Receta1 from './pages/Recetas/Receta1.jsx'
import Receta2 from './pages/Recetas/Receta2.jsx'
import Receta3 from './pages/Recetas/Receta3.jsx'
import InformacionesLacteos from './pages/InformacionLacteos/InformacionesLacteos.jsx'
import EditRoles from './pages/Roles/EditRoles.jsx'

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registroCliente" element={<Registro />} />
            
            <Route path="/clientes" element={<Clientes/>} />
            <Route path="/editCliente/:id" element={<EditCliente/>} />
            
            <Route path="/contacto" element={<Contact />} />
            
            <Route path="/productosadultos" element={<ProductsAdul />} />
            <Route path="/productosninios" element={<ProductosNinios />} />
            <Route path="/productosmascotas" element={<ProductosMascotas />} />
            <Route path="/productosnacionales" element={<ProductosNacionales />} />
            
            <Route path="/sucursales" element={<Sucursales />} />
            
            <Route path="/menuinventario" element={<MenuInventario/>} />
            
            <Route path="/productos" element={<Productos/>} />
            <Route path="/productosTable" element={<ProductosTable/>} />
            <Route path="/Addproductos" element={<AddProductos/>} />
            <Route path="/editProductos/:id" element={<EdtProcutos/>} />
            
            <Route path="/categorias" element={<Categorias/>} />
            <Route path="/addCategorias" element={<AddCategorias/>} />
            <Route path="/editCategorias/:id" element={<EditCategorias/>} />
            
            <Route path="/usuarios" element={<Usuarios/>} />
            <Route path="/addUsuario" element={<AddUsuario/>} />
            <Route path="/editUsuario/:id" element={<EditUsuario/>} />
            
            <Route path="/roles" element={<Roles/>} />
            <Route path="/addRoles" element={<AddRoles/>} />
            <Route path="/editRoles/:id" element={<EditRoles/>} />
            
            <Route path="/recetas" element={<MenuRecetas/>} />
            <Route path="/receta1" element={<Receta1/>} />
            <Route path="/receta2" element={<Receta2/>} />
            <Route path="/receta3" element={<Receta3/>} />
            
            <Route path="/infoLacteos" element={<InformacionesLacteos/>} />
            
            <Route path="/verVentas" element={<Verventas/>} />
            <Route path="/detalleVenta/:id" element={<VerDetallePedido/>} />
            
            
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}
{/* <Route path='/Login' element = {<Login/>}/>
<Route path='*' element = { <Login/>} />  

<Route path='/' element={ <PrivateRoute> <Layout/> </PrivateRoute>}>
  
  <Route path='contact' element = { <Contact/> }/>  
  <Route path='dashboard' element = {<Dashboard/>}/>  
  
  <Route path='preventa' element = {<Preventa/>}/>  

  <Route path='verVentas' element = {<Verventas/>}/>  
  <Route path="/verDetallePedido/:id" element={<VerDetallePedido/>} />

  <Route path='produccion' element = {<Produccion/>}/>  
  <Route path='editProduccion/:id' element = {<EditProduccion/>}/>  
  
  <Route path='productos' element = {<ListarProductos/>}/>  
  <Route path='editProduct/:id' element = {<EdtProcutos/>}/>  
  
  <Route path='categorias' element = {<Categorias/>}/>  
  <Route path='editCategorias/:id' element = {<EditCategorias/>}/>  

  <Route path='usuarios' element = {<Usuarios/>}/>  
  <Route path='editUsuario/:id' element = {<EditUsuario/>}/>  
  
  <Route path='tienda' element = {<Tiendas/>}/>  
  <Route path='editTienda/:id' element = {<EditTiendas/>}/>  
  
  <Route path='clientes' element = {<Clientes/>}/>  
  <Route path='editCliente/:id' element = {<EditCliente/>}/>  

</Route> */}

export default App
