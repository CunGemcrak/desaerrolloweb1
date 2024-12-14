import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { MDBCol } from 'mdb-react-ui-kit';
import './Registrar.css'; // Asegúrate de agregar este archivo CSS para los estilos personalizados

const RegistrarHotelForm = () => {
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

  const paquetes = [
 
    {
      nombre: 'Paquete Aventura Mario Kart',
      descripcion: 'Vive una experiencia emocionante con tours guiados y carreras de karts.',
      precio: 700, // Precio por persona
      value: 'paqueteAventura',
      tipoPrecio: 'individual', // Precio por persona
    },
    {
      nombre: 'Paquete Lujo Champiñón',
      descripcion: 'Relájate en nuestras suites temáticas con todas las comodidades.',
      precio: 1000, // Precio por persona
      value: 'paqueteLujo',
      tipoPrecio: 'individual', // Precio por persona
    },
    {
      nombre: 'Paquete Relax en el Spa',
      descripcion: 'Disfruta de un día completo de relajación en nuestro exclusivo spa con masajes y acceso a todas las instalaciones.',
      precio: 350, // Precio por persona
      value: 'paqueteRelaxSpa',
      tipoPrecio: 'individual', // Precio por persona
    },
    {
      nombre: 'Paquete Aventura en la Naturaleza',
      descripcion: 'Embárcate en una aventura de senderismo, pesca y campamento en las montañas cercanas.',
      precio: 600, // Precio por persona
      value: 'paqueteAventuraNaturaleza',
      tipoPrecio: 'individual', // Precio por persona
    },
   
    {
      nombre: 'Paquete Kids Club',
      descripcion: 'Diversión asegurada para los más pequeños, con actividades diarias, talleres y acceso exclusivo a la zona de juegos.',
      precio: 400, // Precio por niño
      value: 'paqueteKidsClub',
      tipoPrecio: 'individual', // Precio por niño
    },
    {
      nombre: 'Paquete VIP Executive',
      descripcion: 'Una experiencia exclusiva con acceso a nuestras suites VIP, transporte privado y cenas gourmet.',
      precio: 2000, // Precio por persona
      value: 'paqueteVIPExecutive',
      tipoPrecio: 'individual', // Precio por persona
    },
    {
      nombre: 'Paquete Fin de Semana Gastronómico',
      descripcion: 'Un fin de semana dedicado a los amantes de la gastronomía con clases de cocina y cenas temáticas.',
      precio: 800, // Precio por persona
      value: 'paqueteGastronomico',
      tipoPrecio: 'individual', // Precio por persona
    }
  ];
  

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
  }, [formData.numPersonas, formData.paquete]); // Aseguramos que se actualice cuando el paquete o número de personas cambien

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario al backend para guardar la información
    console.log(formData);
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

          <Form onSubmit={handleSubmit}>
            {/* Número de Documento */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Número DNI/CC/PASAPORTE</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su número de documento"
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  required
                  className="form-control-mario"
                />
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
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  required
                  className="form-control-mario"
                >
                  <option value="">Seleccione</option>
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Cedula">Cédula</option>
                </Form.Control>
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
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                  className="form-control-mario"
                />
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
                  required
                  className="form-control-mario"
                />
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
                  required
                  className="form-control-mario"
                />
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
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                  className="form-control-mario"
                />
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control-mario"
                />
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
                  name="paquete"
                  value={formData.paquete}
                  onChange={handleChange}
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
            <Button variant="primary" type="submit" className="w-100 mt-4">
              Enviar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegistrarHotelForm;
