import React from "react";
import "./Quienessomos.css";

const QuienesSomos = () => {
  return (
    <div className="quienes-somos-container">
      {/* Encabezado */}
      <header className="header-mario">
        <h1>¿Quiénes Somos?</h1>
        <p>¡Bienvenido al Reino Champiñón!</p>
      </header>

      {/* Sección de contenido */}
      <main className="contenido">
        <section className="descripcion">
          <img
            src="https://m.media-amazon.com/images/I/71-bZWL-+mL._AC_SX679_.jpg"
            alt="Mario Bros"
            className="img-mario"
          />
          <div className="texto">
            <h2>Sobre Nosotros</h2>
            <p>
              ¡Bienvenidos a <strong>Hotel Reino Champiñón</strong>, un lugar donde la magia de Mario Bros cobra vida! Somos más que un hotel: somos un portal a un mundo de aventuras, nostalgia y diversión que transporta a todas las edades al corazón de su videojuego favorito.
            </p>
            <p>
              Inspirados en el icónico universo de Mario Bros, nuestro hotel temático ofrece a los huéspedes una experiencia inmersiva llena de colores vibrantes, habitaciones tematizadas y actividades emocionantes. Desde habitaciones decoradas como el Castillo de Peach hasta áreas de juego que emulan los niveles de Mario, cada rincón está diseñado para que te sientas como un auténtico héroe del Reino Champiñón.
            </p>
          </div>
        </section>

        {/* Misión, Visión y Valores */}
        <section className="mision-vision-valores">
          <div className="caja">
            <h3>Misión</h3>
            <p>
              Crear experiencias únicas para nuestros huéspedes, sumergiéndolos
              en un mundo lleno de fantasía y aventuras. Queremos ser el lugar
              donde familias, amigos y fanáticos encuentren la alegría de vivir
              su propio videojuego.
            </p>
          </div>
          <div className="caja">
            <h3>Visión</h3>
            <p>
              Convertirnos en el destino favorito de los amantes de Mario Bros,
              siendo reconocidos a nivel mundial como el hotel temático que
              combina la magia del juego con la comodidad y la hospitalidad.
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

        
      </main>
    </div>
  );
};

export default QuienesSomos;
