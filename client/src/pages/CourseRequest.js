import Navbar from "../components/Navbar";
import RequestCard from "../components/RequestCard"
import {getApprovalRequest, getCourseById} from "../endpoint/gateway";
import {useEffect, useState} from "react";
import Notification from "../components/Notification";

const CourseRequest = () => {
    let userRole = sessionStorage.getItem("userrole");
    let [requests, setRequests] = useState([]);
    let [managerRequests, setManagerRequests] = useState([]);
    let [allRequests, setAllRequests] = useState([]);
    let [allManagerRequests, setAllManagerRequests] = useState([]);
    let [searchManagerInput, setSearchManagerInput] = useState('');
    let [searchEmployeeInput, setSearchEmployeeInput] = useState('');

    useEffect(async () => {
        Notification("Loading", "loading", 2000);
        if(userRole === "manager") {
            let managerResponse = await getApprovalRequest("asManager");

            let managerApprovalRequests = managerResponse.data.approvalRequests;
            for (let i = 0; i < managerApprovalRequests.length; i++) {
                let course_response = await getCourseById(managerApprovalRequests[i].courseId);
                managerApprovalRequests[i]["course"] = course_response.data.course;
                managerApprovalRequests[i]["managerStatus"] = "asManager";
                setManagerRequests(managerRequests => [...managerRequests, managerResponse.data.approvalRequests[i]]);
                setAllManagerRequests(allManagerRequests => [...allManagerRequests, managerResponse.data.approvalRequests[i]]);
            }

            let employeeResponse = await getApprovalRequest("asEmployee");

            let approvalRequests = employeeResponse.data.approvalRequests;
            for (let i = 0; i < approvalRequests.length; i++) {
                let course_response = await getCourseById(approvalRequests[i].courseId);
                approvalRequests[i]["course"] = course_response.data.course;
                approvalRequests[i]["managerStatus"] = "asEmployee";
                setRequests(requests => [...requests, employeeResponse.data.approvalRequests[i]]);
                setAllRequests(requests => [...requests, employeeResponse.data.approvalRequests[i]]);
            }
        }
        else{
            let response = await getApprovalRequest();
            let approvalRequests = response.data.approvalRequests;
            for(let i = 0; i < approvalRequests.length; i++){
                let course_response = await getCourseById(approvalRequests[i].courseId);
                approvalRequests[i]["course"] = course_response.data.course;
                setRequests(requests => [...requests, response.data.approvalRequests[i]]);
                setAllRequests(requests => [...requests, response.data.approvalRequests[i]]);
            }
        }
    },[]);


    const searchManager = (value) => {
        setSearchManagerInput(value);

        if(searchManagerInput.length === 1){
            setManagerRequests(allManagerRequests);
        }
        else{
            setManagerRequests( allManagerRequests.filter(request => {
                return request.employee.name.toLowerCase().includes(searchManagerInput.toLowerCase());
            }));
        }
    }

    const searchEmployee = (value) => {
        console.log(value);
        setSearchEmployeeInput(value);

        if(searchEmployeeInput.length === 1){
            setRequests(allRequests);
        }
        else{
            console.log(requests);
            setRequests(allRequests.filter(request => {
                console.log(request);
                return request.employee.name.toLowerCase().includes(searchEmployeeInput.toLowerCase());
            }));
        }
    }

    return (
        <div className="courseRequest">
            <Navbar/>
            <div className="container mt-5">
                <div className="text-md-start text-lg-start text-xl-start fs-2 fw-bold text-warning">
                    <div className="row">
                        <p className="col">Manager Approvals </p>
                        <input  type="text" className="form-control col" placeholder="Search Manager Approvals" onChange={(e)=>{searchEmployee(e.target.value)}}/>
                    </div>
                </div>
                <hr/>
                {
                    requests.map((request) => {
                            if(request.manager !== null){
                                return <RequestCard key={request.id} request={request}/>
                            }
                        })
                }
                {
                    userRole === "manager" &&
                    <div>
                        <div className="text-md-start text-lg-start text-xl-start fs-2 fw-bold text-warning">
                            <div className="row">
                                <p className="col">Employee Approvals </p>
                                <input  type="text" className="form-control col" placeholder="Search Employee Approvals" onChange={(e)=>{searchManager(e.target.value)}}/>
                            </div>
                        </div>
                        <hr/>
                    </div>
                }
                {
                    userRole === "manager" &&
                    managerRequests.map((managerRequest) => {
                        return <RequestCard key={managerRequest.id} request={managerRequest}/>
                    })
                }
            </div>
        </div>
    );

}

export default CourseRequest;