import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Nav } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import './CrearPaquete.css'; // Asegúrate de tener los estilos personalizados si es necesario
import alertify from 'alertifyjs';
import { create_paquete } from '../../../Redux/actions'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Crearpaquete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CREATEPAQUETE = useSelector((state) => state.CREATEPAQUETE);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    value: '',
    tipoPrecio: '',
    imagenHabitacion: '',
    alimentacion: '',
    actividades: '',
    adicionales: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    value: '',
    tipoPrecio: '',
    imagenHabitacion: '',
    alimentacion: '',
    actividades: '',
    adicionales: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Validación de campos
  const validateName = (name) => {
    if (name.length < 3) {
      setErrors((prev) => ({ ...prev, nombre: 'El nombre debe tener al menos 3 caracteres.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, nombre: '' }));
    return true;
  };

  const validatePrecio = (precio) => {
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
      setErrors((prev) => ({ ...prev, precio: 'El precio debe ser un número mayor a 0.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, precio: '' }));
    return true;
  };

  const validateDescripcion = (descripcion) => {
    if (descripcion.length < 10) {
      setErrors((prev) => ({ ...prev, descripcion: 'La descripción debe tener al menos 10 caracteres.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, descripcion: '' }));
    return true;
  };

  const checkFormValidity = () => {
    const isValid = Object.values(errors).every((error) => error === '') &&
                    Object.values(formData).every((field) => field !== '');
    setIsFormValid(isValid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;

    if (id === 'paquete-nombre') validateName(value);
    if (id === 'paquete-descripcion') validateDescripcion(value);
    if (id === 'paquete-precio') validatePrecio(value);
  };

  useEffect(() => {
    checkFormValidity();
  }, [errors, formData]);

  useEffect(() => {
    if (CREATEPAQUETE) {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        value: '',
        tipoPrecio: '',
        imagenHabitacion: '',
        alimentacion: '',
        actividades: '',
        adicionales: '',
      });

      setErrors({
        nombre: '',
        descripcion: '',
        precio: '',
        value: '',
        tipoPrecio: '',
        imagenHabitacion: '',
        alimentacion: '',
        actividades: '',
        adicionales: '',
      });

      navigate('/crearpaquete');
    }
  }, [CREATEPAQUETE]);

  const handleSubmit = () => {
    if (isFormValid) {
      alert('¡Paquete creado correctamente!');
      alertify.success('¡Paquete creado correctamente!');
      dispatch(create_paquete(formData));
    } else {
      alert('Por favor, corrige los errores antes de continuar.');
      alertify.error('Por favor, corrige los errores antes de continuar.');
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBRow className="d-flex align-items-center justify-content-center">
        {/* Columna izquierda: Formulario de Creación de Paquete */}
        <MDBCol>
          <Card className="shadow-lg card-style border-black">
            <Card.Header className="bg-black text-white text-center">
              <h4 className="textocolor">¡Crea tu paquete en el Hotel Champiñón!</h4>
            </Card.Header>
            <Card.Body className="Hotel_Body">
              <div className="card-container">
                {/* Nombre del paquete */}
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div className="d-flex form-label texto-mario">Nombre del Paquete</div>
                    <MDBInput
                      id="paquete-nombre"
                      name="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control-mario"
                    />
                    {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
                  </MDBCol>
                </MDBRow>

                {/* Descripción del paquete */}
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div className="d-flex form-label texto-mario">Descripción</div>
                    <MDBInput
                      id="paquete-descripcion"
                      name="descripcion"
                      type="text"
                      value={formData.descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control-mario"
                    />
                    {errors.descripcion && <p className="text-danger">{errors.descripcion}</p>}
                  </MDBCol>
                </MDBRow>

                {/* Precio del paquete */}
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div className="d-flex form-label texto-mario">Puntaje</div>
                    <MDBInput
                      id="paquete-precio"
                      name="precio"
                      type="text"
                      value={formData.precio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control-mario"
                    />
                    {errors.precio && <p className="text-danger">{errors.precio}</p>}
                  </MDBCol>
                </MDBRow>

                {/* Otros campos del formulario */}
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div className="d-flex form-label texto-mario">Valor</div>
                    <MDBInput
                      id="paquete-value"
                      name="value"
                      type="text"
                      value={formData.value}
                      onChange={handleChange}
                      className="form-control-mario"
                    />
                  </MDBCol>
                </MDBRow>

                {/* Tipo de Precio */}
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div className="d-flex form-label texto-mario">Tipo de Precio</div>
                    <Form.Control
                      as="select"
                      id="paquete-tipoPrecio"
                      name="tipoPrecio"
                      value={formData.tipoPrecio}
                      onChange={handleChange}
                      className="form-control-mario"
                    >
                      <option value="">Seleccione</option>
                      <option value="Por Persona">Por Persona</option>
                      <option value="Por Paquete">Por Paquete</option>
                    </Form.Control>
                  </MDBCol>
                </MDBRow>

                {/* Imagen de la habitación */}
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div className="d-flex form-label texto-mario">Imagen de la Habitación</div>
                    <MDBInput
                      id="paquete-imagenHabitacion"
                      name="imagenHabitacion"
                      type="text"
                      value={formData.imagenHabitacion}
                      onChange={handleChange}
                      className="form-control-mario"
                    />
                  </MDBCol>
                </MDBRow>

                {/* Alimentación */}
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div className="d-flex form-label texto-mario">Alimentación</div>
                    <MDBInput
                      id="paquete-alimentacion"
                      name="alimentacion"
                      type="text"
                      value={formData.alimentacion}
                      onChange={handleChange}
                      className="form-control-mario"
                    />
                  </MDBCol>
                </MDBRow>

                {/* Actividades */}
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div className="d-flex form-label texto-mario">Actividades</div>
                    <MDBInput
                      id="paquete-actividades"
                      name="actividades"
                      type="text"
                      value={formData.actividades}
                      onChange={handleChange}
                      className="form-control-mario"
                    />
                  </MDBCol>
                </MDBRow>

                {/* Adicionales */}
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div className="d-flex form-label texto-mario">Adicionales</div>
                    <MDBInput
                      id="paquete-adicionales"
                      name="adicionales"
                      type="text"
                      value={formData.adicionales}
                      onChange={handleChange}
                      className="form-control-mario"
                    />
                  </MDBCol>
                </MDBRow>

                <div className="justify-content-center text-center pt-1 mb-5 pb-1 w-100">
                  <Button
                    className="mb-4 w-50 btn-mario"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                  >
                    Crear Paquete
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </MDBCol>

        {/* Columna derecha: Imagen y texto de bienvenida */}
        <MDBCol lg="6" md="12" className="text-center d-none d-md-block">
          <img
            src="https://res.cloudinary.com/dss2hdisa/image/upload/hero-m-l_helypc.png"
            alt="hotel"
            className="img-fluid"
            width="75%"
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Crearpaquete;
