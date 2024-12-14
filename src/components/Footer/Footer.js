import { Container, Row, Col, Stack, Image} from "react-bootstrap";
import './Footer.css';
 
const Footer = ()=>{
    return (
       <footer>
        <Container fluid>
            <Row className="bg-primary text-white ">
                <Col className="align-items-center p-2 b-4">
                <Stack>
                    <Image 
                            src="https://www.nintendo.com/eu/media/images/10_share_images/portals_3/2x1_SuperMarioHub_image1600w.jpg"
                            alt="Ejemplo imagen de mario"
                            rounded
                            width={'auto'}
                            height={'auto'}
                            className="imgcenter"
                            
                            />
                            <h3>Company name</h3>
                            <p>Company tagline here</p>
                </Stack>
                </Col>
                
                <Col>
                <Stack>
                    <Image 
                            src="https://www.nintendo.com/eu/media/images/10_share_images/portals_3/2x1_SuperMarioHub_image1600w.jpg"
                            alt="Ejemplo imagen de mario"
                            rounded
                            width={'auto'}
                            height={'auto'}
                            />
                            <h2>Company name</h2>
                            <p>Company tagline here</p>
                </Stack>
                </Col>
                <Col>
                <Stack>
                    <Image 
                            src="https://www.nintendo.com/eu/media/images/10_share_images/portals_3/2x1_SuperMarioHub_image1600w.jpg"
                            alt="Ejemplo imagen de mario"
                            rounded
                            width={'auto'}
                            height={'auto'}
                            />
                            <h2>Company name</h2>
                            <p>Company tagline here</p>
                </Stack>
                </Col>
            </Row>
        </Container>
       </footer>

    );
}
export default Footer;