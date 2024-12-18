import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import {
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdb-react-ui-kit';
import alertify from 'alertifyjs';
import './AgregarUsuarioReserva.css';

const AgregarUsuarioReserva = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    papellido: '',
    sapellido: '',
    identificacion: '',
  });

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  // Agrega un nuevo usuario al listado
  const handleAddUser = () => {
    if (
      nuevoUsuario.nombre &&
      nuevoUsuario.papellido &&
      nuevoUsuario.sapellido &&
      nuevoUsuario.identificacion
    ) {
      setUsuarios([...usuarios, { ...nuevoUsuario }]);
      setNuevoUsuario({
        nombre: '',
        papellido: '',
        sapellido: '',
        identificacion: '',
      });
      alertify.success('Usuario agregado correctamente.');
    } else {
      alertify.error('Por favor complete todos los campos.');
    }
  };

  return (
    <Card className="shadow-lg card-style border-black">
      <Card.Header className="bg-black text-white text-center">
        <h5>Agregar Usuario</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          {/* Sección izquierda: Formulario */}
          <Col xs={12} md={6}>
            <div className="mb-3">
              <label className="form-label naranja alineartexto" htmlFor="nombre">
                Nombres
              </label>
              <MDBInput
                id="nombre"
                name="nombre"
                type="text"
                value={nuevoUsuario.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label naranja alineartexto" htmlFor="papellido">
                Primer Apellido
              </label>
              <MDBInput
                id="papellido"
                name="papellido"
                type="text"
                value={nuevoUsuario.papellido}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label naranja alineartexto" htmlFor="sapellido">
                Segundo Apellido
              </label>
              <MDBInput
                id="sapellido"
                name="sapellido"
                type="text"
                value={nuevoUsuario.sapellido}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label naranja alineartexto " htmlFor="identificacion">
                Identificación
              </label>
              <MDBInput
                id="identificacion"
                name="identificacion"
                type="text"
                value={nuevoUsuario.identificacion}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <Button className="btn-mario" onClick={handleAddUser}>
                Agregar Usuario
              </Button>
            </div>
          </Col>

          {/* Sección derecha: Imagen de Mario Constructor */}
        
          <Col md={6} className="d-none d-md-block text-center justify-content-center align-items-center " >
            <img
              src="https://res.cloudinary.com/dss2hdisa/image/upload/games-where-you-can-play-princess-peach_brk3uo.avif"
              alt="Mario Constructor"
              className="img-fluid"
              style={{ maxWidth: '300px' }}
            />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <h6>Listado de Usuarios</h6>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>#</th>
              <th>Nombre Completo</th>
              <th>Identificación</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {usuario.nombre} {usuario.papellido} {usuario.sapellido}
                </td>
                <td>{usuario.identificacion}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </Card.Footer>
    </Card>
  );
};

export default AgregarUsuarioReserva;
