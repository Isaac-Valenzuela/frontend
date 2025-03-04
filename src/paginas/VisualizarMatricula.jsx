import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';

const VisualizarMatricula = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const [matricula, setMatriculas] = useState({})
    const [mensaje, setMensaje] = useState({})


    useEffect(() => {
        const consultarMatricula = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `http://localhost:5000/api/matricula/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                console.log("Respuesta API:", respuesta.data); // ✅ Verifica qué datos llegan
                if (respuesta.data) {
                    setMatriculas(respuesta.data);
                } else {
                    setMatriculas({}); // ✅ Evita que sea undefined
                }
            } catch (error) {
                console.error("Error en la API:", error);
                setMensaje({ respuesta: error.response?.data?.msg || "Error desconocido", tipo: false });
            }
        };
        consultarMatricula();
    }, []);
    

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Matricula</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos de una matricula</p>
            </div>
            <div>
                {
                     matricula && Object.keys(matricula).length > 0 ?
                        (
                            <>
                                <div className='m-5 flex justify-between'>
                                    <div>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* ID de la matricula: </span>
                                            {matricula._id}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Codigo de la matricula: </span>
                                            {matricula.codigo}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Descripcion: </span>
                                            {matricula.descripcion}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* ID del estudiante: </span>
                                            {matricula.id_estudiante?._id}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Nombre del estudiante: </span>
                                            {`${matricula.id_estudiante?.nombre} ${matricula.id_estudiante?.apellido}`}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* ID de la materia: </span>
                                            {matricula.id_materia?._id}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Nombre de la materia: </span>
                                            {matricula.id_materia?.nombre}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Estado: </span>
                                            <span className="bg-blue-100 text-red-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{matricula.estado && "activo"}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="data:image/png;base64,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" alt="dogandcat" className='h-80 w-80' />
                                    </div>
                                </div>
                                <hr className='my-4' />
                                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                                <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/matriculas`)}>Regresar</button>
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

export default VisualizarMatricula