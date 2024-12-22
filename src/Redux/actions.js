

import { CREARUSUARIO, LOGIN, RESERVARHOTEL, CERRARSESION, 
  ACTUALIZARUSUARIO, LISTADERESERVAS, ITEMAPROBADO, ELIMINARRESERVA,
  ADMINCREARPAQUETE, ADMINLISTAPAQUETES, ELIMINARPAQUETE, ADMINACTUALIZARPAQUETE, LISTADOPAQUETESALL, LISTAUSUARIOSALL} from "./action-types";
import axios from "axios";

import alertify from "alertifyjs";
export const cerrarSesion = () =>{
  return async (dispatch) => {
    dispatch({
      type: CERRARSESION,
      payload: false,
    });
  }
}


export const register_user = (formData) => {
  return async (dispatch) => {
    try {
     //  alert("Entro al dispach")
      const userData = {
        tdocumento:formData.tipoDocumento, 
        idusuario:formData.ndocumento,
        nombre: formData.nombre,
        papellido: formData.papellido,
        sapellido:formData.sapellido,
        email: formData.email,
        celular: formData.celular,
        passwords: formData.password,
        imagen: 'https://res.cloudinary.com/dss2hdisa/image/upload/9e46d2905d70d779a552ff036d5e5b1e_leirjn.jpg',
        role_id: 2,
      };
      const endpoint = "http://localhost:3001/crear";
    //  alert(endpoint)

      const response = await axios.post(endpoint, userData);
      
        

      const cadena = response.data

       if (cadena.includes("Error al guardar los datos")) {
        alertify.alert(
          "Error", // Título de la ventana
          "Se encontró error", // Mensaje
          function() { // Acción al presionar "Aceptar"
              alertify.error("Operación cancelada"); // Acción después de aceptar
          }
      );
       dispatch({
        type: CREARUSUARIO,
        payload: false,
      });
    } else {
      alertify.alert(
        "Aprovado", // Título de la ventana
        "Usuario Registrado correctamente", // Mensaje
        function() { // Acción al presionar "Aceptar"
            alertify.success("Registro Creado Correctamente"); // Acción después de aceptar
        }
    );
        dispatch({
          type: CREARUSUARIO,
          payload: true,
        });
    }



      
    } catch (error) {
      console.log("Error al enviar la información", error.message);
    }
  };
};

//!Actualizar el Usuario 


export const UserActualizar = (formData) => {
  return async (dispatch) => {
    try {
      const endpoint = `http://localhost:3001/actualizar/${formData.cont}`;
alert("Ejemplo"+JSON.stringify(formData))
      // Realiza la solicitud PUT
      const response = await axios.put(endpoint, formData); 
        alert(JSON.stringify(response.data))
      if (response.status === 200) {
        dispatch({
          type: ACTUALIZARUSUARIO,
          payload: response.data, // Asegúrate de que el backend devuelva los datos actualizados
        });
        alertify.success('Usuario actualizado correctamente.');
      } else {
        throw new Error('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Hubo un problema al actualizar el usuario.', error);
    }
  };
};














export const logueoUser = (formData) => {
  return async (dispatch) => {
    try {
      const userData = {
        email: formData.email,
        passwords: formData.password, // Cambiar clave para coincidir con PHP
      };

      //const endpoint = "http://localhost:3001/leer";
      const endpoint = `http://localhost:3001/leer?email=${encodeURIComponent(userData.email)}&passwords=${encodeURIComponent(userData.passwords)}`;

      const response = await axios.get(endpoint,  userData ); // Cambiar a POST para enviar JSON
      
    alert("Esto tengo"+ JSON.stringify( response.data))
      // Verificar y corregir la URL de la imagen si está presente
   /*   if (response.data && response.data.imagen) {
        // Remover las barras invertidas de la URL de la imagen
        response.data.imagen = response.data.imagen.replace(/\\/g, ''); // Elimina todas las barras invertidas
      }
     */
     

      dispatch({
        type: LOGIN,
        payload: response.data,
      });

     



    } catch (error) {
      console.log("Error al enviar la información", error.message);
    }
  };
};


export const reservaHotel = (formData, Usuario) => {
  return async (dispatch) => {
    try {
      // alert("Entro al dispach")
      const userData = {
        idusuario:Usuario.idusuario,
        tidentificacion:Usuario.tdocumento,
        nombre: Usuario.nombre, // Fusionamos Primer Nombre y Segundo Nombre en un solo campo
        papellido: Usuario.papellido,
        sapellido: Usuario.sapellido,
        celular: Usuario.celular,
        mail: Usuario.email,
        paquete: formData.paquete,
        canpersonas: formData.numPersonas, // Número de personas, con valor predeterminado de 1
        costopaquete: formData.precioTotal, // Valor total del paquete
        role_id: 2,
      };
      const endpoint = "http://localhost:3001/reserva";
      const response = await axios.post(endpoint, userData);
      alertify.alert('Aceptado', 'Tu paquete a sido aprovado');
      dispatch({
        type: RESERVARHOTEL,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error al enviar la información", error.message);
      alertify.alert('Error', 'Intenta nuevamente la reserva');
      
    }
  };
};

//! MAnejo de reservas
export const listadopaquetesAll = ()=>{  //!todos los paquetes
  return  async (dispatch) => {
    try {
      // Definimos el endpoint con el parámetro de consulta
      const endpoint = `http://localhost:3001/verpaquetes`;

      // Realizamos la solicitud GET
      const response = await axios.get(endpoint);

      // Validamos si la respuesta contiene datos válidos
      if (response.status === 200 && response.data) {
        dispatch({
          type: LISTADOPAQUETESALL,
          payload: response.data, // Pasamos los datos al payload
        });
      } else {
        console.warn('Respuesta inesperada del servidor:', response);
      }
    } catch (error) {
      // Manejamos errores de la solicitud
      console.error('Error al obtener la lista de reservas:', error.response?.data || error.message);
  //    alert('No se pudo obtener la lista de reservas. Por favor, intenta nuevamente.');
    }
  };
}

export const listaReservas = (idusuario) => {
  return async (dispatch) => {
    try {
      // Definimos el endpoint con el parámetro de consulta
      const endpoint = `http://localhost:3001/verreserva?idusuario=${encodeURIComponent(idusuario)}`;

      // Realizamos la solicitud GET
      const response = await axios.get(endpoint);

      // Validamos si la respuesta contiene datos válidos
      if (response.status === 200 && response.data) {
        dispatch({
          type: LISTADERESERVAS,
          payload: response.data, // Pasamos los datos al payload
        });
      } else {
        console.warn('Respuesta inesperada del servidor:', response);
      }
    } catch (error) {
      // Manejamos errores de la solicitud
      console.error('Error al obtener la lista de reservas:', error.response?.data || error.message);
  //    alert('No se pudo obtener la lista de reservas. Por favor, intenta nuevamente.');
    }
  };
};
export const ActulizarItemLista = (iditem, data) => {
  return async (dispatch) => {
      try {
          const endpoint = `http://localhost:3001/actualizarreserva/${iditem}`;
          const response = await axios.put(endpoint, data);

          if (response.status === 200 && response.data) {
              dispatch({
                  type: ITEMAPROBADO,
                  payload: response.data,
              });
          } else {
              console.warn('Respuesta inesperada del servidor:', response);
          }
      } catch (error) {
          console.error('Error al obtener la lista de reservas:', error.response?.data || error.message);
         // alert('No se pudo obtener la lista de reservas. Por favor, intenta nuevamente.');
      }
  };
};


export const eliminarReservaUsuario = (iditem, idusuario) => {
  return async (dispatch) => {
    try {
      // Endpoint para eliminar la reserva
      const endpointEliminar = `http://localhost:3001/eliminarreserva/${iditem}`;
      const responseEliminar = await axios.delete(endpointEliminar);

      // Si la eliminación es exitosa, se despacha la acción de eliminación
      if (responseEliminar.status === 200 && responseEliminar.data) {
        dispatch({
          type: ELIMINARRESERVA,
          payload: iditem,
        });
        alert('Reserva eliminada correctamente');
      } else {
        console.warn('La respuesta del servidor no es la esperada:', responseEliminar);
        alert('No se pudo eliminar la reserva');
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al eliminar la reserva:', error.response?.data || error.message);
      alert('No se puede eliminar la reserva');
    }
  };
};











//!Funciones del Administrador 


export const create_paquete = (formData) => {
  return async (dispatch) => {
    try {
      // Preparar los datos del paquete a enviar
      const paqueteData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: formData.precio,
        value: formData.value,
        tipoPrecio: formData.tipoPrecio,
        imagenHabitacion: formData.imagenHabitacion,
        alimentacion: formData.alimentacion,
        actividades: formData.actividades,
        adicionales: formData.adicionales,
      };

      // Realizar la petición POST al backend
      const endpoint = "http://localhost:3001/crearpaquete"; // Ruta de la API que creaste
      const response = await axios.post(endpoint, paqueteData);

      // Mostrar mensaje de éxito con alertify
      alertify.alert('Aceptado', 'Tu paquete ha sido creado correctamente');

      // Disparar la acción con la respuesta del servidor
      dispatch({
        type: ADMINCREARPAQUETE,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error al enviar la información", error.message);
      alertify.alert('Error', 'Intenta nuevamente la creación del paquete');
    }
  };
};




export const obtener_paquetes = () => {
  return async (dispatch) => {
    try {
      // Actualizamos el endpoint para obtener los paquetes
      const endpoint = `http://localhost:3001/verpaquetes`;

      // Realizamos la solicitud GET
      const response = await axios.get(endpoint);

      // Validamos si la respuesta contiene datos válidos
      if (response.status === 200 && response.data) {
        dispatch({
          type: ADMINLISTAPAQUETES,  // Asegúrate de usar el tipo correcto de acción
          payload: response.data, // Pasamos los datos al payload
        });
      } else {
        console.warn('Respuesta inesperada del servidor:', response);
      }
    } catch (error) {
      // Manejamos errores de la solicitud
      console.error('Error al obtener la lista de paquetes:', error.response?.data || error.message);
      // alert('No se pudo obtener la lista de paquetes. Por favor, intenta nuevamente.');
    }
  };
};




export const actualizar_paquete = (iditem, data) => {
  return async (dispatch) => {
    try {
      const endpointActualizar = `http://localhost:3001/administradoractualizarpaquete/${iditem}`;
      const response = await axios.put(endpointActualizar, data);

      if (response.status === 200) {
        dispatch({
          type: 'ADMINACTUALIZARPAQUETE', // Asegúrate de que este tipo de acción esté definido
          payload: response.data,
        });
        alertify.success('Paquete actualizado correctamente');
      } else {
        console.warn('La respuesta del servidor no es la esperada:', response);
        alertify.error('No se pudo actualizar el paquete');
      }
    } catch (error) {
      console.error('Error al actualizar el paquete:', error.response?.data || error.message);
    }
  };
};













export const eliminar_paquete = (idpaquete) => {
  return async (dispatch) => {
     
           const endpointEliminar = `http://localhost:3001/eliminarpaquete/${idpaquete}`;
          const responseEliminar = await axios.delete(endpointEliminar);

         
            if (responseEliminar.status === 200) {
              dispatch({
                  type: ELIMINARPAQUETE,
                  payload: idpaquete, // El ID del paquete eliminado
              });
              alertify.success('Paquete eliminado correctamente');
          } else {
              console.warn('La respuesta del servidor no es la esperada:', responseEliminar);
              alertify.error('No se pudo eliminar el paquete');
          }
      
  };
};
export const lista_usuariosall = () => {
  return async (dispatch) => {
    try {
      const endpoint = 'http://localhost:3001/listausuarioall'; // Corrige el endpoint, quitando el símbolo `}` sobrante.
      const responseAlllist = await axios.get(endpoint);

      if (responseAlllist.status === 200) {
        dispatch({
          type: LISTAUSUARIOSALL,
          payload: responseAlllist.data, // Asegúrate de que `responseAlllist.data` tenga el formato esperado.
        });
        alertify.success('Usuarios listados correctamente'); // Mensaje más apropiado.
      } else {
        console.warn('La respuesta del servidor no es la esperada:', responseAlllist);
        alertify.error('No se pudieron listar los usuarios');
      }
    } catch (error) {
      console.error('Error al listar los usuarios:', error);
      alertify.error('Error al conectar con el servidor');
    }
  };
};
export const bloquear_usuario_admin = (id) => {
  return async (dispatch) => {
    try {
      const endpointActualizar = `http://localhost:3001/estadousuariobloquear/${id}`;
      const response = await axios.put(endpointActualizar);

      if (response.status === 200) {
        // Verifica si la respuesta tiene un status '200' y 'data' es un array
        if (response.data.status === '200' && Array.isArray(response.data.data)) {
          // Despachar la acción con los usuarios actualizados
          dispatch({
            type: 'LISTAUSUARIOSALL',
            payload: response.data.data, // Solo los datos de los usuarios
          });
          alertify.success('Usuario bloqueado correctamente');
        } else {
          console.warn('La respuesta no contiene la estructura esperada', response.data);
          alertify.error('No se pudo bloquear el usuario');
        }
      } else {
        console.warn('La respuesta del servidor no es la esperada:', response);
        alertify.error('No se pudo actualizar el paquete');
      }
    } catch (error) {
      console.error('Error al actualizar el paquete:', error.response?.data || error.message);
      alertify.error('Error al bloquear el usuario');
    }
  };
};

export const activar_usuario_admin = (id) => {
  return async (dispatch) => {
    try {
      const endpointActualizar = `http://localhost:3001/estadousuarioactivar/${id}`;
      const response = await axios.put(endpointActualizar);

      if (response.status === 200) {
        // Verifica si la respuesta tiene un status '200' y 'data' es un array
        if (response.data.status === '200' && Array.isArray(response.data.data)) {
          // Despachar la acción con los usuarios actualizados
          dispatch({
            type: 'LISTAUSUARIOSALL',
            payload: response.data.data, // Solo los datos de los usuarios
          });
          alertify.success('Usuario bloqueado correctamente');
        } else {
          console.warn('La respuesta no contiene la estructura esperada', response.data);
          alertify.error('No se pudo bloquear el usuario');
        }
      } else {
        console.warn('La respuesta del servidor no es la esperada:', response);
        alertify.error('No se pudo actualizar el paquete');
      }
    } catch (error) {
      console.error('Error al actualizar el paquete:', error.response?.data || error.message);
      alertify.error('Error al bloquear el usuario');
    }
  };
};


export const listado_de_reservas_all = () => {
  return async (dispatch) => {
    try {
      const endpoint = 'http://localhost:3001/listareservasall'; // Corrige el endpoint, quitando el símbolo `}` sobrante.
      const responseAlllist = await axios.get(endpoint);

      if (responseAlllist.status === 200) {
        dispatch({
          type: LISTADERESERVAS,
          payload: responseAlllist.data, // Asegúrate de que `responseAlllist.data` tenga el formato esperado.
        });
        alertify.success('Usuarios listados correctamente'); // Mensaje más apropiado.
      } else {
        console.warn('La respuesta del servidor no es la esperada:', responseAlllist);
        alertify.error('No se pudieron listar los usuarios');
      }
    } catch (error) {
      console.error('Error al listar los usuarios:', error);
      alertify.error('Error al conectar con el servidor');
    }
  };
};

export const aprobar_reserva_admin = (cont, Aprobado) => {
  return async (dispatch) => {
    try {
      const endpointActualizar = `http://localhost:3001/estadousuarioactivar/${cont}/${Aprobado}`;
      const responseReserva = await axios.put(endpointActualizar);

      if (responseReserva.status === 200) {
        dispatch({
          type: LISTADERESERVAS,
          payload: responseReserva.data, // Asegúrate de que `responseAlllist.data` tenga el formato esperado.
        });
        try {
          const endpoint = 'http://localhost:3001/listareservasall'; // Corrige el endpoint, quitando el símbolo `}` sobrante.
          const responseAlllist = await axios.get(endpoint);
    
          if (responseAlllist.status === 200) {
            dispatch({
              type: LISTADERESERVAS,
              payload: responseAlllist.data, // Asegúrate de que `responseAlllist.data` tenga el formato esperado.
            });
            alertify.success('Usuarios listados correctamente'); // Mensaje más apropiado.
          } else {
            console.warn('La respuesta del servidor no es la esperada:', responseAlllist);
            alertify.error('No se pudieron listar los usuarios');
          }
        } catch (error) {
          console.error('Error al listar los usuarios:', error);
          alertify.error('Error al conectar con el servidor');
        }
        alertify.success('Usuarios listados correctamente'); // Mensaje más apropiado.
      } else {
        console.warn('La respuesta del servidor no es la esperada:', responseReserva);
        alertify.error('No se pudieron listar los usuarios');
      }
    } catch (error) {
      console.error('Error al listar los usuarios:', error);
      alertify.error('Error al conectar con el servidor');
    }
  };
};

