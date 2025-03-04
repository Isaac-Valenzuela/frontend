import { useEffect, useState, useContext } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";

const TablaMaterias = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [materias, setMaterias] = useState([])

    const listarMaterias = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `http://localhost:5000/api/materias`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setMaterias(respuesta.data, ...materias)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a cambiar el estado de una materia, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `http://localhost:5000/api/materias/eliminar/${id}`
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                const data = {
                    salida: new Date().toString()
                }
                await axios.delete(url, { headers, data });
                listarMaterias()
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarMaterias()
    }, [])


    return (
        <>
            {
                materias.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros de materias'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-blue-900 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Codigo</th>
                                <th className='p-2'>Creditos</th>
                                <th className='p-2'>Estado</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                materias.map((materia, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={materia._id}>
                                        <td>{index + 1}</td>
                                        <td>{materia.nombre}</td>
                                        <td>{materia.codigo}</td>
                                        <td>{materia.creditos}</td>
                                        <td>
                                            <span className="bg-blue-100 text-pink-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{materia.status && "activo"}</span>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                onClick={() => navigate(`/dashboard/visualizar_materia/${materia._id}`)}
                                            />

                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/actualizar_materia/${materia._id}`)} />

                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                onClick={() => { handleDelete(materia._id) }}
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

export default TablaMaterias