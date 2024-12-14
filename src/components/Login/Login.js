import React from 'react';
import { Form, Button, Container, Card, Row, Col, Nav } from 'react-bootstrap';

import './Login.css';

const Login = () => {
  return (
    <Container className="my-5">
      <Row className="d-flex align-items-center">
        {/* Columna izquierda: Formulario de Login */}
        <Col lg="6" md="12" className="mb-4">
          <Card className="shadow-lg card-style border-black">
            <Card.Header className="bg-black text-white text-center">
              <h4 className="textocolor">¡Inicia sesión en el Reino Champiñón!</h4>
            </Card.Header>
            <Card.Body className="Hotel_Body">
              <Form>
                {/* Correo Electrónico */}
                <Row className="mb-3">
                  <Col sm={4}>
                    <Form.Label className="text-start">Correo Electrónico</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Control
                      type="email"
                      placeholder="Ingrese su correo electrónico"
                      required
                      className="form-control-mario" // Estilo personalizado
                    />
                  </Col>
                </Row>

                {/* Contraseña */}
                <Row className="mb-3">
                  <Col sm={4}>
                    <Form.Label className="text-start">Contraseña</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Control
                      type="password"
                      placeholder="Ingrese su contraseña"
                      required
                      className="form-control-mario" // Estilo personalizado
                    />
                  </Col>
                </Row>

                {/* Botón de Iniciar Sesión */}
                <Button variant="primary" type="submit" className="w-100 mt-4 btn-mario">
                  Iniciar sesión
                </Button>

                {/* Enlaces para olvidó la contraseña y registro */}
                <div className="text-center mt-4">
                  <Nav.Link href="/rkey">¿Olvidaste tu contraseña?</Nav.Link>
                </div>

                <div className="text-center mt-3">
                  <span>¿No tienes cuenta? </span>
                  <Nav.Link href="/reistronuevousuario" className="text-primary">
                    Regístrate aquí
                  </Nav.Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Columna derecha: Imagen y texto de bienvenida */}
        <Col lg="6" md="12" className="text-center d-none d-md-block">
          <img
            src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg"
            style={{ width: '80%', borderRadius: '10%' }}
            alt="Reino Champiñón"
          />
          <h4 className="mt-2 mb-2 pb-1">¡Bienvenido al Hotel Champiñón!</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
