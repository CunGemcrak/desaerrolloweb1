import { Navbar, Nav, Image, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './MyNavbar.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyNavbar = () => {
  const USER = useSelector((store) => store.USER)

  const USERMENU = useSelector((store)=>store.LOGINUSER)

  const [menuelement, setMenuElement] =useState(0)



    useEffect(() => {
      if (USER) {  // Si USER es verdadero
        if(USERMENU.role_id === '2'){
          setMenuElement(2)
        } else 
        if(USERMENU.role_id === '1'){
        
          setMenuElement(1)

        // Redirigir al perfil de usuario
      } else {
        setMenuElement(0)
      }
      alert(USERMENU.role_id)
    }
    alert(menuelement)
  }, [USER, USERMENU, menuelement]);





  
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
           {menuelement === 0 ? <NavLink to="/registrate" className="navbar-link underline">Login</NavLink> : <NavLink to="/registrate" className="navbar-link underline">Salir</NavLink> }
            <NavLink to="/registro" className="navbar-link underline">Reservar</NavLink>
            <NavLink to="/quienessomos" className="navbar-link underline">Quienes somos</NavLink>
            <NavLink to="/Servicios" className="navbar-link underline">Servicios</NavLink>
            <NavLink to="/Contáctenos" className="navbar-link underline">Contáctenos</NavLink>
            <NavLink to="/PerfilUsuario" className="navbar-link underline">Perfil</NavLink>
            <NavLink to="/AddUsuarioPaquete" className="navbar-link underline">Agregar a Reserva</NavLink>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
