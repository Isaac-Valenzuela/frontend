import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../context/AuthProvider';
import Mensaje from '../componets/Alertas/Mensajes'

const Login = () => {
    const [mensaje, setMensaje] = useState({})
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)

    const [form, setform] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validación extra en el frontend
        if (!form.email || !form.password) {
            setMensaje({ respuesta: "Por favor, llena todos los campos", tipo: false });
            return;
        }
    
        // Se usa la URL única de login
        const url = `http://localhost:5000/api/login`;
    
        try {
            const respuesta = await axios.post(url, form);
            
            // Guardamos el token en el localStorage
            localStorage.setItem('token', respuesta.data.token);
    
            // Actualizamos el estado de autenticación
            setAuth(respuesta.data);  // Aquí actualizamos el estado de autenticación
    
            // Redirigimos al dashboard tras login exitoso
            navigate('/dashboard');
        } catch (error) {
            // Si hay errores, mostramos un mensaje adecuado
            if (error.response && error.response.data && error.response.data.msg) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            } else {
                setMensaje({ respuesta: "Ocurrió un error inesperado. Intenta nuevamente.", tipo: false });
            }
    
            // Limpiamos el formulario tras un error
            setform({});
            
            // Limpiamos el mensaje tras 3 segundos
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };
    




    return (
        <>
            <ToastContainer />
            <div className="w-1/2 h-screen bg-[url('/public/images/matricula.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            ">
            </div>

            <div className="w-1/2 h-screen bg-white flex justify-center items-center">

                <div className="md:w-4/5 sm:w-full">

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Sistema de gestión de matrículas</h1>
                    <small className="text-gray-400 block my-4 text-sm">INGRESA LAS CREDENCIALES</small>
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Email/Correo</label>
                            <input type="email" placeholder="Ingresa tu email/correo"
                                name='email'
                                value={form.email || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Password/Contraseña</label>
                            <input type="password" placeholder="********************"
                                name='password'
                                value={form.password || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="my-4">
                            <button className="py-2 w-full block text-center bg-blue-900 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Login</button>
                        </div>

                    </form>

                    {/* 
    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400" />
        <p className="text-center text-sm">O</p>
        <hr className="border-gray-400" />
    </div>

    <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-black hover:text-white">
        <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/281/281764.png" />
        Iniciar sesión con Google
    </button>

    <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-blue-600 hover:text-white">
        <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" />
        Iniciar sesión con Facebook
    </button>
*/}


                </div>
            </div>
        </>
    )
}

export default Login