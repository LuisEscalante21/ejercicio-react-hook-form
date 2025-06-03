import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useGameAction = (getGames) => {
  const navigate = useNavigate();

  //funcion para eliminar un videojuego por su id
  // se usa async/await para manejar la asincronía de la llamada a la API
  const deleteGame = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      toast.success("Game deleted successfully");
      console.log("Game deleted:", response);
      getGames();
    } catch (error) {
      console.error("Error deleting game:", error);
      toast.error("Failed to delete game");
    } finally {
      getGames();
    }
  };
  
  const handleUpdateGame = (id) => {
    navigate(`/games/${id}`);
  };

  return {
    deleteGame,
    handleUpdateGame,
  };
};

export default useGameAction;