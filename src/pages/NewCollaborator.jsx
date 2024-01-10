import { useEffect } from "react";
import CollaboratorForm from "../components/CollaboratorForm";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";

const NewCollaborator = () => {
  const { getProject, project, charging, collaborator, addCollaborator } =
    useProjects();
  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (charging) return "charging...";

  return (
    <>
      <h1 className="text-4xl font-black">
        Add Collaborator to Project: {project.nombre}
      </h1>

      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>

      {charging ? (
        <p className="text-center"> charging... </p>
      ) : (
        collaborator?._id && (
          <div className="flex justify-center">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">Answer:</h2>
              <div className="flex justify-between items-center">
                <p>{collaborator.nombre}</p>

                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() =>
                    addCollaborator({
                      email: collaborator.email,
                    })
                  }
                >
                  Add to project
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NewCollaborator;
