import React from 'react';
import { Card, Nav } from 'react-bootstrap';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import './RegistrarUsuario.css'; // Asegúrate de tener los estilos personalizados para Mario Bros.

const Registrate = () => {
  return (
    <MDBContainer className="my-5">
      <MDBRow className="d-flex align-items-center justify-content-center">
        {/* Columna izquierda: Formulario de Registro */}
        <MDBCol lg="6" md="12" className="mb-4">
          <Card className="shadow-lg card-style border-black">
            <Card.Header className="bg-black text-white text-center">
              <h4 className="textocolor">¡Únete al Hotel Champiñón!</h4>
            </Card.Header>
            <Card.Body className="Hotel_Body">
              <div className="card-container">
                {/* Fila para los inputs */}
                <MDBRow className="mb-4">
                  <MDBCol md="4">
                    <label htmlFor="register-name" className="form-label texto-mario">Nombre completo</label>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBInput
                      id="register-name"
                      type="text"
                      className="form-control-mario"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol md="4">
                    <label htmlFor="register-email" className="form-label texto-mario">Correo</label>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBInput
                      id="register-email"
                      type="email"
                      className="form-control-mario"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol md="4">
                    <label htmlFor="register-password" className="form-label texto-mario">Contraseña</label>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBInput
                      id="register-password"
                      type="password"
                      className="form-control-mario"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-4">
                  <MDBCol md="4">
                    <label htmlFor="register-confirm-password" className="form-label texto-mario">Confirmar contraseña</label>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBInput
                      id="register-confirm-password"
                      type="password"
                      className="form-control-mario"
                    />
                  </MDBCol>
                </MDBRow>

                <div className="text-center pt-1 mb-5 pb-1">
                  {/* Botón de registro */}
                  <MDBBtn className="mb-4 w-100 btn-mario">Registrarse</MDBBtn>
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
