import CollaboratorForm from "../components/CollaboratorForm";

const NewCollaborator = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Add Collaborator</h1>

      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>
    </>
  );
};

export default NewCollaborator;
