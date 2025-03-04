import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensajes';
import axios from 'axios';
import { FormularioEstudiante } from '../componets/FormularioEstudiante';



const ActualizarEstudiante = () => {
    const { id } = useParams()
    const [estudiante, setEstudiante] = useState({})
    const [mensaje, setMensaje] = useState({})
    const navigate = useNavigate()

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
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Estudiante</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de un estudiante registrado</p>
            {
                Object.keys(estudiante).length != 0 ?
                    (
                        <FormularioEstudiante estudiante={estudiante}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
            <br />
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/`)}>Regresar</button>
        </div>

    )
}

export default ActualizarEstudiante