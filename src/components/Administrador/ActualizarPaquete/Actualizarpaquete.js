import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import alertify from 'alertifyjs';
import { actualizar_paquete } from '../../../Redux/actions';
import './Actualizarpaquete.css'; // Importa el CSS

const Actualizarpaquete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cont } = useParams(); // Recupera el parámetro 'cont' desde la URL

  // Buscar el paquete en el estado de Redux usando el 'cont' que se obtiene de la URL
  const paquete = useSelector((state) =>
    state.PAQUETES.find((paquete) => paquete.cont === parseInt(cont)) // Busca el paquete con ese 'cont'
  );

  // Estado para almacenar los datos del paquete
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    value: '',
    tipoPrecio: '',
    imagenHabitacion: '',
    alimentacion: '',
    actividades: '',
    adicionales: '',
    cont: '', // ID del paquete (no editable)
  });

  // Si el paquete existe, rellenar los campos del formulario
  useEffect(() => {
    if (paquete) {
      setFormData({
        nombre: paquete.nombre || '',
        descripcion: paquete.descripcion || '',
        precio: paquete.precio || '',
        value: paquete.value || '',
        tipoPrecio: paquete.tipoPrecio || '',
        imagenHabitacion: paquete.imagenHabitacion || '',
        alimentacion: paquete.alimentacion || '',
        actividades: paquete.actividades || '',
        adicionales: paquete.adicionales || '',
        cont: paquete.cont || '', // ID del paquete (no editable)
      });
    }
  }, [paquete]); // Solo se actualiza cuando 'paquete' cambia

  // Validar si una URL es de imagen
  const isValidImageUrl = (url) => {
    const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))/i;
    return regex.test(url);
  };

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para actualizar el paquete
  const handleActualizar = async () => {
    if (formData.nombre && formData.precio && formData.imagenHabitacion) {
      if (isValidImageUrl(formData.imagenHabitacion)) {
        await dispatch(actualizar_paquete(paquete.cont, formData)); // Actualiza el paquete en Redux
       // await dispatch(obtener_paquetes())
        alertify.success('Paquete actualizado correctamente');
        navigate('/AdminListapaquetes'); // Redirige al listado de paquetes
       alert("actualizacion desarrollada")
      } else {
        alertify.error('La URL de la imagen no es válida.');
      }
    } else {
      alertify.error('Por favor complete todos los campos');
    }
  };

  // Función para cancelar la edición
  const handleCancelar = () => {
    navigate('/listapaquetes'); // Redirige al listado de paquetes sin guardar cambios
  };

  // Si el paquete no existe, muestra un mensaje
  if (!paquete) {
    return <p>No se ha encontrado el paquete para editar.</p>;
  }

  return (
    <div className='bodydivactualizadr'>
      <h2 className="text-center">Actualizar Paquete</h2>
      <div className="paquete-actualizar">
        <div className="text-center">
          <Card className="paquete-card p-2">
            <Card.Body>
              <Form>
                <Form.Group controlId="cont">
                  <Form.Label className='form-label alineartexto'>ID del Paquete (No editable)</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.cont}
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="nombre">
                  <Form.Label className='form-label alineartexto'>Nombre del Paquete</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="descripcion">
                  <Form.Label className='form-label alineartexto'>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="precio">
                  <Form.Label className='form-label alineartexto'>Calificación</Form.Label>
                  <Form.Control
                    type="text"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="value">
                  <Form.Label className='form-label alineartexto'>Valor</Form.Label>
                  <Form.Control
                    type="text"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="tipoPrecio">
                  <Form.Label className='form-label alineartexto'>Tipo de Precio</Form.Label>
                  <Form.Control
                    type="text"
                    name="tipoPrecio"
                    value={formData.tipoPrecio}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="imagenHabitacion">
                  <Form.Label className='form-label alineartexto'>Imagen</Form.Label>
                  <Form.Control
                    type="text"
                    name="imagenHabitacion"
                    value={formData.imagenHabitacion}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Mostrar la imagen en tiempo real */}
                {formData.imagenHabitacion && isValidImageUrl(formData.imagenHabitacion) && (
                  <div className="text-center mt-3">
                    <img
                      src={formData.imagenHabitacion}
                      alt="Vista previa"
                      style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                    />
                  </div>
                )}

                <Form.Group controlId="alimentacion">
                  <Form.Label className='form-label alineartexto'>Alimentación</Form.Label>
                  <Form.Control
                    type="text"
                    name="alimentacion"
                    value={formData.alimentacion}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="actividades">
                  <Form.Label className='form-label alineartexto'>Actividades</Form.Label>
                  <Form.Control
                    type="text"
                    name="actividades"
                    value={formData.actividades}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="adicionales">
                  <Form.Label className='form-label alineartexto'>Adicionales</Form.Label>
                  <Form.Control
                    type="text"
                    name="adicionales"
                    value={formData.adicionales}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="text-center mt-3">
                  <Button variant="secondary" onClick={handleCancelar} className="mr-2">
                    Cancelar
                  </Button>
                  <Button variant="success" onClick={handleActualizar}>
                    Actualizar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Actualizarpaquete;
