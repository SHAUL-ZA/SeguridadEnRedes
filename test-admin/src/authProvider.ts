// in src/authProvider.ts
import { AuthProvider } from "react-admin";
import { useLogin } from "react-admin";

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
   
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("username")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),

    login: ({ username }) => {
        const login = useLogin();
        return login({ username })
            .then(() => {
                // Handle successful login if needed
                localStorage.setItem("username", username);
                return Promise.resolve();
            })
            .catch((error) => {
                // Handle login error
                return Promise.reject(error);
            });
    },
};