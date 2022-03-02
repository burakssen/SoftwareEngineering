import {updateApprovalRequest} from "../endpoint/gateway";
import Notification from "./Notification";

const RequestCard = ({request}) => {
    let userRole = sessionStorage.getItem("userrole");


    async function approve(){
        let response = await updateApprovalRequest(request.id, 1);
        if(response.status === 200){
            Notification("You approved successfully", "success", 2000);
        }
        else{
            Notification("Something went wrong please try again later", "error", 2000);
        }
        window.location.reload();
    }

    async function reject(){
        let response = await updateApprovalRequest(request.id, 2);
        if(response.status === 200){
            Notification("You declined successfully", "success", 2000);
        }
        else{
            Notification("Something went wrong please try again later", "error", 2000);
        }
        window.location.reload();
    }


    return (
        <div className="card shadow p-3 mb-3 bg-body rounded">
            <div className="card-body align-middle">
                {
                    userRole === "admin" && request.status === 0 &&
                    <div className="row align-items-center">
                        <div className="col-md-2 text-md-start text-lg-start text-xl-start fs-4">
                            <b>From:</b> {request.employee}
                        </div>
                        <div className="col-md-8 fs-4">
                            <b>Course Name:</b> {request.course.name} &nbsp;| &nbsp;
                            <b>Course Category:</b> {request.course.category.name}
                        </div>
                        <div className="col-md-2 text-md-end text-lg-end text-xl-end">
                            <button className="col-md-5 btn btn-success m-1" onClick={approve}><i className="fas fa-check"/></button>
                            <button className="col-md-5 btn btn-danger m-1" onClick={reject}><i className="fas fa-times"/></button>
                        </div>
                    </div> ||
                    userRole === "manager" && request.managerStatus === "asManager" && request.status === 0 &&
                    <div className="row align-items-center">
                        <div className="col-md-2 text-md-start text-lg-start text-xl-start fs-4">
                            <b>From:</b> {request.employee.name}
                        </div>
                        <div className="col-md-8 fs-4">
                            <b>Course Name:</b> {request.course.name} &nbsp;| &nbsp;
                            <b>Course Category:</b> {request.course.category.name}
                        </div>
                        <div className="col-md-2 text-md-end text-lg-end text-xl-end">
                            <button className="col-md-5 btn btn-success m-1" onClick={approve}><i className="fas fa-check"/></button>
                            <button className="col-md-5 btn btn-danger m-1" onClick={reject}><i className="fas fa-times"/></button>
                        </div>
                    </div> ||
                    userRole === "manager" && request.managerStatus === "asManager" &&
                    <div className="row align-items-center">
                        <div className="col-md-2 text-md-start text-lg-start text-xl-start fs-4 p-0">
                            <b>From:</b> {request.employee.name}
                        </div>
                        <div className="col-md-7 text-md-start text-lg-start text-xl-start fs-5">
                            <b>Course Name:</b> {request.course.name} &nbsp;| &nbsp;
                            <b>Course Category:</b> {request.course.category.name}
                        </div>
                        <div className="col-md-3 text-md-end text-lg-end text-xl-end fs-4">
                            {
                                request.status === 1 &&
                                <div className="d-flex justify-content-center">
                                    <b>Status:</b>&nbsp;<div className="text-success"> Approved </div>
                                </div> ||
                                request.status === 2 &&
                                <div className="d-flex justify-content-center">
                                    <b>Status:</b>&nbsp;<div className="text-danger"> Denied </div>
                                </div> ||
                                request.status === 0 &&
                                <div className="d-flex justify-content-center">
                                    <b>Status:</b>&nbsp;<div className="text-secondary"> Pending </div>
                                </div>
                            }
                        </div>
                    </div> ||
                    (userRole === "employee" || request.managerStatus === "asEmployee")  &&
                    <div className="row align-items-center">
                        <div className="col-md-7 text-md-start text-lg-start text-xl-start fs-5">
                            <b>Course Name:</b> {request.course.name} &nbsp;| &nbsp;
                            <b>Course Category:</b> {request.course.category.name}
                        </div>
                        <div className="col-md-2 text-md-start text-lg-start text-xl-start fs-4 p-0">
                            <b>Send To:</b> {request.manager.name}
                        </div>
                        <div className="col-md-3 text-md-end text-lg-end text-xl-end fs-4">
                            {
                                request.status === 1 &&
                                <div className="d-flex justify-content-center">
                                    <b>Status:</b>&nbsp;<div className="text-success"> Approved </div>
                                </div> ||
                                request.status === 2 &&
                                <div className="d-flex justify-content-center">
                                    <b>Status:</b>&nbsp;<div className="text-danger"> Denied </div>
                                </div> ||
                                request.status === 0 &&
                                <div className="d-flex justify-content-center">
                                    <b>Status:</b>&nbsp;<div className="text-secondary"> Pending </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default RequestCard;