import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';

const VisualizarEstudiante = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const [estudiante, setEstudiante] = useState({})
    const [mensaje, setMensaje] = useState({})


    useEffect(() => {
        const consultarEstudiante = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `http://localhost:5000/api/estudiante/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setEstudiante(respuesta.data.estudiante)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarEstudiante()
    }, [])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Estudiante</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos del estudiante</p>
            </div>
            <div>
                {
                    Object.keys(estudiante).length != 0 ?
                        (
                            <>
                                <div className='m-5 flex justify-between'>
                                    <div>
                                    <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* ID del estudiante: </span>
                                            {estudiante._id}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Nombre del estudiante: </span>
                                            {estudiante.nombre}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Apellido del estudiante: </span>
                                            {estudiante.apellido}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Cedula del estudiante: </span>
                                            {estudiante.cedula}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Fecha de nacimiento: </span>
                                            {estudiante.fecha_nacimiento}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Ciudad: </span>
                                            {estudiante.ciudad}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Direccion: </span>
                                            {estudiante.direccion}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Telefono: </span>
                                            {estudiante.telefono}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Email: </span>
                                            {estudiante.email}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Estado: </span>
                                            <span className="bg-blue-100 text-red-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{estudiante.status && "activo"}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="data:image/png;base64,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" alt="dogandcat" className='h-80 w-80' />
                                    </div>
                                </div>
                                <hr className='my-4' />
                                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                                <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/`)}>Regresar</button>
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

export default VisualizarEstudiante