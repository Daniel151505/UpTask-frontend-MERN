import useProyectos from "../hooks/useProyectos";

const Colaborador = ({ colaborador }) => {
    const { handleModalEliminarColaborador } = useProyectos();

    const { nombre, email } = colaborador;

    return (
        <div className="border-b p-5 flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
                <p>{nombre}</p>
                <p className="text-sm text-gray-700">{email}</p>
            </div>

            <div>
                <button
                    type="button"
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleModalEliminarColaborador(colaborador)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Colaborador;
