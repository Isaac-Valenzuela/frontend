import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";


export const FormularioMateria = ({ materias }) => {

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        nombre: materias?.nombre ?? "",
        codigo: materias?.codigo ?? "",
        descripcion: materias?.descripcion ?? "",
        creditos: materias?.creditos ?? "",
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (materias?._id) {
            const token = localStorage.getItem('token')
            const url = `http://localhost:5000/api/materias/actualizar/${materias?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/materias')
        }
        else{
            try {
                const token = localStorage.getItem('token')
                const url = `http://localhost:5000/api/materias/registro`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                setMensaje({ respuesta: "materia registrada con exito", tipo: true })
                setTimeout(() => {
                    navigate('/dashboard/materias');
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
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre de la materia: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre de la materia'
                    value={form.nombre}
                    name='nombre'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='codigo:'
                    className='text-gray-700 uppercase font-bold text-sm'>Codigo de la materia: </label>
                <input
                    id='codigo'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='codigo de la materia'
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
                    htmlFor='creditos:'
                    className='text-gray-700 uppercase font-bold text-sm'>Creditos: </label>
                <input
                    id='creditos'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='creditos de la materia'
                    value={form.creditos}
                    name='creditos'
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className='bg-green-800 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                    value={materias?._id ? 'Actualizar materia' : 'Registrar materia'} />

        </form>

    )
}