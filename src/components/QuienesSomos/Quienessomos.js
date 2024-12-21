import React from "react";
import { Carousel } from "react-bootstrap";
import "./Quienessomos.css";

const QuienesSomos = () => {
  return (
    <div className="quienes-somos-container">
      {/* Encabezado */}
      <header className="header-mario">
        <h1>¿Quiénes Somos?</h1>
        <p>¡Bienvenido al Reino Champiñón!</p>
      </header>

      {/* Carrusel de imágenes */}
      <Carousel className="carrusel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dss2hdisa/image/upload/cfcbddca1570b66bf8fa12277dd1eac8_mghk0g.png"
            alt="Habitaciones temáticas"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Habitaciones Temáticas</h3>
            <p>
              Vive en un castillo, un nivel subterráneo o el colorido mundo de Mario. ¡Cada habitación es única!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dss2hdisa/image/upload/FOTO-LR-2024-04-13T095740.476_ybwnpn.webp"
            alt="Áreas de recreación"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Áreas de Recreación</h3>
            <p>
              Disfruta de nuestras áreas de juego inspiradas en los niveles más icónicos del videojuego.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dss2hdisa/image/upload/mario-1_ibf9dg.jpg"
            alt="Eventos Temáticos"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Eventos Temáticos</h3>
            <p>
              Participa en nuestras actividades temáticas como torneos de Mario Kart y fiestas del Reino Champiñón.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Sección de descripción */}
      <section className="descripcion">
       
        <div className="texto">
          <h2>Sobre Nosotros</h2>
          <p>
            ¡Bienvenidos a <strong>Hotel Reino Champiñón</strong>, un lugar donde la magia de Mario Bros cobra vida!
          </p>
          <p>
            Inspirados en el icónico universo de Mario Bros, nuestro hotel temático ofrece a los huéspedes una experiencia inmersiva llena de colores vibrantes, habitaciones tematizadas y actividades emocionantes.
          </p>
        </div>
      </section>

      {/* Misión, Visión y Valores */}
      <section className="mision-vision-valores">
        <div className="caja">
          <h3>Misión</h3>
          <p>
            Crear experiencias únicas para nuestros huéspedes, sumergiéndolos en un mundo lleno de fantasía y aventuras.
          </p>
        </div>
        <div className="caja">
          <h3>Visión</h3>
          <p>
            Convertirnos en el destino favorito de los amantes de Mario Bros, siendo reconocidos a nivel mundial como el hotel temático por excelencia.
          </p>
        </div>
        <div className="caja">
          <h3>Valores</h3>
          <ul>
            <li>Trabajo en Equipo</li>
            <li>Valentía</li>
            <li>Creatividad</li>
            <li>Diversión</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomos;
