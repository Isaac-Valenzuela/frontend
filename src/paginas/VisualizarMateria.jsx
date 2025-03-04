import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';

const VisualizarMateria = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const [materias, setMateria] = useState({})
    const [mensaje, setMensaje] = useState({})


    useEffect(() => {
        const consultarMateria = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `http://localhost:5000/api/materias/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setMateria(respuesta.data.materias)
                console.log(respuesta)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarMateria()
    }, [])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Materia</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos de una materia</p>
            </div>
            <div>
                {
                    Object.keys(materias).length != 0 ?
                        (
                            <>
                                <div className='m-5 flex justify-between'>
                                    <div>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* ID de la materia: </span>
                                            {materias._id}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Nombre de la materia: </span>
                                            {materias.nombre}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Codigo de la materia: </span>
                                            {materias.codigo}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Descripcion: </span>
                                            {materias.descripcion}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Creditos: </span>
                                            {materias.creditos}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Estado: </span>
                                            <span className="bg-blue-100 text-red-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{materias.status && "activo"}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="data:image/png;base64,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" alt="dogandcat" className='h-80 w-80' />
                                    </div>
                                </div>
                                <hr className='my-4' />
                                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                                <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/materias`)}>Regresar</button>
                            </>

                        )
                        :
                        (
                            Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                        )
                }
            </div>
        </>

    )
}

export default VisualizarMateria