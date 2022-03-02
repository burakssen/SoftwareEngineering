import Navbar from "../components/Navbar";
import '../styles/course.css'
import { useParams,useNavigate} from "react-router-dom";
import { useState, useEffect} from "react";
import {
    createNewManagement, deleteManagement,
    getAllEmployees,
    getAllManagement,
    getEmployeeById,
    updateEmployee
} from "../endpoint/gateway";
import Notification from "../components/Notification";
const EditEmployee = () => {
    let [employee, setEmployee] = useState();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [positionName, setPositionName] = useState("");
    const [isManager, setIsManager] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [userManagement, setUserManagement] = useState([]);
    const selectedEmployees = new Set();

    let navigate = useNavigate();
    let params = useParams();
    let employeeid = params.employeeid;
    
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
    useEffect(async () => {
        const response = await getEmployeeById(employeeid);
        const empl = await getAllEmployees();
        const allManagement = await getAllManagement();


        setUserManagement(allManagement.data.managements.filter((management)=>{
            return response.data.employee.id === management.managerId;
        }));

        setEmployees(empl.data.employees.filter((emp) => {
            return emp.id !== response.data.employee.id;
        }));
        setEmployee(response.data.employee);
        setName(response.data.employee.name);
        setSurname(response.data.employee.surname);
        setUsername(response.data.employee.username);
        setPassword(response.data.employee.password);
        setEmail(response.data.employee.email);
        setPositionName(response.data.employee.positionName);
        setIsManager(response.data.employee.isManager);
    }, []);

    const addEmployeeToManager = async (employeeId) => {
        let response = await createNewManagement(employeeId, employee.id);
        if(response.status === 200){
            Notification("User added to this manager", "success", 2000);
        }
        else{
            Notification("Something went wrong, please try again later", "error", 2000);
        }
        window.location.reload();
    }

    const deleteEmployeeFromManager = async (employeeId) => {
        let manId = -1;
        userManagement.forEach((management) => {
            if(management.employeeId === employeeId && management.managerId === employee.id){
                manId = management.id;
            }
        });

        if(manId !== -1){
            let response = await deleteManagement(manId);
            if(response.status === 200){
                Notification("User remove from this manager", "success", 2000);
            }
            else{
                Notification("Something went wrong, please try again later", "error", 2000);
            }
            window.location.reload();
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if(handleValidation()){
            const updatedEmployee = {
                id: employeeid,
                name: name,
                surname: surname,
                username: username,
                email: email,
                positionName: positionName,
                isManager: isManager
            }
            let responseUpdate = await updateEmployee(updatedEmployee);
            let responseManagement = null;

            selectedEmployees.forEach(async (employee) => {
                responseManagement = await createNewManagement(employee.id, employeeid);
            });

            if(responseUpdate.status === 200){
                Notification("Employee update succesfull", "success", 2000);
            }
            else{
                Notification("Something went wrong, please try again later", 2000);
            }

            if(responseManagement){
                if(responseManagement.status === 200){
                    Notification("Employee added to manager succesfull", "success", 2000);
                }
                else{
                    Notification("Something went wrong, please try again later", 2000);
                }
            }

            window.location.reload();
        }
    }

    const checkUserManagement = (employeeId) => {
        let inside = false;

        userManagement.forEach((management) => {
            if(management.employeeId === employeeId){
                inside = true;
            }
        })

        return inside;
    }

    return (
        <div>
            <Navbar/>
            <br/>
            <div className="container">
            <h2> Edit Employee </h2>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="name">First Name</label>
                                <input type="text" className="form-control" defaultValue={employee && employee.name} onChange={(e) => {setName(e.target.value)}}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="surname">Last Name</label>
                                <input type="text" className="form-control" defaultValue={employee && employee.surname} onChange={(e) => {setSurname(e.target.value)}}/>
                            </div>
                            <div className="col-6">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" defaultValue={employee && employee.username} onChange={(e) => {setUsername(e.target.value)}}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="username">Email</label>
                                <input type="email" className="form-control"  defaultValue={employee && employee.email}  onChange={(e)=>{setEmail(e.target.checked )}}/>
                            </div>
                            <div className="col-md-16">
                                <label htmlFor="position">Position Name</label>
                                <input type="text" className="form-control" defaultValue={employee && employee.positionName}  onChange={(e)=>{setPositionName(e.target.value)}}/>
                            </div>
                            <div className="col">
                                <input type="checkbox" className="form-check-input"  onChange={(e)=>setIsManager(e.target.checked)}/>
                                <label className="form-check-label" htmlFor="isManager">&ensp; Manager</label>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary"  onClick={handleUpdate}>Update </button>
                            </div>
                        </form>
                        {
                            employee && employee.isManager &&
                            <div>
                                <h4 className="mt-5">Add Employees to manager</h4>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Select</th>
                                        <th scope="col">Employee Name</th>
                                        <th scope="col">Position</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {employees.map(emp => (
                                        <tr key={emp.id}>
                                            {
                                                !checkUserManagement(emp.id) &&
                                                <td><input type="button" className="btn btn-warning w-50" onClick={() => addEmployeeToManager(emp.id)}
                                                           value={"Add"} /></td>
                                            }

                                            {
                                                checkUserManagement(emp.id) &&
                                                <td><input type="button" className="btn btn-danger w-50" onClick={() => deleteEmployeeFromManager(emp.id)}
                                                           value={"Delete"} /></td>
                                            }

                                            <td>{emp.name}</td>
                                            <td>{emp.positionName}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditEmployee;