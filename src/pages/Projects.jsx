import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects } = useProjects();

  return (
    <>
      <h1 className="teext-4xl font-black">Proyects</h1>

      <div></div>
    </>
  );
};

export default Projects;
