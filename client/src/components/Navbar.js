import { useLocation, Link } from 'react-router-dom'
import {logout} from "../endpoint/gateway";
import Redirect from "./Redirect";

const Navbar = () => {
    const location = useLocation();
    if(location.pathname === "/"){
        return("");
    }

    const handleLogout = ()=>{
        logout();
        Redirect("/");
    }

    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <a className="navbar-brand" href={"/new-courses"}>Training Platform</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            sessionStorage.getItem("userrole") !== "employee" &&
                            <li className="nav-item">
                                <a className="nav-link" href={"/list-employees"}>Employees</a>
                            </li>
                        }
                        {
                            sessionStorage.getItem("userrole") !== "admin" &&
                            <li className="nav-item">
                                <a className="nav-link" href={"/course-request"}>Course Requests</a>
                            </li>
                        }

                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Courses
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href={"/enrolled-courses"}>Enrolled Courses</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href={"/new-courses"}>Course Dashboard</a></li>
                            </ul>
                        </li>
                        {
                            sessionStorage.getItem("userrole") !== "employee" &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Assignments
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href={"/training-assignment"}>Assign Training</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href={"/create-live-meeting"}>Create Live Meeting</a></li>
                                </ul>
                            </li>
                        }

                        {
                            sessionStorage.getItem("userrole") === "admin" &&
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin Panel
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href={"/register"}>Register Employee</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href={"/list-employees"}>Edit Employee</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href={"/create-course"}>Create Course</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href={"/create-live-meeting"}>Create Live Meeting</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href={"/list-courses"}>List Courses</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href={"/upload-video"}>Upload Video</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href={"/list-video"}>List Videos</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href={"/list-categories"}>List Categories</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href={"/create-category"}>Create Categories</a></li>
                                </ul>
                            </li>
                        }


                    </ul>
                </div>
                <div className="navbar-expand-lg navbar-nav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item ">
                            <Link to={"/employee-performance/" + sessionStorage.getItem("userid") } state={ {isManager: false }} className="navbar-brand" href={""}>{sessionStorage.getItem("username")}</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-item btn btn-warning" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;