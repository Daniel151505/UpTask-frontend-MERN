import { formatDate } from "../helpers/formatDate";
import useAdmin from "../hooks/useAdmin";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
  const { handleEditTaskModal, handleDeleteTaskModal, completeTask } =
    useProjects();
  const admin = useAdmin();
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = task;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatDate(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">{prioridad}</p>
      </div>

      <div className="flex gap-2">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleEditTaskModal(task)}
          >
            Edit
          </button>
        )}
        <button
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completeTask(_id)}
        >
          {estado ? "Complete" : "Incomplete"}
        </button>

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleDeleteTaskModal(task)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
