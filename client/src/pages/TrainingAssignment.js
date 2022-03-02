import {React, useState, useEffect } from "react";
import {
    getAllCourses,
    assignTraining,
    assignToAllEmployees,
    getEmployees
} from "../endpoint/gateway";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

const TrainingAssignment = () => {
    
    const [courses, setCourses] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("default");
    const [selectedEmployees, setSelectedEmployees] = useState(new Set());
    const [deadline, setDeadline] = useState();

    useEffect(async () => {
        Notification("Loading", "loading", 2000);
        const allCourses = await getAllCourses();
        setCourses(allCourses.data.allCourses);

        const allEmployees = await getEmployees();
        setEmployees([...allEmployees.data.managements]);
        console.log(allEmployees);
    }, []);

    const handleValidation = () => {
        let isFormValid = true;
        if(selectedCourse === "default"){
            Notification("Course must be selected", "error", 2000);
            isFormValid = false;
        }

        if(selectedEmployees.size === 0){
            Notification("At least one employee must be selected", "error", 2000);
            isFormValid = false;
        }

        if(deadline == null){
            Notification("Deadline must be selected", "error", 2000);
            isFormValid = false;
        }

        return isFormValid;
    }

    const handleSelection = (evt) => {
        if(evt.checked){
            selectedEmployees.add(evt.value);
        }else{
            selectedEmployees.delete(evt.value);
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if(handleValidation()){
            const requestData = {
                courseId: selectedCourse,
                employees: Array.from(selectedEmployees),
                deadline: deadline,
                managerId: sessionStorage.getItem("userid")
            }
            await assignTraining(requestData);
        }
    }

    const handleAssignToAll = (evt) => {
        evt.preventDefault();
        
        let employeeIds = [];
        for(let i=0; i<employees.length; i++){
            employeeIds.push(employees[i].id);
        }

        const requestData = {
            courseId: selectedCourse,
            employees: employeeIds,
            deadline: deadline,
            managerId: sessionStorage.getItem("userid")
        }
        
        if(selectedCourse === "default"){
            Notification("Course must be selected", "error", 2000);
        }else if(deadline == null){
            Notification("Deadline must be selected", "error", 2000);
        }else{
            assignToAllEmployees(requestData);
        }

    }

    return (
        <div className="all-employees">
            <Navbar/>
            <div className="container mt-5">
                <h2> Assign New Training </h2>
                <br/> 
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label>
                            Please select a training:
                        </label>
                        <select className="form-control" onChange={e => setSelectedCourse(e.target.value)} defaultValue={selectedCourse}>
                                <option value="default" disabled hidden>
                                    Select Training
                                </option>
                                {courses.map(course=> (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))} 
                        </select>
                    </div>
                    
                    <br/> 

                    <div className="input-group">
                        <div className="col-md-6">
                            <label>Deadline:</label>
                            <input className="form-control"
                            type="datetime-local"
                            value={deadline}
                            onChange={e => setDeadline(e.target.value)}
                            />
                        </div>
                        
                        <div className="col-md-6">
                            <input className="btn btn-primary" type="submit" value="Assign To All Employees" onClick={handleAssignToAll}/>
                        </div>
                    </div>                    
                    <br/> 
                    <br/> 

                    <h2>Employees</h2>
                    <table className="table" >
                        <thead>
                            <tr>
                                <th scope="col">Select</th>
                                <th scope="col">Name</th>
                                <th scope="col">Position</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.employee.id}>
                                    <td><input type="checkbox" onChange={e => handleSelection(e.target)} value={emp.employee.id}/></td>
                                    <td>{emp.employee.name}</td>
                                    <td>{emp.employee.positionName}</td>
                                    <td>{emp.employee.email}</td>
                                </tr> 
                            ))} 
                        </tbody>
                    </table>  

                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Assign Training" />
                    </div>

                </form>
            </div>
            <br/>
        </div>        


    );
}

export default TrainingAssignment;