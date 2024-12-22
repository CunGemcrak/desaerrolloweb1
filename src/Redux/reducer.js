import {
  LOGIN, CREARUSUARIO, RESERVARHOTEL, CERRARSESION, 
  ACTUALIZARUSUARIO, LISTADERESERVAS, ELIMINARRESERVA,
  ADMINCREARPAQUETE, ADMINLISTAPAQUETES, ELIMINARPAQUETE, ADMINACTUALIZARPAQUETE, LISTADOPAQUETESALL, LISTAUSUARIOSALL
  
} from "../Redux/action-types";

const initialState = {
  USER: false,
  LOGINUSER:null,
  RESERVA:null,
  CREATEUSER:false,
  LISTADORESERVAS:null,
  ELIMINARRESER:null,
  LISTADOPAQUETES:null,
  PAQUETES:null,
  USUARIOSALL:null,
};

const reducer = (state = initialState, { type, payload }) => {
  // console.log("entro al reducer la informacion" + payload);
 

  switch (type) {
    case CERRARSESION:
      return {
        ...state,
        USER: false,
        LOGINUSER:null,
        RESERVA:null,
        CREATEUSER:false,
        LISTADORESERVAS:null,
        ELIMINARRESER:null,
        ACTUALIZARPAQUETE:null,
        USUARIOSALL:null
      }




      case LOGIN:
        // Asegurarse de que el payload sea un objeto, si no lo es, intenta parsearlo
        const parsedPayload = typeof payload === 'string' ? JSON.parse(payload) : payload;
      
        // Verificamos que el objeto tenga la propiedad 'message' antes de hacer la comparación
        if (parsedPayload.message === "Usuario no encontrado") {
          alert("Usuario no encontrado"); // Mostramos el mensaje de alerta
          return {
            ...state,
            USER: false,  // Establecemos USER a false si el mensaje es "Usuario no encontrado"
          };
        }
      
        // Si el usuario es encontrado, guardamos los datos del usuario en LOGINUSER
        return {
          ...state,
          LOGINUSER: parsedPayload,  // Guardamos los datos del usuario
          USER: true,  // Establecemos que el usuario está autenticado
        };
      

      
      case CREARUSUARIO:
        return {
          ...state,
          CREATEUSER: payload
        }

        case ACTUALIZARUSUARIO:
          const parsedPayload2 = JSON.parse(payload);
      if (parsedPayload.message === "Usuario no encontrado") {
        alert("Usuario no encontrado"); // Mostramos el mensaje de alerta
        return {
          ...state,
          USER: false,  // Establecemos USER a false si el mensaje es "Usuario no encontrado"
        };
      }
      return {
        ...state,
        LOGINUSER: parsedPayload2,
        USER:true
      }
      //!Vamos con las reservas 

      case LISTADOPAQUETESALL:
        return{
          ...state,
          PAQUETES:payload

        }
        case RESERVARHOTEL:
          return{
            ...state,
            RESERVA:payload

          }

        case LISTADERESERVAS:
          return{
            ...state,
            LISTADORESERVAS:payload
          }
          case ELIMINARRESERVA:
            return {
              ...state,
              LISTADORESERVAS: state.LISTADORESERVAS.filter(
                (reserva) => reserva.cont !== payload
              ),
            };
     //! Casos del Administrador

     case ADMINCREARPAQUETE:
      return{
        ...state,
        LISTADOPAQUETES:payload
      }
      case ADMINLISTAPAQUETES:
        return{
          ...state,
          PAQUETES:payload
        }
    
      case ELIMINARPAQUETE:
        return{
          ...state,
          PAQUETES: state.PAQUETES.filter(
            (reserva) => reserva.cont !== payload
          ),
        }

        case ADMINACTUALIZARPAQUETE:
          return{
            ...state,
            ACTUALIZARPAQUETE:payload
          
          }

          case LISTAUSUARIOSALL: 
            return {
            ...state,
            USUARIOSALL:payload
          }
    default:
      return { ...state };
  }
};

export default reducer;

