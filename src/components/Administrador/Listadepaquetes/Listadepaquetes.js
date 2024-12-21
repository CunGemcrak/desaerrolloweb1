import React, { useEffect, useState } from 'react'; 
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import alertify from 'alertifyjs';
import './Listarpaquetes.css';
import { eliminar_paquete, obtener_paquetes } from '../../../Redux/actions';

const Listapaquetes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const paquetes = useSelector((state) => state.PAQUETES || []);

  // Cargar los paquetes al montar el componente
  useEffect(() => {
    dispatch(obtener_paquetes());
  }, [dispatch]);

  // Maneja la eliminación del paquete
  const handleEliminar =  (id) => {
    alert(id)
    alertify.confirm('Confirmar eliminación', '¿Estás seguro de que deseas eliminar este paquete?', () => {
       dispatch(eliminar_paquete(id));
    
    }, () => {
      alertify.error('Eliminación cancelada');
    });
  };

  // Redirigir a la página de actualización de paquete
  const handleModificar = (paquete) => {
   
    navigate(`/modificarpaquete/${paquete.cont}`);

  };

  return (
    <div className="paquetes-lista">
      <h2 className="text-center">Listado de Paquetes</h2>
      <Row>
        {paquetes.length > 0 ? (
          paquetes.map((paquete) => (
            <Col key={paquete.id} md={4} className="mb-4">
              <Card className="paquete-card">
                <Card.Img variant="top" src={paquete.imagenHabitacion} />
                <Card.Body>
                  <Card.Title>{paquete.nombre}</Card.Title>
                  <Card.Text>
                    <strong>Precio:</strong> ${paquete.precio}
                  </Card.Text>
                  <div className="text-center">
                    <Button 
                      variant="warning" 
                      onClick={() => handleModificar(paquete)} 
                      className="mr-2"
                    >
                      Modificar
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleEliminar(paquete.cont)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center">
            No hay paquetes disponibles
            <Card.Img variant="top" src="https://res.cloudinary.com/dss2hdisa/image/upload/hero-m-l_helypc.png" />
          </div>
        )}
      </Row>
    </div>
  );
};

export default Listapaquetes;
