import React, { useState, useEffect } from 'react';
import { Nav, Card, Button } from 'react-bootstrap';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import './Recuperarkey.css';
import alertify from 'alertifyjs';

const Recuperarkey = () => {
  // Estado para manejar los datos del formulario y los errores
  const [formData, setFormData] = useState({
    email: ''
  });
  const [errors, setErrors] = useState({
    email: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Validación del correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Por favor, ingresa un correo electrónico válido.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: '' }));
    return true;
  };

  // Verifica si el formulario es válido
  const checkFormValidity = () => {
    const isValid = Object.values(errors).every((error) => error === '') &&
                    Object.values(formData).every((field) => field !== '');
    setIsFormValid(isValid);
  };

  // Manejador para actualizar los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validación cuando el campo pierde el foco
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email') validateEmail(value);
  };

  // Verificar validez del formulario cuando cambian los datos o los errores
  useEffect(() => {
    checkFormValidity();
  }, [formData, errors]);

  // Enviar el formulario
  const handleSubmit = () => {
    if (isFormValid) {
      alertify.success('¡Correo enviado correctamente! Por favor revisa tu bandeja de entrada.');
      setFormData({ email: '' });
    } else {
      alertify.error('Por favor, corrige los errores antes de continuar.');
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBRow className="d-flex align-items-center justify-content-center">
        {/* Columna izquierda: Formulario de Recuperación de Contraseña */}
        <MDBCol lg="6" md="12" className="mb-4">
          <Card className="shadow-lg card-style border-black">
            <Card.Header className="bg-black text-white text-center">
              <h4 className="textocolor">Recupera tu contraseña</h4>
            </Card.Header>
            <Card.Body className="Hotel_Body">
              <div className="card-container">
                {/* Fila para el correo */}
                <MDBRow className="mb-4">
                  <MDBCol md="4">
                    <label htmlFor="recover-email" className="form-label texto-mario">Correo</label>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBInput
                      id="recover-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      className="form-control-mario"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                  </MDBCol>
                </MDBRow>

                <div className="text-center pt-1 mb-5 pb-1">
                  {/* Botón para recuperar la contraseña */}
                  <Button
                    className="mb-4 w-100 btn-mario"
                    onClick={handleSubmit}
                    disabled={!isFormValid} // Botón deshabilitado si el formulario no es válido
                  >
                    Recuperar contraseña
                  </Button>
                  <div className="mt-3">
                    <span className="texto-mario">¿Recuperaste tu contraseña? </span>
                    <Nav.Link href="/registrate" className="texto-mario">Inicia sesión aquí</Nav.Link>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </MDBCol>

        {/* Columna derecha: Imagen y texto de bienvenida */}
        <MDBCol lg="6" md="12" className="text-center d-none d-md-block">
          <img
            src="https://raw.githubusercontent.com/CunGemcrak/PI-Videogames-main/main/videogame.png"
            style={{ width: '300px', borderRadius: '10%' }}
            alt="Mario Kart Logo"
          />
          <h4 className="mt-2 mb-2 pb-1">¡Recupera tu acceso al Hotel Champiñón!</h4>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Recuperarkey;
