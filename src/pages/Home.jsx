import { Link } from "react-router-dom";
import Titulo from "../components/Titulos";
import Button from "../components/Button";
import { genreOptions, difficultyOptions, platformOptions } from "../utils/apiUrl";
import useFetchGames from "../hooks/games/useFetchGames"; 
import useGameAction from "../hooks/games/useGameAction";
import ButtonDelete from "../components/ButtonDelete";

const Home = () => {
  const { dataGame, getGames } = useFetchGames(); 
  const { deleteGame, handleUpdateGame } = useGameAction(getGames); 

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/games"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-400 p-2 rounded w-full text-center hover:bg-green-200 transition-colors block mb-6"
      >
        Agregar juego
      </Link>

      <Titulo titulo="Información de juegos" /> 
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="px-4 py-2 border-b">Juego</th>
              <th className="px-4 py-2 border-b">Género</th>
              <th className="px-4 py-2 border-b">Dificultad</th>
              <th className="px-4 py-2 border-b">Plataforma</th>
              <th className="px-4 py-2 border-b">Lanzamiento</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataGame?.map((game) => ( 
              <tr
                key={game.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{game.juego}</td> 
                <td className="px-4 py-2">{genreOptions.find((opt) => opt.value === game.genero)
                    ?.label || "Sin asignar"}</td> 
                <td className="px-4 py-2">{difficultyOptions.find((opt) => opt.value === game.dificultad)
                    ?.label || "Sin asignar"}</td> 
                <td className="px-4 py-2">{platformOptions.find((opt) => opt.value === game.plataforma)
                    ?.label || "Sin asignar"}</td> 
                <td className="px-4 py-2">{game.lanzamiento}</td> 
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    text="Editar"
                    onClick={() => handleUpdateGame(game.id)}
                  />

                  <ButtonDelete
                    text="Eliminar"
                    onClick={() => deleteGame(game.id)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
