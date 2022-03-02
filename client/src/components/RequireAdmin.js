import {
    useLocation,
    Navigate
} from 'react-router-dom';

import {toast} from "wc-toast";

function RequireAdmin({ children }) {
    let userrole = sessionStorage.getItem("userrole");
    let location = useLocation();

    if (userrole !== "admin") {
        toast("Access Denied")
        return <Navigate replace to="/enrolled-courses" state={{ from: location }} />;
    }

    return children;
}

export default RequireAdmin;