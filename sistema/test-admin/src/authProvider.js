const authProvider={
    login: async ({ username , password }) => {
         const request = new Request('http://localhost:1337/login', {
        //  const request = new Request('https://localhost:1337/login', {
            method: 'POST',
            body: JSON.stringify({ "username":username, "password": password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            const auth = await response.json();
            localStorage.setItem('auth', auth.token);
            localStorage.setItem('identity',  JSON.stringify({"id": auth.id,  "fullName":auth.fullName}));
            return Promise.resolve()
        } catch {
            throw new Error('Error en usuario o password');
        }
    },

    logout: ()=>{
        localStorage.removeItem("auth");
        localStorage.removeItem("identity");
        return Promise.resolve();
    },

    checkAuth: ()=>{
        return localStorage.getItem("auth")? Promise.resolve(): Promise.reject();
    },

    checkError: (error) =>{
        const status=error.status;
        if(status===401|| status===403){
            localStorage.removeItem("auth");
            localStorage.removeItem("identity");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getIdentity: ()=>{
        try{
            // console.log("localStorage.udentity: ", JSON.parse(localStorage.getItem("identity")));
            return Promise.resolve(JSON.parse(localStorage.getItem("identity")));
        }catch{
            return Promise.reject()
        }
    },

    getUser: async () => {
        const request = new Request('https://localhost:1337/getUser', {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json', "Authentication": localStorage.getItem("auth") }),
        });
    
        try {
            const response = await fetch(request);
    
            if (response.status < 200 || response.status >= 300) {
                console.log("Error response status:", response.status);
                throw new Error(response.statusText);
            } else {
                // Assuming you want to work with the JSON response:
                const data = await response.json();
                // console.log("Data:", data);
                return Promise.resolve({
                    id: data.id,
                    usuario: data.usuario,
                    aula: data.lugar,
                    rol: data.rol,
                });
            }
        } catch (error) {
            // Handle the error from the network request
            console.error("An error occurred:", error);
            throw new Error('No eres un usuario permitido');
        }
    },

    getPermissions: ()=>{return Promise.resolve()
    },
};

export default authProvider;