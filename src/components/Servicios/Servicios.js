import React from 'react';
import {Button } from 'react-bootstrap/'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from 'mdb-react-ui-kit';
import './HotelService.css';

import { useNavigate } from 'react-router';


const HotelService = () => {
    // Estado para almacenar el paquete seleccionado
  // const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate =useNavigate();

  // Función para manejar la selección y redirección
  const handleViewDetails = (paquete) => {
  //  setSelectedPackage(paquete);
  navigate('/detalle-paquete', { state: { paquete } }); // Pasa el paquete a través del estado de navegación
  };

  // Paquetes de servicios del hotel
  const paquetes = [
    { 
      id: '1',
      nombre: 'Paquete Aventura Mario Kart',
      descripcion: 'Vive una experiencia emocionante con tours guiados y carreras de karts en pistas temáticas de Mario Kart.',
      precio: 700, // Precio por persona
      value: 'paqueteAventura',
      tipoPrecio: 'individual',
      imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/v1734366903/i3vmwrfE9ngPle-xwxj1o-MPdEwE9pfmTwfdm3kq5vU_ll8jd6.png', // Imagen temática con decoración de Mario Kart
      alimentacion: 'Desayuno y almuerzo incluidos, con temática de Mario Bros (por ejemplo, champiñones rellenos, hamburguesas Bowser, etc.)',
      actividades: [
        'Carreras de karts en pistas diseñadas como circuitos de Mario Kart.',
        'Tours interactivos guiados donde puedes recoger "monedas" y "estrellas".',
        'Competencia en simuladores de videojuegos Mario Kart.',
      ],
      adicionales: [
        'Acceso a la piscina temática "Reino Champiñón".',
        'Fotografías personalizadas con disfraces de personajes.',
        'Souvenir de Mario Kart incluido.'
      ],
    },
    {
      id: '2',
      nombre: 'Paquete Lujo Champiñón',
      descripcion: 'Relájate en nuestras suites temáticas con decoración inspirada en el Reino Champiñón, con todas las comodidades premium.',
      precio: 1000,
      value: 'paqueteLujo',
      tipoPrecio: 'individual',
      imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/v1734366903/Champi3Fn_Dorado_e9phkm.png', // Imagen temática de una suite lujosa estilo Mario Bros
      alimentacion: 'Todas las comidas incluidas (desayuno, almuerzo y cena gourmet, menús temáticos personalizados).',
      actividades: [
        'Cena privada con menú exclusivo temático de Mario Bros.',
        'Acceso exclusivo al jacuzzi con ambientación de Toad House.',
        'Spa temático con productos basados en el Reino Champiñón.',
      ],
      adicionales: [
        'Servicio de transporte privado estilo "Carruaje de Bowser".',
        'Amenidades premium, como batas y zapatillas con diseños de Mario Bros.',
        'Decoración especial para ocasiones (cumpleaños, aniversarios, etc.).',
      ],
    },
    {
      id: '3',
      nombre: 'Paquete Relax en el Spa',
      descripcion: 'Disfruta de un día completo de relajación en nuestro exclusivo spa con masajes, sauna y acceso a las instalaciones.',
      precio: 350,
      value: 'paqueteRelaxSpa',
      tipoPrecio: 'individual',
      imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/v1734367983/dr_mario_world_aooldg.webp', // Imagen del spa con decoración de los champiñones rojos y blancos
      alimentacion: 'Snack saludable y bebidas temáticas como "Elixir de Estrellas".',
      actividades: [
        'Masajes relajantes inspirados en el Reino Champiñón.',
        'Terapia de aguas termales en el área de spa temático.',
        'Meditación guiada con música del "Bosque Encantado".',
      ],
      adicionales: [
        'Uso ilimitado de las instalaciones del spa durante el día.',
        'Descuento en productos de belleza exclusivos.',
        'Zona de relajación decorada con referencias a Yoshi y Toad.'
      ],
    },
    {
      id: '4',
      nombre: 'Paquete Aventura en la Naturaleza',
      descripcion: 'Embárcate en una aventura de senderismo, pesca y campamento en las montañas cercanas.',
      precio: 600,
      value: 'paqueteAventuraNaturaleza',
      tipoPrecio: 'individual',
      imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/illustration-video-games-water-nature-Super-Mario-world-844105-wallhere.com_zujlij.jpg', // Imagen de una cabaña decorada con elementos de Donkey Kong y Mario Bros
      alimentacion: 'Box lunch temático para la excursión y cena campestre.',
      actividades: [
        'Senderismo guiado con estaciones para recolectar "monedas" y "objetos mágicos".',
        'Pesca recreativa con mini-torneos.',
        'Camping en zonas tematizadas con iluminación y ambientación del "Bosque de Estrellas".',
      ],
      adicionales: [
        'Cabaña decorada para pernoctar.',
        'Actividades nocturnas como fogatas con cuentos del Reino Champiñón.',
        'Manualidades y recuerdos hechos a mano por los participantes.',
      ],
    },
    {
      id: '5',
      nombre: 'Paquete Kids Club',
      descripcion: 'Diversión asegurada para los más pequeños, con actividades diarias, talleres y acceso exclusivo a la zona de juegos.',
      precio: 400,
      value: 'paqueteKidsClub',
      tipoPrecio: 'individual',
      imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/WEB-SUPER-MARIO-BROS-NINTENDO-MOVIE-04-Universal-Pictures_wr5ow6.webp', // Imagen colorida con personajes de Mario Bros
      alimentacion: 'Menú infantil con opciones saludables y temáticas.',
      actividades: [
        'Clases de manualidades y decoración de cupcakes temáticos.',
        'Zona de juegos interactiva estilo Reino Champiñón.',
        'Mini-torneos de videojuegos supervisados.',
      ],
      adicionales: [
        'Show diario con personajes de Mario Bros.',
        'Acceso exclusivo a la piscina infantil temática.',
        'Kit de bienvenida con juguetes y stickers temáticos.',
      ],
    },
    {
      id: '6',
      nombre: 'Paquete VIP Executive',
      descripcion: 'Una experiencia exclusiva con acceso a nuestras suites VIP, transporte privado y cenas gourmet.',
      precio: 2000,
      value: 'paqueteVIPExecutive',
      tipoPrecio: 'individual',
      imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/mario-luigi-3021258_sbsgde.webp', // Imagen de la suite VIP decorada con lujo y estilo temático
      alimentacion: 'Menús a la carta y cenas gourmet privadas.',
      actividades: [
        'Tour privado por las instalaciones temáticas del hotel.',
        'Cenas privadas con música en vivo.',
        'Acceso a áreas exclusivas VIP.',
      ],
      adicionales: [
        'Conductor privado.',
        'Regalos exclusivos y una experiencia personalizada.',
        'Espacios exclusivos para reuniones y eventos privados.',
      ],
    },
    {
      id: '7',
      nombre: 'Paquete Fin de Semana Gastronómico',
      descripcion: 'Un fin de semana dedicado a los amantes de la gastronomía con clases de cocina y cenas temáticas.',
      precio: 800,
      value: 'paqueteGastronomico',
      tipoPrecio: 'individual',
      imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/images_bckrbr.jpg', // Imagen con elementos relacionados con la cocina y Mario Bros
      alimentacion: 'Todas las comidas incluidas, con clases de cocina interactiva.',
      actividades: [
        'Clases de cocina temática (preparación de platos inspirados en Mario Bros).',
        'Catas de vinos y cervezas artesanales temáticas.',
        'Cenas temáticas con show interactivo.',
      ],
      adicionales: [
        'Recetarios temáticos y kits de cocina.',
        'Certificado de participación.',
        'Souvenirs personalizados relacionados con la gastronomía.',
      ],
    },
  ];
  

  return (
    <MDBContainer className="my-5 gradient-form hotel-container ">
      {/* Título de los paquetes */}
      <MDBRow className="text-center mb-4 ">
        <MDBCol col="12">
          <h2 className="mt-2 mb-2 pb-1">Paquetes del Hotel Champiñón</h2>
          <p className="text-muted">Elige el paquete perfecto para tu estadía en nuestro hotel temático</p>
        </MDBCol>
      </MDBRow>

      {/* Fila con los paquetes */}
      <MDBRow className="d-flex justify-content-center">
        {paquetes.map((paquete) => (
          <MDBCol lg="4" md="6" sm="12" key={paquete.id} className="mb-4">
            <MDBCard className="h-100">
              <MDBCardBody>
                <MDBCardTitle>{paquete.nombre}</MDBCardTitle>
                <MDBCardText>{paquete.descripcion}</MDBCardText>
                <MDBCardText className="text-primary">${paquete.precio}</MDBCardText>
                {/* Al hacer clic, actualiza el paquete seleccionado */}
                <Button variant="outline-danger"
                  
                  onClick={() => handleViewDetails(paquete)}
                >
                  Ver {paquete.id}
                </Button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>

    
    </MDBContainer>
  );
};

export default HotelService;
