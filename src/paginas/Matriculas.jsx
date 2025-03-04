import React from 'react'
import TablaMatriculas from '../componets/TablaMatriculas'
import { useNavigate } from 'react-router-dom'

const Matriculas = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Gestion de Matriculas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite gestionar matriculas</p>
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-green-600 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/registrar_matriculas/`)}>Registrar</button>
            <br />
            <TablaMatriculas/>
        </div>
    )
}

export default Matriculas