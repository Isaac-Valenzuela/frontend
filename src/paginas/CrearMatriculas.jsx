import React from 'react'
import { FormularioMatricula } from '../componets/FormularioMatricula'
import { useNavigate } from 'react-router-dom'

const CrearMatricula = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Gestion de Matriculas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te perimte registrar matriculas</p>
            <FormularioMatricula/>
            <br />
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/matriculas`)}>Regresar</button>
        </div>
    )
}

export default CrearMatricula