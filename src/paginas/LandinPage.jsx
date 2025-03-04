import logoDarkMode from '../assets/dark.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const LandinPage = () => {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <div className={darkMode ? "dark" : ""}>

            <main className='bg-white px-8 md:px-16 lg:px-32 xl:px-40 dark:bg-gray-800 transition-all duration-300'>
                {/* Navbar */}
                <nav className='p-6 flex justify-between items-center'>
                    <h1 className='text-3xl font-bold text-blue-900 dark:text-white transition-colors'>EPN</h1>
                    <ul className='flex items-center'>
                        <li><img onClick={() => setDarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={40} height={40} /></li>
                        <li><Link to="/login" className='ml-8 bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors'>Login</Link></li>
                    </ul>
                </nav>

                {/* Hero Section */}
                <section className='text-center py-16'>
                    <h2 className='text-5xl text-blue-900 font-semibold md:text-6xl dark:text-white'>Transforma la Gestión Estudiantil</h2>
                    <h3 className='text-xl md:text-2xl py-2 text-gray-600 dark:text-gray-200'>Optimiza tus procesos académicos con tecnología de vanguardia.</h3>
                    <p className='text-md md:text-xl py-5 leading-8 text-gray-800 md:max-w-3xl mx-auto dark:text-gray-200'>
                        Gestionamos el registro estudiantil de manera eficiente, segura y flexible, con un enfoque innovador para facilitar la experiencia de estudiantes y administrativos.
                    </p>
                    <Link to="/services" className='mt-6 inline-block bg-blue-900 text-white px-8 py-3 rounded-full text-xl hover:bg-blue-800 transition-colors'>Descubre nuestros servicios</Link>
                </section>
                {/* Servicios */}
                <section className='py-16 bg-blue-50 dark:bg-blue-900'>
                    <div className='max-w-4xl mx-auto text-center'>
                        <h3 className='text-3xl text-blue-900 font-semibold py-2 dark:text-white'>Nuestros Servicios</h3>
                        <p className='text-lg text-gray-700 dark:text-gray-200 mb-6'>
                            Conoce las herramientas innovadoras que ofrecemos para mejorar la gestión educativa en tu institución.
                        </p>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
                            <div className='bg-white p-8 rounded-xl shadow-lg dark:bg-gray-800'>
                                <h4 className='text-xl text-blue-900 font-semibold mb-3 dark:text-blue-400'>Registro Académico Eficiente</h4>
                                <p className='text-gray-700 dark:text-gray-200'>Automatizamos y centralizamos todos los procesos de registro de estudiantes, ahorrando tiempo y mejorando la precisión.</p>
                            </div>
                            <div className='bg-white p-8 rounded-xl shadow-lg dark:bg-gray-800'>
                                <h4 className='text-xl text-blue-900 font-semibold mb-3 dark:text-blue-400'>Seguimiento y Reportes</h4>
                                <p className='text-gray-700 dark:text-gray-200'>Genera reportes personalizados y realiza un seguimiento detallado del desempeño académico de tus estudiantes.</p>
                            </div>
                            <div className='bg-white p-8 rounded-xl shadow-lg dark:bg-gray-800'>
                                <h4 className='text-xl text-blue-900 font-semibold mb-3 dark:text-blue-400'>Soporte Continuo</h4>
                                <p className='text-gray-700 dark:text-gray-200'>Nuestro equipo está disponible 24/7 para brindarte asistencia técnica y resolver cualquier duda o inconveniente.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className='py-10 text-center text-gray-500 dark:text-gray-400'>
                    <p>&copy; 2025 EPN. Todos los derechos reservados.</p>
                    <p className='text-sm'>Desarrollado con amor para mejorar la educación.</p>
                </footer>
            </main>

        </div>
    )
}
