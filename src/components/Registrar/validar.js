

// Validación del número de documento
export const validarDocumento = (documento) => {
    if (!documento) {
      return "El número de documento es obligatorio.";
    }
    if (!/^\d+$/.test(documento)) {
      return "El número de documento solo puede contener números.";
    }
    return null;
  };
  
  // Validación del tipo de documento
  export const validarTipoDocumento = (tipoDocumento) => {
    if (!tipoDocumento) {
      return "Debe seleccionar un tipo de documento.";
    }
    return null;
  };
  
  // Validación de nombres
  export const validarNombres = (nombres) => {
    if (!nombres) {
      return "El nombre es obligatorio.";
    }
    if (nombres.trim().length < 3) {
      return "El nombre debe tener al menos 3 caracteres.";
    }
    return null;
  };
  
  // Validación de apellidos
  export const validarApellidos = (apellido) => {
    if (!apellido) {
      return "El apellido es obligatorio.";
    }
    if (apellido.trim().length < 3) {
      return "El apellido debe tener al menos 3 caracteres.";
    }
    return null;
  };
  
  // Validación de celular
  export const validarCelular = (celular) => {
    if (!celular) {
      return "El número de celular es obligatorio.";
    }
    if (!/^\d{10}$/.test(celular)) {
      return "El número de celular debe tener 10 dígitos.";
    }
    return null;
  };
  
  // Validación de correo electrónico
  export const validarEmail = (email) => {
    if (!email) {
      return "El correo electrónico es obligatorio.";
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "El correo electrónico no es válido.";
    }
    return null;
  };
  
  // Validación de selección de paquete
  export const validarPaquete = (paquete) => {
    if (!paquete) {
      return "Debe seleccionar un paquete.";
    }
    return null;
  };
  
  // Validación de número de personas
  export const validarNumPersonas = (numPersonas) => {
    if (numPersonas < 1) {
      return "El número de personas debe ser al menos 1.";
    }
    return null;
  };
  