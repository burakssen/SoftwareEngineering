import '../styles/styles.css'
import Navbar from "../components/Navbar";
import EmployeeRow from "../components/EmployeeRow"
import React, {useState, useEffect} from "react";
import {getEmployees} from "../endpoint/gateway";

const ListEmployee = () => {
    let [employeeInfo, setEmployeeInfo] = useState([]);
    let [allEmployees, setAllEmployees] = useState([]);
    let isAdmin = (sessionStorage.getItem('userrole') === "admin");
    let [searchInput, setSearchInput] = useState('');

    useEffect(async ()=>{
        let response = await getEmployees();
        if(sessionStorage.getItem('userrole') === "manager"){
            for(let i = 0; i < response.data.managements.length; i++){
                setEmployeeInfo(prevState => [...prevState, response.data.managements[i].employee]);
                setAllEmployees(prevState => [...prevState, response.data.managements[i].employee])
            }
        }
        else if(sessionStorage.getItem('userrole') === "admin"){
            for(let i = 0; i < response.data.employees.length; i++){
                setEmployeeInfo(prevState => [...prevState, response.data.employees[i]]);
                setAllEmployees(prevState => [...prevState, response.data.employees[i]]);
            }
        }
    }, [])

    const handleSearch = (event) =>{

        setSearchInput(event.target.value);

        if(searchInput.length === 1){
            setEmployeeInfo(allEmployees);
        }
        else{
            setEmployeeInfo( allEmployees.filter(employee => {
                    return employee.name.toLowerCase().includes(searchInput.toLowerCase());
                }));
        }
    }

    return (
        <div className="all-employees">
            <Navbar/>
            <div className="container mt-5">
                <h2> Employees </h2>
                <br/>
                <input type="text" onChange={(e)=>{handleSearch(e)}} className="form-control w-50 center-search mb-5 mt-2" placeholder="search" aria-label="search" aria-describedby="basic-addon1" />
                <table className="table" >
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Email</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeInfo.map(employee => (  
                                <EmployeeRow key={employee.id} id={employee.id} name={employee.name} surname={employee.surname}
                                position={employee.positionName}  email={employee.email} isAdmin = {isAdmin} />
                        ))}
                    </tbody>
                </table>  
            </div>
            <br/>
        </div>
    );
}
export default ListEmployee;