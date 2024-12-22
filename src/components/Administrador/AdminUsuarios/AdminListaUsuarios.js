import React, { useEffect } from 'react'; 
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import alertify from 'alertifyjs';
import './Adminlistausuarios.css';
import { lista_usuariosall, bloquear_usuario_admin, activar_usuario_admin } from '../../../Redux/actions';

const Adminlistausuarios = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener la lista de usuarios desde el estado
  const usuarios = useSelector((state) => state.USUARIOSALL || []);

  // Cargar los usuarios al montar el componente
  useEffect(() => {
    dispatch(lista_usuariosall());

  }, [dispatch]);

  // Maneja la eliminación del usuario
  const handleBloquear =async (id) => {
    alertify.confirm(
      'Confirmar eliminación', 
      '¿Estás seguro de que deseas eliminar este usuario?', 
      () => {
         dispatch(bloquear_usuario_admin(id));
        alertify.success('Usuario bloqueado correctamente');
      }, 
      () => {
        alertify.error('Eliminación cancelada');
      }
    );
  };
const handleActivar = async (id) =>{
  alertify.confirm(
    'Confirmar Activar', 
    '¿Estás seguro de que deseas activar este usuario?', 
    () => {
       dispatch(activar_usuario_admin(id));
      alertify.success('Usuario activado correctamente');
    }, 
    () => {
      alertify.error('Eliminación cancelada');
    }
  );

};
  
  return (
    <div className="usuarios-lista">
      <h2 className="text-center">Listado de Usuarios</h2>
      <Row>
        {usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <Col key={usuario.cont} md={4} className="mb-2">
              <Card className="usuario-card">
                <Card.Img 
                  variant="top" 
                  src={usuario.imagen} 
                  alt="Imagen del usuario" 
                />
                <Card.Body>
                  <Card.Title>{`${usuario.nombre} ${usuario.papellido} ${usuario.sapellido}`}</Card.Title>
                  <Card.Text>
                    <strong>Código Usuario:</strong> {usuario.cont} <br />
                    <strong>Tipo de Documento:</strong> {usuario.tdocumento} <br />
                    <strong>Número:</strong> {usuario.idusuario} <br />
                    <strong>Nombre:</strong> {usuario.nombre} <br />
                    <strong>Primer Apellido:</strong> {usuario.papellido} <br />
                    <strong>Segundo Apellido:</strong> {usuario.sapellido} <br />
                    <strong>Celular:</strong> {usuario.celular} <br />
                    <strong>Email:</strong> {usuario.email} <br />
                    <strong>Contraseña:</strong> {usuario.passwords} <br />
                    <strong>Rol ID:</strong> {usuario.role_id === '0'
                                                  ? "Bloqueado" 
                                                  : usuario.role_id === '1' 
                                                    ? "Administrador" 
                                                    :usuario.role_id === '2' 
                                                    ? "Cliente" :"No Habilitado"}
                  </Card.Text>
                  <div className="text-center">
                 {usuario.role_id === '0' ?(<Button 
                      variant="danger" 
                      onClick={() => handleActivar(usuario.cont)}
                    >
                      Activar
                    </Button>):(<Button 
                      variant="warning" 
                      onClick={() => handleBloquear(usuario.cont)}
                    >
                      Bloquear
                    </Button>)
                    }
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center">
            No hay usuarios disponibles
            <Card.Img 
              variant="top" 
              src="https://res.cloudinary.com/dss2hdisa/image/upload/hero-m-l_helypc.png" 
            />
          </div>
        )}
      </Row>
    </div>
  );
};

export default Adminlistausuarios;
