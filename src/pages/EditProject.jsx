import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { useEffect } from "react";
import FormProject from "../components/FormProject";

const EditProject = () => {
  const params = useParams();
  const { getProject, project, charging } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { nombre } = project;

  if (charging) return "Charging...";

  return (
    <>
      <h1 className="text-4xl font-black">Edit Proyect: {nombre}</h1>

      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
    </>
  );
};

export default EditProject;
