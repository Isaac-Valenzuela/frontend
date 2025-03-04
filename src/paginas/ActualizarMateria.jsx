import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensajes';
import axios from 'axios';
import { FormularioMateria } from '../componets/FormularioMateria';



const ActualizarMateria = () => {
    const { id } = useParams()
    const [materias, setMateria] = useState({})
    const [mensaje, setMensaje] = useState({})
    const navigate = useNavigate()

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
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarMateria()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Materia</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de una materia registrado</p>
            {
                Object.keys(materias).length != 0 ?
                    (
                        <FormularioMateria materias={materias}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
            <br />
            <button className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => navigate(`/dashboard/materias`)}>Regresar</button>
        </div>

    )
}

export default ActualizarMateria