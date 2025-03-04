import {Link} from 'react-router-dom'


export const NotFound = () => {
    return (
        

        <div className="flex flex-col items-center justify-center">

            <img class="object-cover h-80 w-80" src="data:image/png;base64,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" alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">No encontramos la pagina</p>
                
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Perdón, la pagina que estas buscando no se ha podido encontrar.</p>
                
                <Link to="/login" className="p-3 m-5 w-full text-center  bg-blue-900 text-slate-300  border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Login</Link>

            </div>
        </div>
    )
}
