import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";


export const FormularioMatricula = ({ matricula }) => {

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        codigo: matricula?.codigo ?? "",
        descripcion: matricula?.descripcion ?? "",
        id_estudiante: matricula?.id_estudiante?._id ?? "",  // Aquí se extrae solo el _id
        id_materia: matricula?.id_materia?._id ?? "",  // Aquí se extrae solo el _id
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (matricula?._id) {
            const token = localStorage.getItem('token')
            const url = `http://localhost:5000/api/matricula/actualizar/${matricula?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/matriculas')
        }
        else {
            try {
                const token = localStorage.getItem('token')
                const url = `http://localhost:5000/api/matricula/registro`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                setMensaje({ respuesta: "matricula registrada con exito", tipo: true })
                setTimeout(() => {
                    navigate('/dashboard/matriculas');
                }, 3000);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            }
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='codigo:'
                    className='text-gray-700 uppercase font-bold text-sm'>Codigo de la matricula: </label>
                <input
                    id='codigo'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='codigo de la matricula'
                    value={form.codigo}
                    name='codigo'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='descripcion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Descripcion: </label>
                <input
                    id='descripcion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='descripcion de la materia'
                    value={form.descripcion}
                    name='descripcion'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='id_estudiante:'
                    className='text-gray-700 uppercase font-bold text-sm'>ID del Estudiante: </label>
                <input
                    id='id_estudiante'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='ID del estudiante'
                    value={form.id_estudiante}
                    name='id_estudiante'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='id_materia:'
                    className='text-gray-700 uppercase font-bold text-sm'>ID de la materia: </label>
                <input
                    id='id_materia'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='ID de la materia'
                    value={form.id_materia}
                    name='id_materia'
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className='bg-green-800 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={matricula?._id ? 'Actualizar matricula' : 'Registrar matricula'} />

        </form>

    )
}