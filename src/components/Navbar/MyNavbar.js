import { Navbar, Nav, Image, Container } from 'react-bootstrap';
import './MyNavbar.css';

const MyNavbar = () => {
  return (
    <Navbar expand="lg" data-bs-theme="dark" className="navbarblue">
      <Container>
        {/* Imagen de la izquierda solo en pantallas grandes */}
        <Navbar.Brand href="#home" className="d-none d-lg-block">
          <Image
            src="https://i.kinja-img.com/image/upload/c_fit,q_60,w_1315/d8f801cb2899b73ac4e8787110e85381.jpg"
            className="rounded-image nav-icon"
            width={50}
            height={50}
          />
        </Navbar.Brand>

        {/* Toggle (hamburguesa) solo en pantallas pequeñas */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none">
          <Image
            src="https://i.kinja-img.com/image/upload/c_fit,q_60,w_1315/d8f801cb2899b73ac4e8787110e85381.jpg"
            className="rounded-image nav-icon"
            width={50}
            height={50}
          />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/registrate">Registrate</Nav.Link>
            <Nav.Link href="/registro">Reservar</Nav.Link>
            <Nav.Link href="/quienessomos">Quienes somos</Nav.Link>
            <Nav.Link href="/Servicios">Servicios</Nav.Link>
            <Nav.Link href="/Contáctenos">Contáctenos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
