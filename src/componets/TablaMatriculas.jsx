import { useEffect, useState, useContext } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import Mensaje from "./Alertas/Mensajes";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const TablaMatriculas = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [matricula, setMatricula] = useState([]);
    const [cargando, setCargando] = useState(true); // Nuevo estado para indicar carga

    const listarMatriculas = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No se encontró un token.");
                return;
            }
            const url = `http://localhost:5000/api/matricula`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            console.log("Datos recibidos:", respuesta.data); // Depuración
            setMatricula(respuesta.data);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        } finally {
            setCargando(false); // Finaliza la carga
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm(
                "Vas a cambiar el estado de una matrícula, ¿Estás seguro de realizar esta acción?"
            );
            if (confirmar) {
                const token = localStorage.getItem("token");
                const url = `http://localhost:5000/api/matricula/eliminar/${id}`;
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };
                const data = { salida: new Date().toString() };
                await axios.delete(url, { headers, data });
                listarMatriculas();
            }
        } catch (error) {
            console.error("Error al eliminar matrícula:", error);
        }
    };

    useEffect(() => {
        listarMatriculas();
    }, []);

    if (cargando) {
        return <Mensaje tipo={"active"}>{"Cargando..."}</Mensaje>;
    }

    return (
        <>
            {matricula.length === 0 ? (
                <Mensaje tipo={"active"}>{"No existen registros de matrículas"}</Mensaje>
            ) : (
                <table className="w-full mt-5 table-auto shadow-lg bg-white">
                    <thead className="bg-blue-900 text-slate-400">
                        <tr>
                            <th className="p-2">N°</th>
                            <th className="p-2">Código</th>
                            <th className="p-2">Estudiante</th>
                            <th className="p-2">Materia</th>
                            <th className="p-2">Estado</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matricula.map((matricula, index) => (
                            <tr className="border-b hover:bg-gray-300 text-center" key={matricula._id}>
                                <td>{index + 1}</td>
                                <td>{matricula.codigo}</td>
                                <td>{matricula.id_estudiante ? `${matricula.id_estudiante.nombre} ${matricula.id_estudiante.apellido}` : "Sin asignar"}</td>
                                <td>{matricula.id_materia?.nombre || "Sin asignar"}</td>
                                <td>
                                    <span className="bg-blue-100 text-pink-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {matricula.estado ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className="py-2 text-center">
                                    <MdInfo
                                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                        onClick={() => navigate(`/dashboard/visualizar_matricula/${matricula._id}`)}
                                    />
                                    <MdNoteAdd
                                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                        onClick={() => navigate(`/dashboard/actualizar_matricula/${matricula._id}`)}
                                    />
                                    <MdDeleteForever
                                        className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                        onClick={() => handleDelete(matricula._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default TablaMatriculas;
