import {
    useLocation,
    Navigate
} from 'react-router-dom';

import { isLogedIn } from "../endpoint/gateway";

function RequireAuth({ children }) {
    let auth = isLogedIn();
    let location = useLocation();

    if (!auth) {
        return <Navigate replace to="/" state={{ from: location }} />;
    }

    return children;
}

export default RequireAuth;