import { Link } from "react-router-dom";
import Titulo from "../components/Titulos";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { genreOptions, difficultyOptions, platformOptions } from "../utils/apiUrl";
import useDataGame from "../hooks/games/useDataGame";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const Games = () => {
  const { id } = useParams();
  const methods = useForm();
  const { register, handleSubmit, errors } = useDataGame(methods);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/home"
        className="text-2xl font-bold text-gray-900 mb-4 bg-cyan-400 p-2 rounded w-auto text-center hover:bg-cyan-200 transition-colors"
      >
        Back To Game Dashboard
      </Link>

      <form
        onSubmit={handleSubmit}
        className="border-b border-gray-900/10 pb-12 bg-white shadow-md rounded-lg flex flex-col p-4"
      >
        <Titulo titulo="Game Information" />

        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Game Name */}
          <InputText
            type="text"
            name="juego"
            label="Game Name"
            placeholder="Enter the game name (e.g., Striker)"
            register={register}
            error={errors.juego?.message}
          />

          {/* Genre */}
          <SelectInput
            label="Genre"
            name="genero"
            options={genreOptions}
            register={register}
            error={errors.genero?.message}
          />

          {/* Difficulty */}
          <SelectInput
            label="Difficulty"
            name="dificultad"
            options={difficultyOptions}
            register={register}
            error={errors.dificultad?.message}
          />

          {/* Platform */}
          <SelectInput
            label="Platform"
            name="plataforma"
            options={platformOptions}
            register={register}
            error={errors.plataforma?.message}
          />

          {/* Release Year */}
          <InputText
            type="number"
            name="lanzamiento"
            label="Release Year"
            placeholder="Enter release year (e.g., 2019)"
            register={register}
            error={errors.lanzamiento?.message}
            min="1970"
            max="2030"
          />
        </div>
        
        <div className="mt-6 flex justify-start">
          <Button 
            type="submit" 
            text={id ? "Update Game" : "Save Game"} 
          />
        </div>
      </form>
    </div>
  );
};

export default Games;