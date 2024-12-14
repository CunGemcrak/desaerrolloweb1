import React, { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { MDBCol } from 'mdb-react-ui-kit';
import './Contactanos.css'; // Asegúrate de agregar este archivo CSS para los estilos personalizados

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario al backend para guardar la información o enviarla por email
    console.log(formData);
  };

  return (
    <Container className="my-4">
      <Card className="shadow-lg card-style border-black">
        <Card.Header className="bg-black text-white text-center">
          <h4 className="textocolor">¡Contáctanos en el Reino Champiñón!</h4>
        </Card.Header>
        <Card.Body className="Hotel_Body">
          <Row className="mb-3">
            <MDBCol col="12" className="text-center mb-4">
              <img
                 src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg"   // Sustituir con una imagen relacionada con la temática
                style={{ width: '30%', borderRadius: '10%', margin: '10px' }}
                alt="Reino Champiñón"
              />
              <br />
              <h4 className="mt-2 mb-2 pb-1 text-primary">Déjanos tu mensaje</h4>
            </MDBCol>
          </Row>

          <Form onSubmit={handleSubmit}>
            {/* Nombre */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Nombre Completo</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="nombre"
                  value={formData.nombre}
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

            {/* Teléfono */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Número de Teléfono</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="tel"
                  placeholder="Ingrese su número de teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="form-control-mario"
                />
              </Col>
            </Row>

            {/* Mensaje */}
            <Row className="mb-3">
              <Col sm={4}>
                <Form.Label className="text-start">Mensaje</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Escribe tu mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  className="form-control-mario"
                />
              </Col>
            </Row>

            {/* Botón de Enviar */}
            <Button variant="primary" type="submit" className="w-100 mt-4">
              Enviar Mensaje
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Contactanos;
