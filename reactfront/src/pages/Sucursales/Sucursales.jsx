import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Sucursales.css'
import MenuInventario from '../Menus/MenuInventario';



const Sucursales = () => {
  useEffect(() => {
    // Inicializar el mapa
    const map = L.map("map").setView([-17.376893, -66.159084], 13);

    // Cargar las capas del mapa
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Coordenadas y detalles de las tiendas
    const coordenadas = [
      {
        coords: [-17.37132975690567, -66.17446181790388],
        name: "Tienda Delizia América",
        image: "imagenes/delizia1 (1).jpg",
        direccion: "JRGM+44H, Cochabamba",
        contacto: "78901234",
        fecha: "10 septiembre 2024",
      },
      {
        coords: [-17.392661432491444, -66.16096813324621],
        name: "Tienda Delizia Heroínas",
        image: "imagenes/delizia2.jpg",
        direccion: "JRGM+44H, Cochabamba",
        contacto: "78901234",
        fecha: "10 septiembre 2024",
      },
      {
        coords: [-17.38730165021983, -66.15479610626073],
        name: "Tienda Delizia Colón",
        image: "imagenes/delizia3.jpg",
        direccion: "JRGM+44H, Cochabamba",
        contacto: "78901234",
        fecha: "10 septiembre 2024",
      },
      {
        coords: [-17.373709526026467, -66.14248428757317],
        name: "Tienda Delizia Tupuraya",
        image: "imagenes/delizia3.jpg",
        direccion: "JRGM+44H, Cochabamba",
        contacto: "78901234",
        fecha: "10 septiembre 2024",
      },
      {
        coords: [-17.372087750094085, -66.15342933404925],
        name: "Tienda Delizia América",
        image: "imagenes/delizia3.jpg",
        direccion: "JRGM+44H, Cochabamba",
        contacto: "78901234",
        fecha: "10 septiembre 2024",
      },
    ];

    // Agregar marcadores al mapa
    coordenadas.forEach((tienda) => {
      const marker = L.marker(tienda.coords).addTo(map);
      const popupContent = `
        <div style="text-align: center;">
          <img src="${tienda.image}" alt="${tienda.name}" style="width:100px;">
          <h3>${tienda.name}</h3>
          <p>Contacto: ${tienda.contacto}</p>
          <p>Dirección: ${tienda.direccion}</p>
          <p>Fecha: ${tienda.fecha}</p>
          <button style="background-color: #004aad; color: white; padding: 5px 10px; border: none; border-radius: 5px;">Hacer Pedido</button>
        </div>
      `;
      marker.bindPopup(popupContent);
    });
  }, []);

  return (
    <div>
    <MenuInventario />
    <div className="delizia-container">
      <h1 className="delizia-title">Ubicaciones de las agencias Delizia</h1>
  
      <div className="delizia-content">
        {/* Columna de filtros y lista de sucursales */}
        <div className="delizia-sidebar">
          <div className="delizia-filters">
            {/* {["ALL", "COCHABAMBA", "LA PAZ", "ORURO", "CHUQUISACA", "TARIJA", "EL ALTO", "SANTA CRUZ", "POTOSÍ"].map(
              (region) => (
                <button key={region} className="delizia-filter-btn">
                  {region}
                </button>
              )
            )} */}
          </div>
  
          <div className="delizia-search">
            <input type="text" placeholder="Buscar Todos..." className="delizia-search-input" />
          </div>
  
          <div className="delizia-branch-list">
            {[
              {
                indicatorClass: "indicator-red",
                name: "16 De Julio",
                details: "Av. 16 de Julio casi esquina Alfonso Ugarte, No. 877 de la ciudad de El Alto.",
              },
              {
                indicatorClass: "indicator-yellow",
                name: "25 De Mayo",
                details: "25 de Mayo #1153 casi Punata.",
              },
              {
                indicatorClass: "indicator-green",
                name: "3 Pasos al Frente",
                details: "Av. 3 Pasos al Frente s/n Barrio Héroes del Chaco de la ciudad de Santa Cruz.",
              },
              {
                indicatorClass: "indicator-green",
                name: "Achachicala",
                details: "Av. Ramos Gavilán No. 1993 Parada Micro 155, zona Achachicala.",
              },
              {
                indicatorClass: "indicator-red",
                name: "Achumani 2 Calle 30",
                details: "Achumani, Calle 30 esquina Calle 2.",
              },
            ].map((branch, index) => (
              <div key={index} className="delizia-branch">
                <span className={`delizia-indicator ${branch.indicatorClass}`}></span>
                <p>
                  <strong>{branch.name}</strong>
                  <br />
                  {branch.details}
                </p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Mapa */}
        <div id="map" className="delizia-map"></div>
      </div>
    </div>
  </div>
  
  )
}

export default Sucursales