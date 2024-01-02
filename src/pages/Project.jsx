import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";

const Project = () => {
  const params = useParams();
  const { getProject, project, charging } = useProjects;

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { nombre } = project;

  return charging ? (
    ""
  ) : (
    <div>
      <h1 className="font-black text-4xl">{nombre}</h1>
    </div>
  );
};

export default Project;
