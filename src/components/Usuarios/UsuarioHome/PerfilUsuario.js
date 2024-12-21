import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap'; // Importar "Form"
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import alertify from 'alertifyjs';
import { useDispatch, useSelector } from 'react-redux';

import { UserActualizar } from '../../../Redux/actions';

const PerfilUsuario = () => {
  const dispatch = useDispatch();
  const USUARIO = useSelector((state) => state.LOGINUSER);
  const USER = useSelector((state) => state.USER);

  const [userData, setUserData] = useState({
    cont: '',
    tdocumento: '',
    idusuario: '',
    imagen: '',
    nombre: '',
    papellido: '',
    sapellido: '',
    celular: '',
    email: '',
    passwords: '',
    role: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  useEffect(() => {
    if (USER && USUARIO.role_id > 0) {
      const updatedData = {
        cont: USUARIO.cont,
        tdocumento: USUARIO.tdocumento,
        idusuario: USUARIO.idusuario,
        imagen: USUARIO.imagen,
        nombre: USUARIO.nombre,
        papellido: USUARIO.papellido,
        sapellido: USUARIO.sapellido,
        celular: USUARIO.celular,
        email: USUARIO.email,
        passwords: USUARIO.passwords,
        role_id: USUARIO.role_id,
      };
      setUserData(updatedData);
      setFormData(updatedData);
    }
  }, [USER, USUARIO]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  const handleSave = () => {
    dispatch(UserActualizar(formData));
    setUserData({ ...formData });
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
                  {/* Tipo de Documento */}
                  <MDBRow className="mb-3">
                    <MDBCol>
                      <label className="d-flex form-label texto-mario">Tipo de Documento Usuario</label>
                      <Form.Control
                        as="select"
                        id="tdocumento"
                        name="tdocumento"
                        value={formData.tdocumento}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="form-control-mario"
                      >
                        <option value="">Seleccione</option>
                        <option value="DNI">DNI</option>
                        <option value="Pasaporte">Pasaporte</option>
                        <option value="Cedula">Cédula</option>
                      </Form.Control>
                    </MDBCol>
                  </MDBRow>
                  {/* Campos dinámicos */}
                  {[
                    { label: 'Número Documento', name: 'idusuario', type: 'text' },
                    { label: 'Nombre', name: 'nombre', type: 'text' },
                    { label: 'Primer Apellido', name: 'papellido', type: 'text' },
                    { label: 'Segundo Apellido', name: 'sapellido', type: 'text' },
                    { label: 'Correo Electrónico', name: 'email', type: 'email' },
                    { label: 'Celular', name: 'celular', type: 'text' },
                  ].map(({ label, name, type }) => (
                    <MDBRow className="mb-3" key={name}>
                      <MDBCol>
                        <label className="d-flex form-label texto-mario">{label}</label>
                        <Form.Control
                          type={type}
                          id={name}
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="form-control-mario"
                        />
                      </MDBCol>
                    </MDBRow>
                  ))}
                  {/* Rol */}
                  <MDBRow className="mb-3">
                    <MDBCol>
                      <label className="d-flex form-label texto-mario">Rol</label>
                      <Form.Control
                        type="text"
                        value={
                          formData.role_id === '1'
                            ? 'Administrador'
                            : formData.role_id === '2'
                            ? 'Usuario Regular'
                            : 'Invitado'
                        }
                        disabled
                        className="form-control-mario"
                      />
                    </MDBCol>
                  </MDBRow>
                  {/* Botones */}
                  <div className="text-center">
                    {!isEditing ? (
                      <Button className="btn-mario" onClick={handleUpdate}>
                        Actualizar
                      </Button>
                    ) : (
                      <>
                        <Button className="btn-success" onClick={handleSave}>
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
