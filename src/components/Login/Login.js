import React, { useState, useEffect } from 'react';
import { Button, Card, Nav } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import './Login.css';
import alertify from 'alertifyjs';

import { useDispatch } from 'react-redux'; // Si usas Redux para manejar el estado de la sesión
import { logueoUser } from '../../Redux/actions';

const Login = () => {
  // Establecemos los estados para los campos y los mensajes de error
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  const [isFormValid, setIsFormValid] = useState(false);

  // Validación de correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Por favor, ingresa un correo electrónico válido.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: '' }));
    return true;
  };

  // Validación de contraseña
  const validatePassword = (password) => {
    if (password.length < 6) { // Validación básica para longitud mínima de la contraseña
      setErrors((prev) => ({ ...prev, password: 'La contraseña debe tener al menos 6 caracteres.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: '' }));
    return true;
  };

  // Comprobamos si todos los campos son válidos
  const checkFormValidity = () => {
    const isValid = Object.values(errors).every((error) => error === '') &&
                    Object.values(formData).every((field) => field !== '');
    setIsFormValid(isValid);
  };

  // Actualizamos el estado cuando el usuario interactúa con los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validamos el campo cuando el usuario interactúa
  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (id === 'login-email') validateEmail(value);
    if (id === 'login-password') validatePassword(value);
  };

  // Usamos useEffect para verificar la validez del formulario
  useEffect(() => {
    checkFormValidity();
  }, [errors, formData]);

  // Función para iniciar sesión
  const handleSubmit = () => {
    if (isFormValid) {
      // Aquí agregarías la lógica para iniciar sesión, por ejemplo, llamando a una API o acción de Redux
      alert('¡Inicio de sesión exitoso!');
      alertify.success('¡Bienvenido al Hotel Champiñón!');
      // Dispatch de login si usas Redux
      // dispatch(login_user(formData));

      dispatch(logueoUser(formData))


      setFormData({ email: '', password: '' });
      setErrors({ email: '', password: '' });
    } else {
      alert('Por favor, corrige los errores antes de continuar.');
      alertify.error('Por favor, corrige los errores antes de continuar.');
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBRow className=" align-items-center justify-content-center">
        {/* Columna izquierda: Formulario de Login */}
        <MDBCol>
          <Card className="shadow-lg card-style border-black">
            <Card.Header className="bg-black text-white text-center">
              <h4 className="textocolor">¡Inicia sesión en el Reino Champiñón!</h4>
            </Card.Header>
            <Card.Body className="Hotel_Body">
              <div className="card-container">
                {/* Fila para los inputs */}
                <MDBRow className="mb-4 w-100">
                  <MDBCol>
                    <div htmlFor="login-email" className="d-flex form-label texto-mario">Correo Electrónico</div>
                    <MDBInput
                      id="login-email"
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

                <MDBRow className="mb-4 w-100">
                  <MDBCol>
                    <div htmlFor="login-password" className="d-flex form-label texto-mario w-100">Contraseña</div>
                    <MDBInput
                      id="login-password"
                      name="password"
                      type="password"
                      value={formData.password}
                      className="form-control-mario"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && <p className="text-danger">{errors.password}</p>}
                  </MDBCol>
                </MDBRow>

                <div className="text-center pt-1 mb-5 pb-1">
                  <Button
                    className="mb-4 w-100 btn-mario"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                  >
                    Iniciar sesión
                  </Button>

                  <div className="mt-3">
                    <Nav.Link href="/rkey" className="texto-mario">¿Olvidaste tu contraseña?</Nav.Link>
                  </div>

                  <div className="mt-3">
                    <span className="texto-mario">¿No tienes cuenta? </span>
                    <Nav.Link href="/reistronuevousuario" className="texto-mario">Regístrate aquí</Nav.Link>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </MDBCol>

        {/* Columna derecha: Imagen y texto de bienvenida */}
        <MDBCol lg="6" md="12" className="text-center d-none d-md-block">
          <img
            src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg"
            style={{ width: '80%', borderRadius: '10%' }}
            alt="Reino Champiñón"
          />
          <h4 className="mt-2 mb-2 pb-1">¡Bienvenido al Hotel Champiñón!</h4>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
