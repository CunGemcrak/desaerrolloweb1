import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { MDBCol } from 'mdb-react-ui-kit';
import './Registrar.css';
//import { paquetes } from '../../bd';
import alertify from 'alertifyjs';
import { useDispatch, useSelector } from 'react-redux';
import { reservaHotel } from '../../Redux/actions';
import { useNavigate } from 'react-router';

const RegistrarHotelForm = () => {
  const USER = useSelector((state) => state.USER);
  const LOGINUSER = useSelector((state) =>
    state.LOGINUSER !== undefined && state.LOGINUSER !== null ? state.LOGINUSER : null
  );
const paquetes = useSelector((state)=>state.PAQUETES || [])
  const [activar, setActivar] = useState(USER);
  const [formData, setFormData] = useState({
    paquete: '',
    numPersonas: 1,
    precioTotal: 0,
  });
  const [errors, setErrors] = useState({ paquete: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Efecto para calcular el precio total
  useEffect(() => {
    if (formData.paquete) {
      const paqueteSeleccionado = paquetes.find(
        (paquete) => paquete.value === formData.paquete
      );
      if (paqueteSeleccionado) {
        let precioTotal = paqueteSeleccionado.precio || 0; // Asegura un valor numérico
        if (paqueteSeleccionado.tipoPrecio === 'individual') {
          precioTotal *= formData.numPersonas;
        }
        setFormData((prev) => ({ ...prev, precioTotal: Number(precioTotal) }));
      }
    }
  }, [formData.paquete, formData.numPersonas]);

  // Efecto para validar el formulario
  useEffect(() => {
    const isValid =
      Object.values(errors).every((error) => error === '') &&
      Object.values(formData).every((field) => field !== '');
    setIsFormValid(isValid);
  }, [errors, formData]);

  // Manejo del cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validación del campo de paquete
  const validarSelecciondePaquete = (valor) => {
    if (!valor || valor === 'Seleccione') {
      setErrors((prev) => ({ ...prev, paquete: 'Por favor seleccione un paquete.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, paquete: '' }));
    return true;
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (id === 'paquete') validarSelecciondePaquete(value);
  };

  // Registro o redirección según el estado del usuario
  const handleRegistrar = () => {
    navigate('/registrate');
  };

  // Guardar reserva y redirigir
  const handleSave = () => {
    if (!isFormValid) {
      alertify.error('Por favor, corrige los errores antes de continuar.');
      return;
    }
    if (!LOGINUSER) {
      alertify.error('Por favor, inicia sesión para continuar.');
      return;
    }
    try {
      dispatch(reservaHotel(formData, LOGINUSER));
      alertify.success('¡Reserva Asignada!');
      navigate('/AddUsuarioPaquete');
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      alertify.error('Error al realizar la reserva, inténtelo nuevamente.');
    }
  };

  // Cancelar y redirigir al perfil
  const handleCancel = () => {
    navigate('/PerfilUsuario');
  };

  return (
    <Container className="my-4">
      <Card className="shadow-lg card-style">
        <Card.Header className="bg-black text-white text-center">
          <h4 className="textoformulario">¡Bienvenido al Hotel Champiñón!</h4>
        </Card.Header>
        <Card.Body className="Hotel_Body">
          <Row className="mb-3">
            <MDBCol col="12" className="text-center mb-4">
              <img
                src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg"
                style={{ width: '30%', borderRadius: '20%' }}
                alt="Mario Kart"
              />
              <h4 className="mt-2 mb-2 pb-1 text-primary">Formulario de Registro</h4>
            </MDBCol>
          </Row>

          <Form>
            {/* Selección de paquete */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label>Seleccione Paquete</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  id="paquete"
                  name="paquete"
                  value={formData.paquete}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="form-control-mario"
                >
                  <option value="">Seleccione el paquete</option>
                  {paquetes.map((paquete, index) => (
                    <option key={index} value={paquete.value}>
                      {paquete.nombre} - ${paquete.precio}
                    </option>
                  ))}
                </Form.Control>
                {errors.paquete && <p className="text-danger">{errors.paquete}</p>}
              </Col>
            </Row>

            {/* Campo de número de personas */}
            {formData.paquete && (
              <Row className="mb-3">
                <Col sm={4}>
                  <Form.Label>Número de Personas</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control
                    type="number"
                    name="numPersonas"
                    value={formData.numPersonas}
                    onChange={handleChange}
                    min="1"
                    required
                    className="form-control-mario"
                  />
                </Col>
              </Row>
            )}

            {/* Mostrar total */}
            {formData.precioTotal > 0 && (
              <Row>
                <Col sm={4}>
                  <Form.Label>Total a Pagar</Form.Label>
                </Col>
                <Col sm={8}>
                  <p><strong>${Number(formData.precioTotal).toFixed(2)}</strong></p>
                </Col>
              </Row>
            )}

            {/* Botones */}
            <div className="text-center">
              {!activar ? (
                <Button className="btn-mario" onClick={handleRegistrar}>
                  Regístrate
                </Button>
              ) : (
                <>
                  <Button className="btn-success" onClick={handleSave}>
                    Guardar
                  </Button>
                  <Button className="btn-danger m-2" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegistrarHotelForm;
