import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [charging, setCharging] = useState(false);
  const [taskFormModal, setTaskFormModal] = useState(false);
  const [task, setTask] = useState({});
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [collaborator, setCollaborator] = useState({});
  const [deleteCollaboratorModal, setDeleteCollaboratorModal] = useState(false);

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

      // Synchronize projects
      const updatedProjects = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );

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
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
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
      setProjects(updatedProjects);

      // Show alert
      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 4000);
    } catch (error) {}
  };

  const handleTaskModal = () => {
    setTaskFormModal(!taskFormModal);
    setTask({});
  };

  const submitTask = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/tareas", task, config);

      // Add the task to the state
      const updatedProject = { ...project };
      updatedProject.tareas = [...project.tareas, data];

      setProject(updatedProject);
      setAlert({});
      setTaskFormModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task) => {
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
        `/tareas/${task.id}`,
        task,
        config
      );

      const updatedProject = { ...project };
      updatedProject.tareas = updatedProject.tareas.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );
      setProject(updatedProject);
      setAlert({});
      setTaskFormModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTaskModal = (task) => {
    setTask(task);
    setTaskFormModal(true);
  };

  const handleDeleteTaskModal = (task) => {
    setTask(task);
    setDeleteTaskModal(!deleteTaskModal);
  };

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/tareas/${task._id}`, config);
      setAlert({
        msg: data.msg,
        error: false,
      });

      const updatedProject = { ...project };
      updatedProject.tareas = updatedProject.tareas.filter(
        (taskState) => taskState._id !== task._id
      );

      setProject(updatedProject);
      setDeleteTaskModal(false);
      setTask({});

      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitCollaborator = async (email) => {
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

      const { data } = await clientAxios.post(
        "/proyectos/colaboradores",
        { email },
        config
      );

      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCharging(false);
    }
  };

  const addCollaborator = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/collaborators/${project._id}`,
        { email },
        config
      );

      setAlert({
        msg: data.msg,
        error: false,
      });

      setCollaborator({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handleDeleteCollaboratorModal = () => {
    setDeleteCollaboratorModal(!deleteCollaboratorModal);
    setCollaborator(collaborator)
  };

  const deleteCollaborator = () => {

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
        handleTaskModal,
        submitTask,
        handleEditTaskModal,
        task,
        deleteTaskModal,
        handleDeleteTaskModal,
        deleteTask,
        submitCollaborator,
        collaborator,
        addCollaborator,
        handleDeleteCollaboratorModal,
        deleteCollaboratorModal,
        deleteCollaborator
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
