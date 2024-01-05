import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormProject = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [client, setClient] = useState("");

  const params = useParams();
  const { showAlert, alert, submitProject, project } = useProjects();

  useEffect(() => {
    if (params.id) {
      setId(project._id);
      setName(project.nombre);
      setDescription(project.descripcion);
      setDeadline(project.fechaEntrega?.split("T")[0]);
      setClient(project.cliente);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deadline, client].includes("")) {
      showAlert({
        msg: "All the fields are required",
        error: true,
      });

      return;
    }

    //Pass the data to the provider
    await submitProject({
      id,
      nombre: name,
      descripcion: description,
      fechaEntrega: deadline,
      cliente: client,
    });

    setId(null);
    setName("");
    setDescription("");
    setDeadline("");
    setClient("");
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Enter the project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Enter the description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="deadline"
        >
          Deadline
        </label>
        <input
          id="deadline"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Enter the deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="client"
        >
          Client Name
        </label>
        <input
          id="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Enter the client name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? "Update Project" : "Create Project"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormProject;
