import React, { useState, useEffect } from 'react';
//import { Button, Card, Nav } from 'react-bootstrap';
import { Form, Button, Card, Nav } from 'react-bootstrap';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import './RegistrarUsuario.css'; // Asegúrate de tener los estilos personalizados para Mario Bros.
import alertify from 'alertifyjs';

import { register_user } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Registrate = () => {
  // Establecemos los estados para los campos y los mensajes de error
  const dispach = useDispatch()
  const navigate = useNavigate()
  const CREARUSER = useSelector((state)=>state.CREATEUSER)
  const [formData, setFormData] = useState({
    nombre: '',
    papellido:'',
    sapellido:'',
    email: '',
    password: '',
    confirmPassword: '',
    celular:'',
    tipoDocumento:'',
    ndocumento:'',
  });
  const [errors, setErrors] = useState({
    nombre: '',
    papellido:'',
    sapellido:'',
    email: '',
    password: '',
    confirmPassword: '',
    celular:'',
    tipoDocumento:'',
    ndocumento:'',
  });
  
  const [isFormValid, setIsFormValid] = useState(false);

  // Validación de nombre (mínimo 3 caracteres)
  const validateName = (name) => {
    if (name.length < 3) {
      setErrors((prev) => ({ ...prev, nombre: 'El nombre debe tener al menos 3 caracteres.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, nombre: '' }));
    return true;
  };

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

  // Validación de contraseña (debe tener mayúscula, minúscula, número y caracter especial)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prev) => ({ ...prev, password: 'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: '' }));
    return true;
  };

  // Validación de confirmación de contraseña
  const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, confirmPassword: '' }));
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
   /* const { name, value } = e.target;
    alert('entro'+name)
    alert('entro'+value)
    setFormData((prev) => ({ ...prev, name: value }));*/
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

   
  };

  const validarCelular = (valor) => {
    if (!valor || valor.trim() === '') {
      setErrors((prev) => ({ ...prev, celular: 'El campo celular no puede estar vacío.' }));
      return false;
    }
  }
  const validarTipoDocumento = (tipoDocumento) => {
    // Verificamos que el tipo de documento no esté vacío y sea una de las opciones válidas
    const tiposValidos = ['DNI', 'Pasaporte', 'Cedula']; // Opciones válidas para tipo de documento
    if (!tipoDocumento) {
      setErrors((prev) => ({ ...prev, tipoDocumento: 'Por favor, selecciona un tipo de documento.' }));
      return false;
    }
    if (!tiposValidos.includes(tipoDocumento)) {
      setErrors((prev) => ({ ...prev, tipoDocumento: 'Tipo de documento no válido.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, tipoDocumento: '' }));
    return true;
  };



  
  const validarDocumento = (documento) =>{
    const isNumber = /^[0-9]+$/; 
    if (!documento || documento.length <= 5) {
      setErrors((prev) => ({ ...prev, documento: 'El documento debe tener más de 5 números.' }));
      return false;
    }
    if (!isNumber.test(documento)) {
      setErrors((prev) => ({ ...prev, documento: 'El documento debe contener solo números.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, documento: '' }));
    return true;
  }
  // Validamos el campo cuando el usuario interactúa
  const handleBlur = (e) => {
    const { id, value } = e.target;

    if (id === 'register-name') validateName(value);
    if (id === 'register-papellido') validateName(value);
    if (id === 'register-sapellido') validateName(value);
    if (id === 'register-email') validateEmail(value);
    if (id === 'register-password') validatePassword(value);
    if (id === 'register-confirm-password') validateConfirmPassword(value, formData.password);
    if ( id === 'celular') validarCelular(value);
      if(id === 'tipoDocumento') validarTipoDocumento(value);
      if(id === 'ndocumento') validarDocumento(value)
  };

  // Usamos useEffect para verificar la validez del formulario
  useEffect(() => {
    checkFormValidity();
  }, [errors, formData]);


  useEffect(()=>{
    if(CREARUSER){
      setFormData({
        nombre: '',
        papellido:'',
        sapellido:'',
        email: '',
        password: '',
        confirmPassword: ''
      });
       setErrors({
        nombre: '',
        papellido:'',
        sapellido:'',
        email: '',
        password: '',
        confirmPassword: ''
      });

      navigate('/registrate')
    }
  },[CREARUSER])
  // Función de registro
  const handleSubmit = () => {
  // alert("Error fatal")
    if (isFormValid) {
     
     
      dispach(register_user(formData))


    
      

     
    } else {
      alert('Por favor, corrige los errores antes de continuar.')
      alertify.error('Por favor, corrige los errores antes de continuar.');
    }
  };

  return (
    <MDBContainer className="my-5 ">
      <MDBRow className="d-flex align-items-center justify-content-center">
        {/* Columna izquierda: Formulario de Registro */}
        <MDBCol>
          <Card className="shadow-lg card-style border-black">
            <Card.Header className="bg-black text-white text-center">
              <h4 className="textocolor">¡Únete al Hotel Champiñón!</h4>
            </Card.Header>
            <Card.Body className="Hotel_Body">
              <div className="card-container">




              {/* Tipo de Documento */}
                <MDBRow className="mb-8 d-flex w-100">
              <MDBCol>
                <div className="d-flex form-label texto-mario">Tipo de Documento Usuario</div>
                <Form.Control
                  as="select"
                  id="tipoDocumento"
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control-mario"
                >
                  <option value="">Seleccione</option>
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Cedula">Cédula</option>
                </Form.Control>
                {errors.tipoDocumento && <p className="text-danger">{errors.tipoDocumento}</p>}
              </MDBCol>
            </MDBRow>




           {/* Número de Documento */}
             <MDBRow className="mb-8 d-flex w-100">
              <MDBCol>
                <div className="d-flex form-label texto-mario">Número DNI/CC/PASAPORTE</div>  
                <MDBInput
                  type="text"
                  placeholder="Ingrese su número de documento"
                  id="ndocumento"
                  name="ndocumento"
                  value={formData.ndocumento}
                  onChange={handleChange}
                  onBlur = {handleBlur}
                  className="form-control-mario"
                />
                {errors.ndocumento && <p className="text-danger">{errors.ndocumento}</p>}
              </MDBCol>
            </MDBRow>

           


                {/*Celular*/}

            
              <MDBRow className="mb-8 d-flex w-100">
                          <MDBCol>
                            <div className="d-flex form-label texto-mario">Celular</div>  
                            <MDBInput
                              type="text"
                              placeholder="Ingrese su número de documento"
                              id="celular"
                              name="celular"
                              value={formData.celular}
                              onChange={handleChange}
                              onBlur = {handleBlur}
                              className="form-control-mario"
                            />
                            {errors.celular && <p className="text-danger">{errors.celular}</p>}
                          </MDBCol>
                        </MDBRow>




                {/* Fila para los inputs */}
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div htmlFor="register-name" className="d-flex form-label texto-mario">Nombre completo</div>
                    <MDBInput
                      id="register-name"
                      name="nombre"
                      type="text"
                     value={formData.nombre}  // Vinculamos el estado aquí
                      className="form-control-mario"
                      onChange={handleChange}  // Actualizamos el estado cuando el campo cambia
                      onBlur={handleBlur}     // Ejecutamos la validación al perder el foco
                    />
                    {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
                  </MDBCol>
                </MDBRow>




                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div htmlFor="register-papellido" className="d-flex form-label texto-mario">Primer Apellido</div>
                    <MDBInput
                      id="register-papellido"
                      name="papellido"
                      type="text"
                     value={formData.papellido}  // Vinculamos el estado aquí
                      className="form-control-mario"
                      onChange={handleChange}  // Actualizamos el estado cuando el campo cambia
                      onBlur={handleBlur}     // Ejecutamos la validación al perder el foco
                    />
                    {errors.papellido && <p className="text-danger">{errors.papellido}</p>}
                  </MDBCol>
                </MDBRow>
              
              
              
              
              
                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <div htmlFor="register-sapellido" className="d-flex form-label texto-mario">Segundo Apellido</div>
                    <MDBInput
                      id="register-sapellido"
                      name="sapellido"
                      type="text"
                     value={formData.sapellido}  // Vinculamos el estado aquí
                      className="form-control-mario"
                      onChange={handleChange}  // Actualizamos el estado cuando el campo cambia
                      onBlur={handleBlur}     // Ejecutamos la validación al perder el foco
                    />
                    {errors.sapellido && <p className="text-danger">{errors.sapellido}</p>}
                  </MDBCol>
                </MDBRow>
                





                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <label htmlFor="register-email" className="form-label texto-mario d-flex ">Correo</label>
                    <MDBInput
                      id="register-email"
                      name='email'
                      type="email"
                      value={formData.email}  // Vinculamos el estado aquí
                      className="form-control-mario"
                      onChange={handleChange}  // Actualizamos el estado cuando el campo cambia
                      onBlur={handleBlur}     // Ejecutamos la validación al perder el foco
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <label htmlFor="register-password" className="form-label texto-mario d-flex ">Contraseña</label>
                    <MDBInput
                      id="register-password"
                      name='password'
                      type="password"
                      value={formData.password}  // Vinculamos el estado aquí
                      className="form-control-mario"
                      onChange={handleChange}  // Actualizamos el estado cuando el campo cambia
                      onBlur={handleBlur}     // Ejecutamos la validación al perder el foco
                    />
                    {errors.password && <p className="text-danger">{errors.password}</p>}
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-8 d-flex w-100">
                  <MDBCol>
                    <label htmlFor="register-confirm-password" className="form-label texto-mario d-flex ">Confirmar contraseña</label>
                    <MDBInput
                      id="register-confirm-password"
                      name='confirmPassword'
                      type="password"
                      value={formData.confirmPassword}  // Vinculamos el estado aquí
                      className="form-control-mario"
                      onChange={handleChange}  // Actualizamos el estado cuando el campo cambia
                      onBlur={handleBlur}     // Ejecutamos la validación al perder el foco
                    />
                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                  </MDBCol>
                </MDBRow>

                <div className="text-center pt-1 mb-5 pb-1">
                  {/* Botón de registro */}
                  <Button
                    className="mb-4 w-70 btn-mario-login"
                    onClick={handleSubmit}
                    disabled={!isFormValid}  // Botón deshabilitado si el formulario no es válido
                  >
                    Registrarse
                  </Button>
                  <div className="mt-3">
                    <span className="texto-mario">¿Ya tienes cuenta? </span>
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
            src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg"
            style={{ width: '80%', borderRadius: '10%' }}
            alt="Mario Kart Logo"
          />
          <h4 className="mt-2 mb-2 pb-1">¡Es momento de unirte al Hotel Champiñón!</h4>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Registrate;
