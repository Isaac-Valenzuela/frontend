import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname

    const { auth } = useContext(AuthContext)
    const autenticado = localStorage.getItem('token')

    return (
        <div className='md:flex md:min-h-screen flex-col md:flex-row'>
            {/* Sidebar */}
            <div className='bg-blue-900 px-5 py-4 w-full md:w-1/5'>
                <h2 className='text-4xl font-black text-center text-slate-200'>Gestion de matriculas</h2>

                {/* Perfil */}
                <div className="m-2 mt-5 p-2 bg-white rounded-full w-[120px] h-[120px] flex justify-center items-center mx-auto">
                    <img src="https://cdn-icons-png.flaticon.com/512/2942/2942820.png" alt="img-client" className="rounded-full w-full h-full object-cover" />
                </div>

                <p className='text-slate-400 text-center relative top-[-2px] text-sm'>
                    <span className='bg-green-500 w-3 h-3 inline-block rounded-full'></span> Bienvenido - {auth?.nombre}
                </p>

                <hr className="mt-5 border-slate-500" />

                {/* Menú de navegación */}
                <ul className="mt-5">
                    <li className="text-center">
                        <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-200 bg-blue-600 px-3 py-2 rounded-md text-center' : 'text-slate-300'} text-xl block mt-2 hover:text-slate-100 hover:bg-blue-700 transition duration-300 ease-in-out`}>Estudiantes</Link>
                    </li>
                    <li className="text-center">
                        <Link to='/dashboard/materias' className={`${urlActual === '/dashboard/materias' ? 'text-slate-200 bg-blue-600 px-3 py-2 rounded-md text-center' : 'text-slate-300'} text-xl block mt-2 hover:text-slate-100 hover:bg-blue-700 transition duration-300 ease-in-out`}>Materias</Link>
                    </li>
                    <li className="text-center">
                        <Link to='/dashboard/matriculas' className={`${urlActual === '/dashboard/matriculas' ? 'text-slate-100 bg-blue-600 px-3 py-2 rounded-md text-center' : 'text-slate-300'} text-xl block mt-2 hover:text-slate-100 hover:bg-blue-700 transition duration-300 ease-in-out`}>Matriculas</Link>
                    </li>
                </ul>
            </div>

            {/* Contenido principal */}
            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                {/* Barra superior */}
                <div className='bg-blue-900 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-slate-100'>
                        Usuario - {auth?.nombre}
                    </div>
                    <div className="bg-white border-2 border-green-500 rounded-full inline-block">
                        <img src="https://cdn-icons-png.flaticon.com/512/2942/2942813.png" className="rounded-full" alt="img-client" width={50} height={50} />
                    </div>
                    <div>
                        <Link to='/' className="text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-700 px-4 py-1 rounded-lg" onClick={() => { localStorage.removeItem('token') }}>Salir</Link>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className='overflow-y-scroll p-8'>
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>

                {/* Footer */}
                <div className='bg-blue-900 h-12'>
                    <p className='text-center text-slate-100 leading-[2.9rem] underline'>Todos los derechos reservados 2025 ®</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
