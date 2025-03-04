import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";


export const FormularioEstudiante = ({ estudiante }) => {

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        nombre: estudiante?.nombre ?? "",
        apellido: estudiante?.apellido ?? "",
        cedula: estudiante?.cedula ?? "",
        fecha_nacimiento: new Date(estudiante?.fecha_nacimiento).toLocaleDateString('en-CA', { timeZone: 'UTC' }) ?? "",
        ciudad: estudiante?.ciudad ?? "",
        direccion: estudiante?.direccion ?? "",
        telefono: estudiante?.telefono ?? "",
        email: estudiante?.email ?? "",
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (estudiante?._id) {
            const token = localStorage.getItem('token')
            const url = `http://localhost:5000/api/estudiante/actualizar/${estudiante?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard')
        }
        else{
            try {
                const token = localStorage.getItem('token')
                const url = `http://localhost:5000/api/estudiante/registro`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                setMensaje({ respuesta: "estudiante registrado con exito", tipo: true })
                setTimeout(() => {
                    navigate('/dashboard');
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
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del estudiante: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del estudiante'
                    value={form.nombre}
                    name='nombre'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='apellido:'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido del estudiante: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='apellido del estudiante'
                    value={form.apellido}
                    name='apellido'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='cedula:'
                    className='text-gray-700 uppercase font-bold text-sm'>Cedula: </label>
                <input
                    id='cedula'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='cedula del estudiante'
                    value={form.cedula}
                    name='cedula'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='fecha_nacimiento:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de Nacimiento: </label>
                <input
                    id='fecha_nacimiento'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='fecha nacimiento'
                    name='fecha_nacimiento'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='ciudad:'
                    className='text-gray-700 uppercase font-bold text-sm'>Ciudad del estudiante: </label>
                <input
                    id='ciudad'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='ciudad del estudiante'
                    value={form.ciudad}
                    name='ciudad'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='direccion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Direccion del estudiante: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='direccion del estudiante'
                    value={form.direccion}
                    name='direccion'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='telefono:'
                    className='text-gray-700 uppercase font-bold text-sm'>Telefono: </label>
                <input
                    id='telefono'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='telefono del propietario'
                    value={form.telefono}
                    name='telefono'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email del estudiante'
                    value={form.email}
                    name='email'
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className='bg-green-800 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                    value={estudiante?._id ? 'Actualizar estudiante' : 'Registrar estudiante'} />

        </form>

    )
}