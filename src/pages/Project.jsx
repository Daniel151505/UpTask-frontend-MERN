import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";

const Project = () => {
  const params = useParams();
  const { getProject, project, charging } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { nombre } = project;

  if (charging) return '...Charging'

  return (
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
    </div>
  );
};

export default Project;