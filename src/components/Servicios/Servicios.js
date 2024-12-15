import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import './HotelService.css';

const HotelService = () => {
  // Paquetes de servicios del hotel
  const paquetes = [
 
    {
      nombre: 'Paquete Aventura Mario Kart',
      descripcion: 'Vive una experiencia emocionante con tours guiados y carreras de karts.',
      precio: 700, // Precio por persona
      value: 'paqueteAventura',
      tipoPrecio: 'individual', // Precio por persona
    },
    {
      nombre: 'Paquete Lujo Champiñón',
      descripcion: 'Relájate en nuestras suites temáticas con todas las comodidades.',
      precio: 1000, // Precio por persona
      value: 'paqueteLujo',
      tipoPrecio: 'individual', // Precio por persona
    },
    {
      nombre: 'Paquete Relax en el Spa',
      descripcion: 'Disfruta de un día completo de relajación en nuestro exclusivo spa con masajes y acceso a todas las instalaciones.',
      precio: 350, // Precio por persona
      value: 'paqueteRelaxSpa',
      tipoPrecio: 'individual', // Precio por persona
    },
    {
      nombre: 'Paquete Aventura en la Naturaleza',
      descripcion: 'Embárcate en una aventura de senderismo, pesca y campamento en las montañas cercanas.',
      precio: 600, // Precio por persona
      value: 'paqueteAventuraNaturaleza',
      tipoPrecio: 'individual', // Precio por persona
    },
   
    {
      nombre: 'Paquete Kids Club',
      descripcion: 'Diversión asegurada para los más pequeños, con actividades diarias, talleres y acceso exclusivo a la zona de juegos.',
      precio: 400, // Precio por niño
      value: 'paqueteKidsClub',
      tipoPrecio: 'individual', // Precio por niño
    },
    {
      nombre: 'Paquete VIP Executive',
      descripcion: 'Una experiencia exclusiva con acceso a nuestras suites VIP, transporte privado y cenas gourmet.',
      precio: 2000, // Precio por persona
      value: 'paqueteVIPExecutive',
      tipoPrecio: 'individual', // Precio por persona
    },
    {
      nombre: 'Paquete Fin de Semana Gastronómico',
      descripcion: 'Un fin de semana dedicado a los amantes de la gastronomía con clases de cocina y cenas temáticas.',
      precio: 800, // Precio por persona
      value: 'paqueteGastronomico',
      tipoPrecio: 'individual', // Precio por persona
    }
  ];

  return (
    <MDBContainer className="my-5 gradient-form hotel-container">
      {/* Título de los paquetes */}
      <MDBRow className="text-center mb-4">
        <MDBCol col="12">
          <h2 className="mt-2 mb-2 pb-1">Paquetes del Hotel Champiñón</h2>
          <p className="text-muted">Elige el paquete perfecto para tu estadía en nuestro hotel temático</p>
        </MDBCol>
      </MDBRow>

      {/* Fila con los paquetes */}
      <MDBRow className="d-flex justify-content-center">
        {paquetes.map((paquete, index) => (
          <MDBCol lg="4" md="6" sm="12" key={index} className="mb-4">
            <MDBCard className="h-100">
              <MDBCardBody>
                <MDBCardTitle>{paquete.nombre}</MDBCardTitle>
                <MDBCardText>{paquete.descripcion}</MDBCardText>
                <MDBCardText className="text-primary">{paquete.precio}</MDBCardText>
                <MDBBtn className="btn-mario w-100">Ver</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default HotelService;
