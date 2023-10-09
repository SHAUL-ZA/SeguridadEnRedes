import React, {useState} from 'react';

const Registrarse = () => {
    const [datos, setDatos] = useState({
        username: '',
        password: '',
        fullName: '',
        rol: ''
    });

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        });
    };

    const handleSendData = async () => {
        const req = await new Request('http://localhost:1337/registrarse', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
        });
        try {
            const res = await fetch(req);
            if(res.status < 200 || res.status >= 300) {
                throw new Error(res.statusText);
            }   
        }
        catch {
            throw new Error('El usuario no pudo ser registrado');
        }
    };

    return (
        <div>
            <h2>Registro de nuevos usuarios</h2>
            <form>
                <div>
                    <label htmlFor="username">Usuario: </label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        value={datos.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={datos.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="fullName">Nombre Completo: </label>
                    <input 
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={datos.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="rol">rol: </label>
                    <input 
                        type="text"
                        id="rol"
                        name="rol"
                        value={datos.rol}
                        onChange={handleChange}
                    />
                </div>
              
                <div>
                    <button type="button" onClick={handleSendData}>
                        Crear Usuario
                    </button>
                </div>
            </form>
        </div>
    );

};
        
export default Registrarse;