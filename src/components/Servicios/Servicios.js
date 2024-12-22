import React, { useEffect } from 'react';
import {Button } from 'react-bootstrap/'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from 'mdb-react-ui-kit';
import './HotelService.css';

import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { listadopaquetesAll } from '../../Redux/actions';


const HotelService = () => {
    // Estado para almacenar el paquete seleccionado
  // const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate =useNavigate();
  const paquetes = useSelector((state)=>state.PAQUETES || [])
  const dispach = useDispatch()

  // Función para manejar la selección y redirección
  const handleViewDetails = (paquete) => {
  //  setSelectedPackage(paquete);
  navigate('/detalle-paquete', { state: { paquete } }); // Pasa el paquete a través del estado de navegación
  };

  useEffect(()=>{

dispach(listadopaquetesAll())
  }, [dispach]);
  

  return (
    <MDBContainer className="my-5 gradient-form hotel-container ">
      {/* Título de los paquetes */}
      <MDBRow className="text-center mb-4 ">
        <MDBCol col="12">
          <h2 className="mt-2 mb-2 pb-1">Paquetes del Hotel Champiñón</h2>
          <p className="text-muted">Elige el paquete perfecto para tu estadía en nuestro hotel temático</p>
        </MDBCol>
      </MDBRow>

      {/* Fila con los paquetes */}
      <MDBRow className="d-flex justify-content-center">
      {paquetes.map((paquete) => (
  <MDBCol lg="4" md="6" sm="12" key={paquete.id} className="mb-4">
    <MDBCard className="h-100">
      <MDBCardBody>
        <MDBCardTitle>{paquete.nombre}</MDBCardTitle>
        <MDBCardText>{paquete.descripcion}</MDBCardText>
        <MDBCardText className="text-primary">${paquete.precio}</MDBCardText>
        
        {/* Verifica si actividades es un arreglo antes de intentar usar join */}
        <MDBCardText>
          {Array.isArray(paquete.actividades) && paquete.actividades.length > 0 
            ? paquete.actividades.join(', ') 
            : "No hay actividades disponibles"}
        </MDBCardText>

        {/* Al hacer clic, actualiza el paquete seleccionado */}
        <Button variant="outline-danger" onClick={() => handleViewDetails(paquete)}>
          Ver {paquete.id}
        </Button>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
))}

      </MDBRow>

    
    </MDBContainer>
  );
};

export default HotelService;
