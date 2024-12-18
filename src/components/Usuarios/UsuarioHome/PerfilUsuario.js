import React, { useState } from 'react';
import { Button, Card, Nav } from 'react-bootstrap';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import alertify from 'alertifyjs';
import { usuarios } from '../../../bdUsuarios';

const PerfilUsuario = () => {
  const [userData, setUserData] = useState(usuarios[0]); // Cargamos el primer usuario como ejemplo
  const [isEditing, setIsEditing] = useState(false); // Controla si estamos en modo de edición
  const [formData, setFormData] = useState({ ...userData }); // Estado local para edición

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja el botón de actualizar
  const handleUpdate = () => {
    setIsEditing(true);
  };

  // Maneja el botón de cancelar
  const handleCancel = () => {
    setFormData({ ...userData }); // Revertimos a los datos originales
    setIsEditing(false);
  };

  // Maneja el botón de guardar
  const handleSave = () => {
    setUserData({ ...formData }); // Guardamos los cambios
    setIsEditing(false);
    alertify.success('Datos actualizados correctamente.');
  };

  return (
    <MDBContainer className="my-5">
      <MDBRow className="d-flex align-items-center justify-content-center">
        <MDBCol>
          <Card className="shadow-lg card-style border-black">
            <Card.Header className="bg-black text-white text-center">
              <h4>Perfil de Usuario</h4>
            </Card.Header>
            <Card.Body>
              <MDBRow className="mb-4 d-flex align-items-center">
                <MDBCol md="4" className="text-center">
                  <img
                    src={userData.imagen}
                    alt="Perfil del usuario"
                    style={{ width: '150px', borderRadius: '10%' }}
                  />
                  {isEditing && (
                    <Button
                      className="mt-3 btn-mario"
                      onClick={() => alertify.alert('Funcionalidad no implementada')}
                    >
                      Cambiar Imagen
                    </Button>
                  )}
                </MDBCol>
                <MDBCol md="8">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <MDBInput
                      name="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Primer Apellido</label>
                    <MDBInput
                      name="papellido"
                      type="text"
                      value={formData.papellido}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Segundo Apellido</label>
                    <MDBInput
                      name="sapellido"
                      type="text"
                      value={formData.sapellido}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <MDBInput
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Celular</label>
                    <MDBInput
                      name="celular"
                      type="text"
                      value={formData.celular}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <MDBInput
                      name="role"
                      type="text"
                      value={
                        formData.role === '1'
                          ? 'Administrador'
                          : formData.role === '2'
                          ? 'Usuario Regular'
                          : 'Invitado'
                      }
                      disabled
                    />
                  </div>
                  <div className="text-center">
                    {!isEditing ? (
                      <Button className="btn-mario" onClick={handleUpdate}>
                        Actualizar
                      </Button>
                    ) : (
                      <>
                        <Button className="btn-success " onClick={handleSave}>
                          Guardar
                        </Button>
                        <Button className="btn-danger m-2" onClick={handleCancel}>
                          Cancelar
                        </Button>
                      </>
                    )}
                  </div>
                </MDBCol>
              </MDBRow>
            </Card.Body>
          </Card>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default PerfilUsuario;
