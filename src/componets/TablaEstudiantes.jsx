import { useEffect, useState, useContext } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";

const TablaEstudiantes = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [estudiantes, setEstudiantes] = useState([])

    const listarEstudiantes = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `http://localhost:5000/api/estudiante`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setEstudiantes(respuesta.data, ...estudiantes)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a cambiar el estado de un estudiante, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `http://localhost:5000/api/estudiante/eliminar/${id}`
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                const data = {
                    salida: new Date().toString()
                }
                await axios.delete(url, { headers, data });
                listarEstudiantes()
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEstudiantes()
    }, [])


    return (
        <>
            {
                estudiantes.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros de estudiantes'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-blue-900 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido</th>
                                <th className='p-2'>Cedula</th>
                                <th className='p-2'>Telefono</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Estado</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                estudiantes.map((estudiante, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={estudiante._id}>
                                        <td>{index + 1}</td>
                                        <td>{estudiante.nombre}</td>
                                        <td>{estudiante.apellido}</td>
                                        <td>{estudiante.cedula}</td>
                                        <td>{estudiante.telefono}</td>
                                        <td>{estudiante.email}</td>
                                        <td>
                                            <span className="bg-blue-100 text-pink-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{estudiante.status && "activo"}</span>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                onClick={() => navigate(`/dashboard/visualizar_estudiante/${estudiante._id}`)}
                                            />

                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/actualizar_estudiante/${estudiante._id}`)} />

                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                onClick={() => { handleDelete(estudiante._id) }}
                                            />


                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
            }
        </>
    )
}

export default TablaEstudiantes