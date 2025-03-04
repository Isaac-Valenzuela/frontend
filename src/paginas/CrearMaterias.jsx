import React from 'react'
import { FormularioMateria } from '../componets/FormularioMateria'
import { useNavigate } from 'react-router-dom'

const CrearMateria = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Gestion de Materias</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te perimte registrar materias</p>
            <FormularioMateria/>
            <br />
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/materias`)}>Regresar</button>
        </div>
    )
}

export default CrearMateria