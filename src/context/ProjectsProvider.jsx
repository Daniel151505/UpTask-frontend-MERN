import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [charging, setCharging] = useState(false);
  const [taskFormModal, setTaskFormModal] = useState(false)

  const navigate = useNavigate();

  // Obtain all the projects
  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios.get("/proyectos", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  //Edit project
  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(
        `/proyectos/${project.id}`,
        project,
        config
      );

      console.log(data,'perra puta')
      // Synchronize projects
      const updatedProjects = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );

      console.log(updatedProjects, 'sopita')
      setProjects(updatedProjects);

      // Show alert
      setAlert({
        msg: "Project Updated Successfully",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  //Create new project
  const newProject = async (project) => {
    console.log(project)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/proyectos", project, config);

      setProjects([...projects, data]);

      setAlert({
        msg: "Project Created Successfully",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  //Obtain only one project
  const getProject = async (id) => {
    setCharging(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios(`/proyectos/${id}`, config);
      setProject(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCharging(false);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Deleting project
      const { data } = await clientAxios.delete(`/proyectos/${id}`, config);

      // Synchronize projects
      const updatedProjects = projects.filter(
        (projectState) => projectState._id !== id
      );
      setProjects(updatedProjects)

      console.log(updatedProjects)
      // Show alert
      setAlert({
        msg: data.msg,
        error: false,
      });

      console.log('hola')

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 4000);

      console.log('zorra')
    } catch (error) {}
  };

  const handleTaskModal = () => {
    setTaskFormModal(!taskFormModal)
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        charging,
        deleteProject,
        taskFormModal,
        handleTaskModal
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
