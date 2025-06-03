import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SubTitulo from "../components/SubTitulo";
import "./styles/Welcome.css"

const Welcome = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Animación de entrada después de montar el componente
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setShowWelcome(false);
    navigate("/home");
  };

  if (!showWelcome) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Fondo de estrellas animadas */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Gradiente superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black opacity-70"></div>

      {/* Efectos de luz */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className={`transform transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
          
          {/* Contenedor principal con efecto de cristal */}
          <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center border border-white border-opacity-20">
            
            {/* Efecto de brillo en los bordes */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            
            {/* Contenido interno */}
            <div className="relative">
              {/* Título con efecto neón */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
                  BIENVENIDO
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
              </div>

              {/* Subtítulo con animación de escritura */}
              <div className="mb-8">
                <SubTitulo titulo="Aplicación CRUD Cinematográfica" />
              </div>

              {/* Descripción */}
              <p className="mb-8 text-gray-300 text-lg leading-relaxed">
                🎬 Prepárate para una experiencia épica con nuestra aplicación CRUD
                <br />
                <span className="text-cyan-400 font-semibold">¡La aventura comienza ahora!</span>
              </p>

              {/* Botón usando el componente original */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative">
                  <Button 
                    type="button" 
                    onClick={handleAccept} 
                    text="🎥 COMENZAR AVENTURA"
                  />
                </div>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -top-6 -left-6 w-12 h-12 border-l-4 border-t-4 border-cyan-400 rounded-tl-lg"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r-4 border-b-4 border-purple-400 rounded-br-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;