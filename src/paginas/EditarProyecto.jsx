import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormularioProyecto from '../components/FormularioProyecto'
import useProyectos from "../hooks/useProyectos"
import { Link } from 'react-router-dom';

const EditarProyecto = () => {
  const params = useParams();
  const { obtenerProyecto, proyecto, cargando, eliminarProyecto } = useProyectos()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  const handleClick = () => {
    if (confirm('Do you want to delete this project?')) {
      eliminarProyecto(params.id)
    }
  }

  const { nombre } = proyecto

  if (cargando) return 'Charging...'

  return (
    <>

      <div className='flex items-center gap-2 text-gray-400 hover:text-black pb-4'>
        <Link
          to={`/projects/${params.id}`}
          className='uppercase font-bold flex items-center gap-1' // Agrega flex aquí para que los elementos hijos se distribuyan horizontalmente
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 512 512" stroke="currentColor">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
          </svg>
          <span>Go back</span>
        </Link>
      </div>

      <div className='flex justify-between'>
        <h1 className='font-black text-4xl'>Edit Project: {nombre}</h1>

        <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <button
            className='uppercase font-bold'
            onClick={handleClick}
          >Delete</button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  )
}

export default EditarProyecto