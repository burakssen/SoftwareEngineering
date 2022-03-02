import Navbar from "../components/Navbar";
import {useLocation, useParams} from "react-router-dom";
import AssignmentPerformance from "../components/AssignmentPerformance"
import {useEffect, useState} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Notification from '../components/Notification';
import {
    getEnrollmentWithEmployeeId,
    getCourseById,
    getProgressWithEmployeeId, getVideo, getAssignmentWithManager, getAssignmentWithEmployee
} from "../endpoint/gateway";

const EmployeePerformance = () => {

    let [enrollments, setEnrollments] = useState([]);
    let [assignments, setAssignments] = useState([]);

    let location = useLocation();

    const calculateProgress = (videos, progresses) =>{
        let videoCount = 0;
        let totalWatched = 0;

        videos.forEach((video) => {
            progresses.forEach((progress)=>{
                if(video.id === progress.videoId){
                    videoCount += 1;
                    totalWatched += progress.watchedTime;
                }
            })
        });

        if(0 === totalWatched)
            return 0

        return (totalWatched / videoCount);
    }


    const printDocument = () => {
        const input = document.getElementById("divToDownload");
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0, 220, 100);
                pdf.save('report.pdf');
            })
    }


    useEffect(async ()=> {
        let employeeId = 0;

        if(location.state.isManager){
            employeeId = location.state.employeeId;
        }
        else{
            employeeId = sessionStorage.getItem('userid');
        }

        Notification("Loading", "loading", 4000);
        let enroll = await getEnrollmentWithEmployeeId(employeeId);
        setEnrollments([...enroll.data.enrollments]);
        for (let i = 0; i < enroll.data.enrollments.length; i++) {
            let course = await getCourseById(enroll.data.enrollments[i].courseId);
            let videos = [];
            for (let j = 0; j < course.data.course.videos.length; j++) {
                let video = await getVideo(course.data.course.videos[j].id);
                if (video.data.Video !== null)
                    videos.push(video.data.Video);
            }
            let progresses = await getProgressWithEmployeeId(employeeId);
            course.data.course["progress"] = calculateProgress(videos, progresses.data.updatedProgress);
            enroll.data.enrollments[i]["course"] = course.data.course;
        }
        let assignments;
        if(location.state.isManager){
             assignments = await getAssignmentWithManager(employeeId);
        }
        else{
            assignments = await getAssignmentWithEmployee(employeeId);
        }

        assignments.data.assignments.forEach((assignment) => {
            enroll.data.enrollments.forEach((enrollment) => {
                if(assignment.enrollmentId === enrollment.id){
                    let now = new Date();
                    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                    let deadline = new Date(assignment.deadline);
                    let status = enrollment.course.progress === 100 ? "Completed" : "Ongoing";
                    if(deadline.getTime() < now.getTime()){
                        status = "Deadline Passed";
                    }

                    setAssignments(prevState => [...prevState, {
                        id: assignment.id,
                        courseName: enrollment.course.name,
                        assignmentDate: assignment.assignmentDate,
                        deadline: assignment.deadline,
                        status: status,
                        performance: enrollment.course.progress
                    }]);
                }
            });
        });
    }, []);

    return (

        <div className="all-employees">
            <Navbar/>
            <div className="container mt-5">

                <div id="divToDownload">
                    <div id="divToPrint" className="mt4" >
                        <hr/>
                        <h2>Personal Information  </h2>
                        <hr/>
                        <div className="col">
                            {
                                enrollments[0] &&
                                <div>
                                    <p><b>Name: </b>{enrollments[0].employee.name} {enrollments[0].employee.surname}</p>
                                    <p><b>Position: </b> {enrollments[0].employee.positionName}</p>
                                    <p><b>Username: </b>{enrollments[0].employee.username} </p>
                                    <p><b>Email: </b> {enrollments[0].employee.email}</p>
                                </div>
                            }
                        </div>

                        <hr/>
                        <h2>Assignment Performances </h2>
                        <hr/>
                        <table className="table table-striped" >
                            <thead>
                            <tr>
                                <th scope="col">Course Name</th>
                                <th scope="col">Assignment Date</th>
                                <th scope="col">Deadline</th>
                                <th scope="col">Status</th>
                                <th scope="col">Performance</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                assignments &&
                                assignments.map(assignment => (
                                    <AssignmentPerformance key={assignment.id} courseName = {assignment.courseName} deadline={assignment.deadline}
                                                           assignmentDate={assignment.assignmentDate} status={assignment.status} performance={assignment.performance}>
                                    </AssignmentPerformance>
                                ))
                            }

                            </tbody>
                        </table>
                    </div>
                    <button type="button" className="btn btn-outline-secondary" onClick={printDocument}>Generate Report</button>
                    <br/>
                </div>
            </div>
        </div>
    );
}

export default EmployeePerformance;