import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import alertify from 'alertifyjs';
import { useDispatch, useSelector } from 'react-redux';
import { listaReservas, ActulizarItemLista, eliminarReservaUsuario } from '../../../Redux/actions';
import './AgregarUsuarioReserva.css';

const AgregarUsuarioReserva = () => {
  const LOGINUSER = useSelector((store) => store.LOGINUSER);
  const LISTADORESERVAS = useSelector((store) => store.LISTADORESERVAS);
  const dispatch = useDispatch();

  // Estado local para almacenar el listado ordenado
  const [reservasOrdenadas, setReservasOrdenadas] = useState([]);

  // Carga las reservas al montar el componente
  useEffect(() => {
    if (LOGINUSER?.idusuario) {
      dispatch(listaReservas(LOGINUSER.idusuario));
    }
  }, [dispatch, LOGINUSER]);

  // Actualiza el estado local cuando LISTADORESERVAS cambia
  useEffect(() => {
    if (LISTADORESERVAS && LISTADORESERVAS.length > 0) {
      const ordenadas = [...LISTADORESERVAS].sort((a, b) => {
        if (a.estado === 'Aprobado' && b.estado !== 'Aprobado') return 1;
        if (a.estado !== 'Aprobado' && b.estado === 'Aprobado') return -1;
        return 0;
      });
      setReservasOrdenadas(ordenadas);
    } else {
      setReservasOrdenadas([]); // Aseguramos que el estado local sea vacío si no hay reservas
    }
  }, [LISTADORESERVAS]);

  // Función para actualizar la lista de reservas después de eliminar o aceptar
  const actualizarReservas = async () => {
    try {

      await dispatch(listaReservas(LOGINUSER.idusuario));
     // await alert(JSON.stringify(LISTADORESERVAS))
    } catch (error) {
      console.error('Error al actualizar la lista de reservas:', error);
      alertify.error('Error al actualizar la lista de reservas');
    }
  };

  // Maneja la acción de eliminar una reserva
  const handleDelete = async (cont) => {
    try {
      // Elimina la reserva
      await dispatch(eliminarReservaUsuario(cont, LOGINUSER.idusuario));
      // Actualiza las reservas después de eliminar
      await actualizarReservas();
      alertify.success(`Reserva con cont ${cont} eliminada`);

    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      alertify.error('Hubo un error al eliminar la reserva');
    }
  };

  // Maneja la acción de aceptar una reserva
  const handleAccept = async (cont) => {
    try {
      await dispatch(ActulizarItemLista(cont, LISTADORESERVAS));
      await actualizarReservas(); // Asegúrate de recargar las reservas
      alertify.success('Reserva aceptada correctamente.');
    } catch (error) {
      console.error('Error al aceptar la reserva:', error);
      alertify.error('Hubo un error al aceptar la reserva');
    }
  };

  if (!LISTADORESERVAS) {
    // Si LISTADORESERVAS no está definido, mostrar un estado de carga o nada
    return (
      <div className="text-center">
        <p>Cargando reservas...</p>
      </div>
    );
  }

  return (
    <Card className="shadow-lg card-style border-black">
      <Card.Header className="bg-black text-white text-center">
        <h5>Reservas</h5>
      </Card.Header>
      <Card.Body>
        <Container>
          {LISTADORESERVAS.length === 0 ? (  // Condición para mostrar "No hay reservas"
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/dss2hdisa/image/upload/hero-m-l_helypc.png"
                alt="No hay reservas"
                className="img-fluid"
                style={{ maxHeight: '300px' }}
              />
              <p className="mt-3">No hay reservas disponibles.</p>
            </div>
          ) : (
            <Row className="g-4">
              {reservasOrdenadas.map((reserva) => (
                <Col xs={12} md={6} lg={4} key={reserva.cont}>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>
                        {reserva.nombre} {reserva.papellido} {reserva.sapellido}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {reserva.paquete}
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Cantidad de Personas:</strong> {reserva.canpersonas} <br />
                        <strong>Costo:</strong> ${reserva.costopaquete}
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant={reserva.estado === 'Aprobado' ? 'success' : 'primary'}
                          size="sm"
                          onClick={() => handleAccept(reserva.cont)}
                          disabled={reserva.estado === 'Aprobado'}
                        >
                          {reserva.estado === 'Aprobado' ? 'Aprobado' : 'Aceptar'}
                        </Button>
                        {reserva.estado !== 'Aprobado' && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(reserva.cont)}
                          >
                            Eliminar
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </Card.Body>
    </Card>
  );
};

export default AgregarUsuarioReserva;
