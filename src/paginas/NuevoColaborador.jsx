import { useEffect } from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyectos from '../hooks/useProyectos';
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta';

const NuevoColaborador = () => {

  const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos()
  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, []);


  if (!proyecto?._id) return <Alerta alerta={alerta} />

  return (
    <>

      <div className='flex items-center gap-2 text-gray-400 hover:text-black pb-4'>
        <Link
          to={`/projects/${params.id}`}
          className='uppercase font-bold flex items-center gap-1'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 512 512" stroke="currentColor">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
          </svg>
          <span>Go back</span>
        </Link>
      </div>

      <h1 className="text-4xl font-black">Add Collaborator to the Project: {proyecto.nombre}</h1>


      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>


      {cargando ? <p className="text-center">charging...</p> : colaborador?._id && (
        <div className='flex justify-center mt-10'>
          <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full'>
            <h2 className='text-center mb-10 text-2xl font-bold'>Result:</h2>

            <div className='flex justify-between items-center'>
              <p>{colaborador.nombre}</p>

              <button
                type="button"
                className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
                onClick={() => agregarColaborador({
                  email: colaborador.email
                })}
              >Add to Project</button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default NuevoColaborador