import React from 'react';
import './Loading.css'; // Asegúrate de crear este archivo para los estilos
import imagen from '../img/loading/238a465012f48c55b9c96c351be7eadd_w200.gif'

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={imagen} alt="Cargando..." className="loading-image" />
    </div>
  );
};

export default Loading;