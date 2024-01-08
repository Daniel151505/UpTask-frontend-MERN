import { useEffect } from "react";
import CollaboratorForm from "../components/CollaboratorForm";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";

const NewCollaborator = () => {
  const { getProject, project, charging } = useProjects();
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
    </>
  );
};

export default NewCollaborator;
