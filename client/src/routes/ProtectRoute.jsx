import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate data-testid="redirect-login" to={'/login'} replace/>
    }
    return <div data-testid="protected-route-wrapper">{children}</div>;
}

export default ProtectedRoute