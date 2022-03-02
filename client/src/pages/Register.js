import {React, useState} from "react";
import { createEmployee } from "../endpoint/gateway";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

const Register = () => {
    const [isManager, setIsManager] = useState(false );
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [positionName, setPositionName] = useState("");

    let navigate = useNavigate();

    const handleChange = (e) => {
        if(e.target.checked){
            setIsManager(true);
        }
        else{
            setIsManager(false);
        }

    };

    const handleValidation = () => {
        let isFormValid = true;
        if(name === ""){
            Notification("Name is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(name.length < 2 || name.length > 32){
                Notification("Name should be between 2-32 characters", "error", 2000);
                isFormValid = false;
            }
        }

        if(surname === ""){
            Notification("Surname is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(surname.length < 2 || surname.length > 32){
                Notification("Surname should be between 2-32 characters", "error", 2000);
                isFormValid = false;
            }
        }

        if(email === ""){
            Notification("Email is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(!String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ))
            {
                Notification("Not a valid email", "error", 2000);
                isFormValid = false;
            }
        }

        if(username === ""){
            Notification("Username is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(username.length < 2 || username.length > 32){
                Notification("Username should be between 2-32 characters", "error", 2000);
                isFormValid = false;
            }
        }

        if(password === ""){
            Notification("Password is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(password.length < 8 || password.length > 32){
                Notification("Password should be between 8-32 characters", "error", 2000);
                isFormValid = false;
            }
        }

        if(positionName === ""){
            Notification("PositionName is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(positionName.length < 2 || positionName.length > 32){
                Notification("Position name  should be between 2-32 characters", "error", 2000);
                isFormValid = false;
            }
        }


        return isFormValid;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
            if(handleValidation()){
            const employee = {
                name: name,
                surname: surname,
                email: email,
                username: username,
                password: password,
                positionName: positionName,
                isManager: isManager
            }
            let response = await createEmployee(employee);
            if(response.status === 200){
                Notification("User successfully added", "success", 2000);
            }
            else{
                Notification("Something went wrong please try again later", "error", 2000);
            }
            window.location.reload();
        }
    }

    return (  
        <div>
            <Navbar/>
            <br/>
            <div className="container">
            <h2> Register Employee </h2>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="name">First Name</label>
                                <input type="text" className="form-control" id="name"  placeholder="Enter name" onChange={(e)=> setName(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="surname">Last Name</label>
                                <input type="text" className="form-control" id="surname"  placeholder="Enter surname" onChange={(e)=> setSurname(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="positionName">Position Name</label>
                                <input type="text" className="form-control" id="positionName"  placeholder="Enter position name" onChange={(e)=> setPositionName(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)}/>
                            </div>
                            
                            <div className="col-md-6">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username"  placeholder="Enter username" onChange={(e)=> setUsername(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                            </div>
                            <div className="col">
                                <input type="checkbox" className="form-check-input"  onChange={handleChange}/>
                                <label className="form-check-label" htmlFor="isManager">&ensp;Set as Manager</label>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary"  onClick={handleRegister}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
 
export default Register;