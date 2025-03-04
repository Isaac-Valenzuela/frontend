import React from 'react'
import TablaMaterias from '../componets/TablaMaterias'
import { useNavigate } from 'react-router-dom'

const Materias = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Gestion de Materias</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite gestionar materias</p>
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-green-600 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/registrar_materias/`)}>Registrar</button>
            <br />
            <TablaMaterias/>
        </div>
    )
}

export default Materias