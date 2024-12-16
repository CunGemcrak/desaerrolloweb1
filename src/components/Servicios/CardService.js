import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './CardService.css';

const CardService = () => {
  const location = useLocation();
  const navigate = useNavigate();
 
const handleNavegation = (dato)=>{
    navigate(dato); 
}
  // Obtén el paquete del estado de navegación
  const paquete = location.state?.paquete;
  

  if (!paquete) {
    return <div>No se encontró información del paquete.</div>;
  }

  return (
    <div className="card-container">
      <Card className="card-tematica">
      <Card.Header className="text-bg-danger border-2 rounded-t-5">
          <Card.Title className="titulo-paquete m-4 text-light text-uppercase">{paquete.nombre}</Card.Title>
        </Card.Header>
        <Card.Img variant="top" 
        src={paquete.imagenHabitacion} 
        alt="Imagen del paquete" 
        
        className="imagen-paquete" />
        <Card.Body>
         
          <div className="contenido-paquete">
            <div className="seccion">
              <h2 className="titulo-seccion">Descripción</h2>
              <p>{paquete.descripcion}</p>
            </div>
            <div className="seccion">
              <h2 className="titulo-seccion">Precio</h2>
              <p>${paquete.precio}</p>
            </div>
            <div className="seccion">
              <h2 className="titulo-seccion">Alimentación</h2>
              <p>{paquete.alimentacion}</p>
            </div>
            <div className="seccion">
              <h2 className="titulo-seccion">Actividades Incluidas</h2>
              <p>{paquete.actividades.join('. ')}</p>
            </div>
            <div className="seccion">
              <h2 className="titulo-seccion">Adicionales</h2>
              <p>{paquete.adicionales.join('. ')}</p>
            </div>
          </div>
          <div className="cajadebotones">
          <Button className="boton-rojo" onClick={() => handleNavegation('/Servicios')}>
        <i className="fa-solid fa-mushroom"></i> Volver
      </Button>
      <Button className="boton-amarillo" onClick={() => handleNavegation('/registro')} >
        <i className="fa-solid fa-star"></i> Reservar
      </Button>
      
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardService;
