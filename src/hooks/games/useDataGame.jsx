import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl"; // URL de la API
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchGame from "./useFetchGames";

const useDataGame = (methods) => {
  const [dataGame, setDataGame] = useState([]);
  const { getGameById, getGames } = useFetchGame();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  // save game form
  // funcion para guardar el formulario de videojuego y enviar los datos a la API
  const saveGameForm = async (dataForm) => {
    try {
      // enviar la solicitud POST a la API
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if(!response.ok) {
        toast.error("Failed to add game");
        throw new Error("Failed to add game");
      }
      toast.success("Game saved successfully");
      navigate("/home"); // Redirigir a la página de inicio después de guardar
    } catch (error) {
      console.log("Error al enviar:", error);
    } finally {
      reset(); // reiniciar el formulario después de enviar
      getGames(); // obtener la lista actualizada de videojuegos
    }
  };

  // Función para editar un videojuego
  // Esta función se llama cuando se envía el formulario de edición
  // y envía una solicitud PUT a la API para actualizar los datos del videojuego

  const editGame = async (dataForm) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Failed to update game");
        throw new Error("Failed to update game");
      }
      toast.success("Game updated successfully");
      navigate("/home"); // Redirect to home after updating
    } catch (error) {
      console.error("Error updating game:", error);
      toast.error("Failed to update game");
    } finally {
      reset(); // Reset the form after submission
      getGames(); // Refresh the games list after updating
    }
  };

  // Esta función se llama cuando se envía el formulario
  // y decide si guardar un nuevo videojuego o editar uno existente
  // dependiendo de si hay un id presente en los parámetros de la URL
  // Si hay un id, se llama a editGame, de lo contrario se llama a saveGameForm

  const handleGameAction = (dataForm) => {
    if (id) {
      editGame(dataForm);
    } else {
      saveGameForm(dataForm);
    }
  };

  // Función para manejar la actualización de un videojuego
  // Esta función se llama cuando se hace clic en el botón de editar
  // y redirige al usuario a la página de edición del videojuego
  // pasando el id del videojuego como parámetro en la URL
  const handleUpdateGame = (id) => {
    navigate(`/games/${id}`);
  };

  // Cargar los datos del videojuego por id
  // Esta función se llama para obtener los datos del videojuego cuando el componente se monta o cuando cambia el id
  const loadGame = async () => {
    if (id) {
      const game = await getGameById(id);
      if (game) {
        reset({
          juego: game?.juego,
          genero: game?.genero,
          dificultad: game?.dificultad,
          plataforma: game?.plataforma,
          lanzamiento: game?.lanzamiento,
        });
      }
    }
  };

  // useEffect para cargar los datos del videojuego cuando el componente se monta o cuando cambia el id
  useEffect(() => {
    loadGame();
  }, [id]); // Dependencia en id para recargar los datos si cambia

  return {
    dataGame,
    setDataGame,
    register,
    handleSubmit: handleSubmit(handleGameAction),
    errors,
    getGameById,
    handleUpdateGame,
    loadGame,
  };
};

export default useDataGame;