import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import TaskFormModal from "../components/TaskFormModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import Task from "../components/Task";
import Alert from "../components/Alert";

const Project = () => {
  const params = useParams();
  const { getProject, project, charging, handleTaskModal } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { nombre } = project;

  if (charging) return "...Charging";

  const { msg } = alert;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>

          <Link
            to={`/projects/edit/${params.id}`}
            className="uppercase font-bold"
          >
            Edit
          </Link>
        </div>

        <button
          onClick={handleTaskModal}
          type="button"
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          New Task
        </button>

        <p className="font-bold text-xl mt-10">Project Tasks</p>

        <div className="flex justify-center">
          <div className="w-full md:w-1/3 lg:w-1/4">
            {msg && <Alert alert={alert} />}
          </div>
        </div>

        <div className="bg-white shadow mt-10 rounded-lg">
          {project.tareas.length ? (
            project.tareas?.map((task) => <Task key={task._id} task={task} />)
          ) : (
            <p>There are no tasks in this project</p>
          )}
        </div>

        <TaskFormModal />
        <DeleteTaskModal />
      </div>
    </>
  );
};

export default Project;
