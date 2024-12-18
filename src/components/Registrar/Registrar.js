import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { MDBCol } from 'mdb-react-ui-kit';
import './Registrar.css';
import { paquetes } from '../../bd'; // Asegúrate de agregar este archivo CSS para los estilos personalizados

import alertify from 'alertifyjs';
import { useDispatch } from 'react-redux';

import { reservaHotel } from '../../Redux/actions'; 


const RegistrarHotelForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    documento: '',
    tipoDocumento: '',
    nombres: '', // Fusionamos Primer Nombre y Segundo Nombre en un solo campo
    papellido: '',
    sapellido: '',
    celular: '',
    email: '',
    paquete: '',
    numPersonas: 1, // Número de personas, con valor predeterminado de 1
    precioTotal: 0, // Valor total del paquete
    descuento: 0, // Descuento aplicado
  });
 

  const [errors, setErrors] = useState({
    documento: '',
    tipoDocumento: '',
    nombres: '', // Fusionamos Primer Nombre y Segundo Nombre en un solo campo
    papellido: '',
    sapellido: '',
    celular: '',
    email: '',
    paquete: ''
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

    





  // Efecto para calcular el precio total y el descuento
  useEffect(() => {
    if (formData.paquete) {
      const paqueteSeleccionado = paquetes.find(paquete => paquete.value === formData.paquete);

      if (paqueteSeleccionado) {
        let precioTotal = paqueteSeleccionado.precio;

        // Si el paquete es por persona, multiplicamos el precio por el número de personas
        if (paqueteSeleccionado.tipoPrecio === 'individual') {
          precioTotal *= formData.numPersonas;
        }

        // Para el paquete familiar, no se multiplica por el número de personas
        if (paqueteSeleccionado.tipoPrecio === 'familiar') {
          precioTotal = paqueteSeleccionado.precio; // Mantiene el precio fijo para todo el grupo
        }

        let descuento = 0;
        // Descuento del 15% si el número de personas es mayor o igual a 4
        if (formData.numPersonas >= 4) {
          descuento = 0.15; // 15% de descuento
          precioTotal *= (1 - descuento); // Aplicamos el descuento
        }

        setFormData({
          ...formData,
          precioTotal,
          descuento,
        });
      }
    }
  }, [formData.numPersonas, formData.paquete, formData, paquetes]);



    // Comprobamos si todos los campos son válidos
    const checkFormValidity = () => {
      
      const isValid = Object.values(errors).every((error) => error === '') &&
                      Object.values(formData).every((field) => field !== '');
                      //alert(isValid)
      setIsFormValid(isValid);
    };







    // Usamos useEffect para verificar la validez del formulario
    useEffect(() => {
      checkFormValidity();
    }, [errors, formData]);




      // Actualizamos el estado cuando el usuario interactúa con los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
  const validarCampoTexto = (id, valor) => {
    if (!valor || valor.trim() === '') { // Verifica si el campo está vacío
      setErrors((prev) => ({ ...prev, [id]: 'Este campo no puede estar vacío.' }));
      return false;
    }
    if (valor.length < 3) { // Verifica si el texto tiene menos de 3 caracteres
      setErrors((prev) => ({ ...prev, [id]: 'Este campo debe tener al menos 3 caracteres.' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, [id]: '' })); // Limpiamos el error si la validación es correcta
    return true;
  };

  const validarCelular = (valor) => {
    if (!valor || valor.trim() === '') {
      setErrors((prev) => ({ ...prev, celular: 'El campo celular no puede estar vacío.' }));
      return false;
    }
    
    // Verifica si contiene solo números
    const regex = /^[0-9]+$/;
    if (!regex.test(valor)) {
      setErrors((prev) => ({ ...prev, celular: 'El celular debe contener solo números.' }));
      return false;
    }
  
    // Verifica si tiene al menos 10 caracteres
    if (valor.length < 10) {
      setErrors((prev) => ({ ...prev, celular: 'El celular debe tener al menos 10 dígitos.' }));
      return false;
    }
  
    setErrors((prev) => ({ ...prev, celular: '' })); // Limpiamos el error si la validación es correcta
    return true;
  };

  const validarSelecciondePaquete = (valor) => {
    if (!valor || valor === 'Seleccione') { // Si el valor está vacío o es "Seleccione"
      setErrors((prev) => ({ ...prev, paquete: 'Por favor seleccione un paquete.' }));
      return false;
    }
  
    // Si tienes un conjunto de paquetes válidos, puedes validar si el valor está dentro de las opciones
    
  
    setErrors((prev) => ({ ...prev, paquete: '' })); // Limpiamos el error si la validación es correcta
    return true;
  };
  const handleSubmit = () => {
    if (isFormValid) {
      // Aquí agregarías la lógica para iniciar sesión, por ejemplo, llamando a una API o acción de Redux
      
      // Dispatch de login si usas Redux
      // dispatch(login_user(formData));

      dispatch(reservaHotel(formData))


      setFormData({  
        documento: '',
        tipoDocumento: '',
        nombres: '', // Fusionamos Primer Nombre y Segundo Nombre en un solo campo
        papellido: '',
        sapellido: '',
        celular: '',
        email: '',
        paquete: '',
        numPersonas: 1, // Número de personas, con valor predeterminado de 1
        precioTotal: 0, // Valor total del paquete
        descuento: 0, // Descuento aplicado
        });

      setErrors({ 
        documento: '',
        tipoDocumento: '',
        nombres: '', // Fusionamos Primer Nombre y Segundo Nombre en un solo campo
        papellido: '',
        sapellido: '',
        celular: '',
        email: '',
        paquete: ''
         });
         alert('¡Inicio de sesión exitoso!');
         alertify.success('¡Bienvenido al Hotel Champiñón!');

    } else {
      alert('Por favor, corrige los errores antes de continuar.');
      alertify.error('Por favor, corrige los errores antes de continuar.');
    }
  };

  
  

    // Validamos el campo cuando el usuario interactúa
    const handleBlur = (e) => {
      const { id, value } = e.target;
      if (id === 'email') validateEmail(value);
      if (id === 'documento')  validarDocumento(value);
      if (id === 'tipoDocumento') validarTipoDocumento(value);
      if (id === 'nombres') validarCampoTexto(id, value);
      if (id === 'papellido') validarCampoTexto(id, value);
      if (id === 'sapellido') validarCampoTexto(id, value);
      if(id === 'celular') validarCelular(value);
      if (id === 'paquete') validarSelecciondePaquete(value);
    };


  return (
    <Container className="my-4">
      <Card className="shadow-lg card-style">
        <Card.Header className="bg-black text-white text-center">
          <h4 className='textoformulario'>¡Bienvenido al Hotel Champiñón!</h4>
        </Card.Header>
        <Card.Body className="Hotel_Body">
          <Row className="mb-3">
            <MDBCol col="12" className="text-center mb-4">
              <img
                src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg" // Aquí coloca la imagen de Mario Kart
                style={{ width: '30%', borderRadius: '20%' }}
                alt="Mario Kart"
              />
              <h4 className="mt-2 mb-2 pb-1 text-primary">Formulario de Registro</h4>
            </MDBCol>
          </Row>

          <Form>
            {/* Número de Documento */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Número DNI/CC/PASAPORTE</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su número de documento"
                  id="documento"
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  onBlur = {handleBlur}
                //  isInvalid={!!errors.documento}
                  required
                  className="form-control-mario"
                />
                {errors.documento && <p className="text-danger">{errors.documento}</p>}
              </Col>
            </Row>

            {/* Tipo de Documento */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Tipo de Documento Usuario</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  id="tipoDocumento"
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                 
                  required
                  className="form-control-mario"
                >
                  <option value="">Seleccione</option>
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Cedula">Cédula</option>
                </Form.Control>
                {errors.tipoDocumento && <p className="text-danger">{errors.tipoDocumento}</p>}
              </Col>
            </Row>

            {/* Nombres (Fusionando Primer y Segundo Nombre) */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Nombres</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre completo"
                  id="nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  onBlur={handleBlur}
                 
                  required
                  className="form-control-mario"
                />
                {errors.nombres && <p className="text-danger">{errors.nombres}</p>}
              </Col>
            </Row>

            {/* Apellidos */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Primer Apellido</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su primer apellido"
                  name="papellido"
                  value={formData.papellido}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="form-control-mario"
                />
                {errors.papellido && <p className="text-danger">{errors.papellido}</p>}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Segundo Apellido</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su segundo apellido"
                  name="sapellido"
                  value={formData.sapellido}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="form-control-mario"
                />
                {errors.sapellido && <p className="text-danger">{errors.sapellido}</p>}
              </Col>
            </Row>

            {/* Número de Celular */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Número de Celular</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="tel"
                  placeholder="Ingrese su número de celular"
                  id='celular'
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="form-control-mario"
                />
                {errors.celular && <p className="text-danger">{errors.celular}</p>}
              </Col>
            </Row>

            {/* Correo Electrónico */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Correo Electrónico</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  id='email'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  
                  required
                  className="form-control-mario"
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </Col>
            </Row>

            {/* Selección de paquete */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label>Seleccione Paquete</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  id='paquete'
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
                    onBlur={handleBlur}
                    min="1"
                    required
                    className="form-control-mario"
                  />
                </Col>
              </Row>
            )}

            {/* Mostrar total y descuento */}
            {formData.precioTotal > 0 && (
              <Row>
                <Col sm={4}>
                  <Form.Label>Total a Pagar</Form.Label>
                </Col>
                <Col sm={8}>
                  <p><strong>${formData.precioTotal.toFixed(2)}</strong></p>
                  {formData.descuento > 0 && (
                    <p className="text-success">¡Descuento del 15% aplicado!</p>
                  )}
                </Col>
              </Row>
            )}

            {/* Botón de Enviar */}
            <Button variant="primary"
            type="submit" 
            className="w-100 mt-4"
            onClick={handleSubmit}
            disabled={!isFormValid}>
              Enviar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegistrarHotelForm;