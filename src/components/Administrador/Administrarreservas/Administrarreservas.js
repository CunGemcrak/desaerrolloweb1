import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import alertify from 'alertifyjs';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarReservaUsuario, listado_de_reservas_all, aprobar_reserva_admin } from '../../../Redux/actions';
import './Adminlistreservasusuarios.css';  // Asegúrate de tener el CSS adecuado

const AdAdministrarreservasusuarios = () => {
  const dispatch = useDispatch();

  // Obtener el listado de reservas desde el estado global de Redux
  const reservas = useSelector((state) => state.LISTADORESERVAS || []);
  const [reservasOrdenadas, setReservasOrdenadas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Estado para controlar la carga

  // Carga las reservas al montar el componente
  useEffect(() => {
    dispatch(listado_de_reservas_all());
  }, [dispatch]);

  // Actualiza el estado local cuando se recibe el listado de reservas
  useEffect(() => {
    if (reservas && reservas.length > 0) {
      const ordenadas = [...reservas].sort((a, b) => {
        if (a.estado === 'Aprobado' && b.estado !== 'Aprobado') return 1;
        if (a.estado !== 'Aprobado' && b.estado === 'Aprobado') return -1;
        return 0;
      });
      setReservasOrdenadas(ordenadas);
    } else {
      setReservasOrdenadas([]);
    }

    setIsLoading(false);  // Termina la carga de datos
  }, [reservas]);

  // Función para eliminar una reserva
  const handleDelete = (cont) => {
    // Muestra el cuadro de confirmación
    alertify.confirm(
      'Confirmar Eliminación',  // Título del cuadro de confirmación
      `¿Estás seguro de que deseas eliminar la reserva con Número de Registro ${cont}?`,  // Mensaje
      async () => {  // Si el usuario confirma
        try {
          await dispatch(eliminarReservaUsuario(cont));  // Despacha la acción para eliminar la reserva
          alertify.success(`Reserva con Numero de Registro ${cont} eliminada`);  // Muestra un mensaje de éxito
        } catch (error) {
          console.error('Error al eliminar la reserva:', error);
          alertify.error('Hubo un error al eliminar la reserva');  // Muestra un mensaje de error
        }
      },
      () => {  // Si el usuario cancela
        alertify.error('Eliminación cancelada');
      }
    ).set('labels', { ok: 'Sí', cancel: 'No' });  // Personaliza los botones (Opcional)
  };

  // Función para aceptar una reserva
  const handleAccept = async (cont, estado) => {
    try {
     // alertify.success('Reserva aceptada correctamente.');
      if(estado === 'Pendiente'){
     
        dispatch(aprobar_reserva_admin(cont, 'Aprobado'))
       // alertify.success("Reserva Aprobada")
      }else
      if(estado === 'Aprobado'){
       // alert("Aprobado")
        dispatch(aprobar_reserva_admin(cont, 'Pendiente'))
     //   alertify.success("Reserva No Aprobada")
      }
    } catch (error) {
      console.error('Error al aceptar la reserva:', error);
      alertify.error('Hubo un error al aceptar la reserva');
    }
  };

  // Condición para renderizar mientras carga o si no hay reservas
  if (isLoading) {
    return (
      <div className="text-center">
        <p>Cargando reservas...</p>
      </div>
    );
  }

  if (reservasOrdenadas.length === 0) {
    return (
      <div className="text-center">
        <p>No hay reservas disponibles.</p>
      </div>
    );
  }

  return (
    <Card className="shadow-lg card-style border-black">
      <Card.Header className="bg-black text-white text-center">
        <h5>Listado de Reservas de Usuarios</h5>
      </Card.Header>
      <Card.Body>
        <Container>
          <Row className="g-4">
            {reservasOrdenadas.map((reserva) => (
              <Col xs={12} md={6} lg={4} key={reserva.cont}>
                <Card className="h-100">
                  <Card.Body>
                    {/* Imagen de la reserva */}
                    <Card.Title>
                      {reserva.nombre} {reserva.papellido} {reserva.sapellido}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {reserva.paquete}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Número Registro:</strong> {reserva.cont}<br />
                      <strong>Tipó de Identificación:</strong> {reserva.tidentificacion}<br />
                      <strong>Numero:</strong> {reserva.idusuario} <br />
                      <strong>Celular:</strong> {reserva.celular} <br />
                      <strong>Correo:</strong> {reserva.mail} <br />
                      <strong>Cantidad de Personas:</strong> {reserva.canpersonas} <br />
                      <strong>Costo:</strong> ${reserva.costopaquete} <br />
                      <strong>Estado:</strong> {reserva.estado} <br />
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                    
                      {/* Botón de estado que cambia según el estado */}
                      <Button
                        variant={reserva.estado === 'Aprobado' ? 'success' : 'warning'}
                        size="sm"
                        onClick={() => handleAccept(reserva.cont, reserva.estado)}
                         // Deshabilita si está aprobado
                      >
                        {reserva.estado}
                      </Button>
                    
                      {/* Botón de eliminación siempre activo */}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(reserva.cont)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default AdAdministrarreservasusuarios;
