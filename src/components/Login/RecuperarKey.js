import React from 'react';
import { Nav, Card } from 'react-bootstrap';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import './Recuperarkey.css';

const Recuperarkey = () => {
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
                      type="email"
                      className="form-control-mario"
                    />
                  </MDBCol>
                </MDBRow>

                <div className="text-center pt-1 mb-5 pb-1">
                  {/* Botón para recuperar la contraseña */}
                  <MDBBtn className="mb-4 w-100 btn-mario">Recuperar contraseña</MDBBtn>
                  <div className="mt-3">
                    <span className="texto-mario">¿Recuperaste tu contraseña? </span>
                    <Nav.Link href="/registrate" className="texto-mario">Inicia sesión aquí</Nav.Link>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </MDBCol>

        {/* Columna derecha: Imagen y texto de bienvenida (solo visible en pantallas medianas y grandes) */}
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
