import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";

//hook para separar la logica de obtencion de videojuegos

const useFetchGame = () => {
  //state para almacenar los datos de los videojuegos
  const [dataGame, setDataGame] = useState([]);

  //funcion para obtener los videojuegos desde la API
  //se usa useCallback para evitar que la funcion se vuelva a crear en cada renderizado

  const getGames = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        toast.error("Failed to fetch games");
        throw new Error("Failed to fetch games");
      }
      const data = await response.json();
      setDataGame(data);
    } catch (error) {
      console.error("Error fetching games:", error);
      toast.error("Error fetching games");
    }
  };

  //funcion para obtener un videojuego por su id
  //se usa async/await para manejar la asincronía de la llamada a la API

  const getGameById = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        console.log("Failed to fetch game");
        throw new Error("Failed to fetch game");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching game:", error);
      console.log("Failed to fetch game");
      return null;
    }
  };

  //useEffect para llamar a getGames cuando el componente se monta
  useEffect(() => {
    getGames();
  }, []);

  //retornar los datos y las funciones para ser usados en otros componentes
  return {
    dataGame,
    setDataGame,
    getGames,
    getGameById,
  };
};

export default useFetchGame;