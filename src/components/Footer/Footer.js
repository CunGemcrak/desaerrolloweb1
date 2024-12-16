import { Container, Row, Col,  Image } from "react-bootstrap";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-elegante">
      <Container>
        <Row className="align-items-center justify-content-between py-3">
          {/* Columna para la imagen, a la izquierda */}
          <Col className="text-center">
            <Image
              src="https://raw.githubusercontent.com/CunGemcrak/PI-Videogames-main/main/videogame.png" // Cambia la URL por una imagen representativa
              alt="Hotel Champiñón"
              width={200}
              rounded
              className="footer-image"
            />
          </Col>

          {/* Columna para el texto, a la derecha */}
          <Col lg="7" md="7" sm="12" className="footer-text">
            <h3 className="footer-title">Hotel Champiñón</h3>
            <p className="footer-description">
              Un lugar mágico donde la fantasía y la aventura se encuentran, 
              ideal para toda la familia. Vive la experiencia del Reino Champiñón.
            </p>
            <p className="footer-contact">
              <strong>Email:</strong> contacto@hotelchampinon.com
            </p>
            <p className="footer-contact">
              <strong>Teléfono:</strong> +1 234 567 890
            </p>
          </Col>
        </Row>

        {/* Derechos reservados */}
        <Row className="text-center py-2">
          <Col>
            <p className="footer-rights">&copy; {new Date().getFullYear()} Hotel Champiñón. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
