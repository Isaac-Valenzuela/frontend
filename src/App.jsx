import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { LandinPage } from './paginas/LandinPage'
import { NotFound } from './paginas/NotFound'
import Dashboard from './layout/Dashboard'
import Materias from './paginas/Materias'
import Matriculas from './paginas/Matriculas'
import Estudiantes from './paginas/Estudiantes'
import CrearEstudiante from './paginas/CrearEstudiantes'
import VisualizarEstudiante from './paginas/VisualizarEstudiante'
import ActualizarEstudiante from './paginas/ActualizarEstudiante'
import CrearMateria from './paginas/CrearMaterias'
import VisualizarMateria from './paginas/VisualizarMateria'
import ActualizarMateria from './paginas/ActualizarMateria'
import CrearMatricula from './paginas/CrearMatriculas'
import VisualizarMatricula from './paginas/VisualizarMatricula'
import ActualizarMatricula from './paginas/ActualizarMatricula'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
            <Routes>

              <Route index element={<LandinPage />} />

              <Route path='/' element={<Auth />}>
                <Route path='login' element={<Login />} />
                <Route path='*' element={<NotFound />} />
              </Route>

              <Route path='dashboard/*' element={
                <PrivateRoute>
                  <Routes>
                    <Route element={<Dashboard />}>
                      <Route index element={<Estudiantes />} />
                      <Route path='registrar_estudiante' element={<CrearEstudiante />} />
                      <Route path='visualizar_estudiante/:id' element={<VisualizarEstudiante />} />
                      <Route path='actualizar_estudiante/:id' element={<ActualizarEstudiante />} />
                      <Route path='materias' element={<Materias />} />
                      <Route path='registrar_materias' element={<CrearMateria />} />
                      <Route path='visualizar_materia/:id' element={<VisualizarMateria />} />
                      <Route path='actualizar_materia/:id' element={<ActualizarMateria />} />
                      <Route path='matriculas' element={<Matriculas />} />
                      <Route path='registrar_matriculas' element={<CrearMatricula />} />
                      <Route path='visualizar_matricula/:id' element={<VisualizarMatricula />} />
                      <Route path='actualizar_matricula/:id' element={<ActualizarMatricula />} />
                    </Route>
                  </Routes>
                </PrivateRoute>
              } />
            </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
