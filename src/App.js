
import './App.css';
import Footer from './components/Footer/Footer';
import Inicio from './components/Inicio/Inicio';
import RegistrarHotelForm from './components/Registrar/Registrar';

import MyNavbar from './components/Navbar/MyNavbar';
import { Route, Routes } from 'react-router';
import Login from './components/Login/Login';
import { useState } from 'react';
import QuienesSomos from './components/QuienesSomos/Quienessomos';
import Registrate from './components/Login/RegistrarLogin';
import Recuperarkey from './components/Login/RecuperarKey';
import HotelService from './components/Servicios/Servicios';
import Contactanos from './components/Contactenos/Contactenos';
import CardService from './components/Servicios/CardService';
import PerfilUsuario from './components/Usuarios/UsuarioHome/PerfilUsuario';
import AgregarUsuarioReserva from './components/Usuarios/UsuarioTerminarRegistro/AgregarUsuarioReserva';

const App =()=> {
  const [valUser, setvalUser] = useState(true)
  return (
    <div className="App">
     { valUser ? <header>
                      <MyNavbar/> 
                </header> 
              :null
    }
      <div>
     {/*<h1>DESARROLLO WEB</h1>  <br/>*/} 
     
      <Routes>

      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<RegistrarHotelForm />} />
      <Route path="/registrate" element={<Login />} />
      <Route path="/quienessomos" element={<QuienesSomos />} />
      <Route path="/reistronuevousuario" element={<Registrate />} />
      <Route path="/rkey" element={<Recuperarkey />} />
      <Route path="/Servicios" element={<HotelService />} />
      <Route path="/Contáctenos" element={<Contactanos />} />
      <Route path="/detalle-paquete" element={<CardService />} />
      <Route path="/PerfilUsuario" element={<PerfilUsuario />} />
      <Route path="/AddUsuarioPaquete" element={<AgregarUsuarioReserva />} />


      </Routes>
     
      
     
          
          
            
          
        </div>
        { valUser 
                 ?<Footer />
                 :null}
    </div>
  );
}

export default App;
