import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    // Función para obtener el perfil del usuario
    const perfil = async (token) => {
        const Id = getUserIdFromToken(token);  // Obtén el id del usuario desde el token
        const url = `http://localhost:5000/api/perfil/${Id}`; // Ruta que ahora incluye el id

        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            setAuth(respuesta.data.usuario); // Establecemos el perfil en el estado de auth
        } catch (error) {
            console.log(error);
        }
    };

    // Función para obtener el id del usuario desde el token JWT (si es que el token tiene esa información)
    const getUserIdFromToken = (token) => {
        if (!token) return null;

        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar el JWT
        return decodedToken.id;  // Asegúrate de que el token contenga el 'id' del usuario
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtener el token del localStorage
        if (token) {
            perfil(token); // Si el token existe, obtenemos el perfil
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth // Exponemos setAuth para poder actualizar el estado de autenticación
           
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
