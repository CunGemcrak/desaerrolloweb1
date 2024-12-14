import { Navbar, Nav, Image, Container } from 'react-bootstrap';
import './MyNavbar.css';

const MyNavbar = () => {
  return (
    <Navbar expand="lg" data-bs-theme="dark" className="navbar-elegante">
      <Container>
        {/* Imagen de la izquierda solo en pantallas grandes */}
        <Navbar.Brand href="#home" className="d-none d-lg-block">
          <Image
            src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg" // Imagen de Mario Kart
            className="navbar-image"
            width={50}
            height={50}
          />
        </Navbar.Brand>

        {/* Toggle (hamburguesa) solo en pantallas pequeñas */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none">
          <Image
            src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg" // Imagen de Mario Kart
            className="navbar-image"
            width={50}
            height={50}
          />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="navbar-link">Inicio</Nav.Link>
            <Nav.Link href="/registrate" className="navbar-link">Registrate</Nav.Link>
            <Nav.Link href="/registro" className="navbar-link">Reservar</Nav.Link>
            <Nav.Link href="/quienessomos" className="navbar-link">Quienes somos</Nav.Link>
            <Nav.Link href="/Servicios" className="navbar-link">Servicios</Nav.Link>
            <Nav.Link href="/Contáctenos" className="navbar-link">Contáctenos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
