import { Navbar, Nav, Image, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router-dom";
import './MyNavbar.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cerrarSesion,  listadopaquetesAll } from '../../Redux/actions';

const MyNavbar = () => {
  const USER = useSelector((store) => store.USER)
  const navigator = useNavigate();

  const USERMENU = useSelector((store)=>store.LOGINUSER )

  const [menuelement, setMenuElement] =useState(0)
  const dispatch = useDispatch()



    useEffect(() => {
      dispatch( listadopaquetesAll())
      //dispatch(lista_usuariosall())
      if (USER) {  // Si USER es verdadero
        if(USERMENU.role_id === '2'){
          setMenuElement(2)
        } else 
        if(USERMENU.role_id === '1'){
        
          setMenuElement(1)

        // Redirigir al perfil de usuario
      } else
      if(USERMENU === false) {
        setMenuElement(0)
      }
  
    }
   // alert(USERMENU)
  }, [USER, USERMENU, menuelement]);


 const hondleCerrarSesion = ()=>{
  setMenuElement(0)
  dispatch(cerrarSesion())

  
 }

  
  return (
    <Navbar expand="lg" data-bs-theme="dark" className="navbar-elegante">
      <Container>
        {/* Imagen de la izquierda solo en pantallas grandes */}
        <Navbar.Brand href="#home" className="d-none d-lg-block">
          <Image
            src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg" // Imagen de Mario Kart
            className="navbar-image bordesimg"
            width={50}
            height={50}
          />
        </Navbar.Brand>

        {/* Toggle (hamburguesa) solo en pantallas pequeñas */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none">
          <Image
            src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg" // Imagen de Mario Kart
            className="navbar-image bordesimg"
            width={50}
            height={50}
          />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           
          
          <NavLink to="/" className="navbar-link underline" >Inicio</NavLink>
            <NavLink to="/quienessomos" className="navbar-link underline">Quienes somos</NavLink>
            <NavLink to="/Servicios" className="navbar-link underline">Servicios</NavLink>
            <NavLink to="/Contáctenos" className="navbar-link underline">Contáctenos</NavLink>
            
            {menuelement === 2 ?<NavLink to="/AddUsuarioPaquete" className="navbar-link underline">Agregar a Reserva</NavLink>:null}
           
           
            {menuelement === 1 ? <NavLink to="/AdminCrearPaquete" className="navbar-link underline">Crear Paquete</NavLink>:null}
            {menuelement === 1 ? <NavLink to="/AdminListapaquetes" className="navbar-link underline">Acciones Con Paquete</NavLink>:null}
            {menuelement === 1 ? <NavLink to="/allusers" className="navbar-link underline">Lista Usuarios</NavLink>:null}
            {menuelement === 1 ? <NavLink to="/allreservas" className="navbar-link underline">Lista Reservas</NavLink>:null}
          
          {//general
              }
              
              {menuelement === 2 ? <NavLink to="/registro" className="navbar-link underline">Reservar</NavLink> :null}
              
               <NavLink to="/PerfilUsuario" className="navbar-link underline">Perfil</NavLink>
               {menuelement === 0 ? <NavLink to="/registrate" className="navbar-link underline">Login</NavLink> : <NavLink to="/registrate" className="navbar-link underline" onClick={hondleCerrarSesion}>Salir</NavLink> }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
