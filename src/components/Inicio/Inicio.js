import Card from 'react-bootstrap/Card';
import './Inicio.css';


const Inicio = () => {
    return (
        <Card className="custom-card">
            <Card.Body>
                <Card.Title>CARACTERISTICAS DE LA PÁGINA</Card.Title>
                <Card.Text>
                    <p>
                        Los estudiantes deben realizar la entrega de una aplicación de software para ambiente web responsive, que cumpla con las necesidades identificadas, creación de páginas con HTML5 y maquetación visual con CSS3, de backed PHP, que se establezca una conexión a bases de datos. Un hotel desea mostrar sus servicios de alojamiento a sus clientes, para ello debe construir una aplicación web que permita visualizar la información del hotel (Quienes somos, servicios, contáctenos), en la opción de servicios debe mostrar a través de unas cards la información de los servicios, tambien se espera que el turista pueda registrar un servicio con los siguientes datos: 
                        Número de documento de identidad, tipo de documento, nombre completo, número de celular y correo electrónico, así como el registro del paquete o habitación seleccionada, esta información debe quedar en la base de datos y ser consultada por el administrador del hotel. 
                        En quienes somos debemos enlazar carrusel con imágenes y texto del hotel, en contáctenos se debe ubicar un formulario de contáctenos con el hotel, no es necesario que tenga funcionalidad de registro de información.
                    
                    
                    </p>
                    
                </Card.Text>
                <Card.Text>
                   <p className='textoName'>Creador: Luis Alberto Buelvas Cogollo</p> 
                   <p className='textoName'>Asignatura: Desarrollo Web</p> 
                   <p className='textoName'>Ficha: 56603  </p> 
                   <p className='textoName'>Primer Bloque</p> 
                   <p className='textoName'>Corte  24V06</p> 
                    </Card.Text>
            </Card.Body>
        </Card>
    );
};
export default Inicio;
