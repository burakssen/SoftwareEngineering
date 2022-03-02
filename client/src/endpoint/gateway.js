import axios from "axios";
import {
    gateway
} from '../constants/constants';
import {toast} from "wc-toast";
import Redirect from "../components/Redirect";

axios.defaults.withCredentials = true

function login(username, password) {
    toast("Loading", {
        icon: {type: 'loading'},
        duration: 2000
    });
    axios.post(gateway + "/authentication/login", {username, password}, {withCredentials: true})
        .then(res => {
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("userid", res.data.id);

            if(res.data.role === "admin"){
                sessionStorage.setItem("userrole", res.data.role);
            }
            else {
                if(res.data.isManager === true){
                    sessionStorage.setItem("userrole", "manager");
                }
                else{
                    sessionStorage.setItem("userrole", "employee");
                }
            }
            toast("You are logged in", {
                icon: {type: 'success'}
            });
            Redirect("/new-courses");
        }).catch(() => {
        toast("Your information is incorrect please try again!", {
            icon: {type: 'custom', content: '❌'}
        });
    });
}

export function logout(){
    axios.get(gateway + "/authentication/logout",  {withCredentials: true})
        .then(res => {
            console.log(res.data);
        });
    sessionStorage.clear();
}

export function isLogedIn(){
    return sessionStorage.getItem("username") !== null;
}

export async function getVideosOfCourse(courseId){
    let url = gateway + "/course/getAllVideosByCourseId";

    return await axios.post(url,
        {
            id: courseId
        }, {withCredentials: true});
}

export async function getVideo(videoId){
    let url = gateway + "/video/get";
    return await axios.post(url,
        {
            id: videoId
        }, {withCredentials: true});
}

export async function getAllCourses(){
    let url = gateway + "/course/getAllCourses";
    return await axios.post(url,
        {
        }, {withCredentials: true});
}

export async function getAllLiveTrainings(){
    let url = gateway + "/course/getAllLinks";
    return await axios.get(url,
        {
        }, {withCredentials: true});
}

export async function createLiveMeeting(linkObject){
    let url = gateway + "/course/createLink";
    return await axios.post(url,
        {
            platform: linkObject.platform,
            meetingTime: linkObject.meetingTime,
            capacity: linkObject.capacity,
            meetingLink: linkObject.meetingLink,
            courseId: linkObject.courseId
        }, {withCredentials: true});
}

export async function getAllEmployees(){
    let url = gateway + "/employees/getAll";
    return await axios.get(url,
    {
    }, {withCredentials: true});
}

export async function getAllEmployeesWithEmployeeRole(){
    let url = gateway + "/employees/getAllEmployeeRole";
    return await axios.get(url,
    {
    }, {withCredentials: true});
}

export async function assignTraining(requestData){
    let url = gateway + "/assignment/createAssignment";
    let courseId = requestData.courseId;

    requestData.employees.map(emp => (
        axios.post(url,
        {
            courseId: courseId,
            employeeId: emp,
            managerId: requestData.managerId,
            deadline: requestData.deadline
        }, {withCredentials: true})
    ))
}

export async function assignToAllEmployees(requestData){
    let url = "http://127.0.0.1:9000/";
    axios.post(url,
    {
        courseId: requestData.courseId,
        employees: requestData.employees,
        managerId: requestData.managerId,
        deadline: requestData.deadline
    }, {withCredentials: true})
}

export async function getApprovalRequest(managerStatus = null){
    if(sessionStorage.getItem('userrole') === "manager"){
        if(managerStatus !== null){
            if(managerStatus === "asManager"){

                return await axios.post(gateway + "/approvalRequest/get/manager",
                    {
                        managerId: sessionStorage.getItem("userid"),
                    },
                    {withCredentials: true}).then(

                );
            }
            else if(managerStatus === "asEmployee"){
                return await axios.post(gateway + "/approvalRequest/get/employee",
                    {
                        employeeId: sessionStorage.getItem("userid"),
                    },
                    {withCredentials: true});
            }
        }

    }

    else if(sessionStorage.getItem('userrole') === "employee"){
        return await axios.post(gateway + "/approvalRequest/get/employee",
            {
                employeeId: sessionStorage.getItem("userid"),
            },
            {withCredentials: true});

    }
    else{
        return await axios.get(gateway + "/approvalRequest/getAll",{withCredentials: true});
    }
}

export async function updateApprovalRequest(approvalRequestId, decision){
    return await axios.put(gateway + "/approvalRequest/update", {
        id: sessionStorage.getItem("userid"),
        role: sessionStorage.getItem("userrole"),
        approvalRequestId: approvalRequestId,
        decision: decision
    })
}

export async function getEmployeeById(id){
    return await axios.post(gateway + "/employees/get",
        {
            id: id
        },
        {withCredentials: true});
}

export async function getCourseById(id){
    return await axios.post(gateway + "/course/getCourse", {id: id}, {withCredentials: true});
}

export async function getEmployees(){
    if(sessionStorage.getItem("userrole") === "manager"){
        return await axios.post(gateway + "/management/get/managerId", { id: sessionStorage.getItem("userid")},{withCredentials: true});
    }
    else if(sessionStorage.getItem("userrole") === "admin"){
        return await axios.get(gateway + "/employees/getAll", {withCredentials: true});
    }
}

export async function createNewManagement(employeeId, managerId){
    return axios.post(gateway + "/management/create", {
        employeeId: employeeId,
        managerId: managerId
    }, {withCredentials: true})
}

export async function deleteManagement(managementId){
    return axios.post(gateway + "/management/delete", {
        managementId: managementId
    }, {withCredentials: true})
}

export async function getAllManagement(){
    return axios.get(gateway + "/management/getAll", {withCredentials: true});
}

export async function getAllVideoCourseMatchings(){
    let url = gateway + "/course/getAllVideoCourseMatchings";
    return await axios.get(url,{withCredentials: true});
}

export async function updateCourse(course,newName,newDesc){
    return axios.put(gateway + "/course/updateCourse", {
        id: course.id,
        name: newName,
        description: newDesc,
        duration: course.duration,
        isLive: course.isLive,
        categoryId: course.categoryId
    }, {withCredentials: true});
}

export async function removeVideoFromCourse(matchId){
    return await axios.post(gateway + "/course/deleteVideoCourseMatching", {
        id: matchId
    }, {withCredentials: true});
}

export async function deleteCourseById(id){
    return await axios.post(gateway + "/course/deleteCourse",
        {
            id: id
        },
        {withCredentials: true});
}

export async function createEmployee(employee){
    let url = gateway + "/employees/create";
    return await axios.post(url,
        {
            name: employee.name,
            surname:employee.surname,
            email:employee.email ,
            username: employee.username,
            password:employee.password ,
            positionName: employee.positionName,
            isManager: employee.isManager
        }, {withCredentials: true});
}

export async function updateEmployee(employee){
    return await axios.put(gateway + "/employees/update", {
        id: employee.id,
        name: employee.name,
        surname: employee.surname,
        username: employee.username,
        password: employee.password,
        email: employee.email,
        positionName: employee.positionName,
        isManager: employee.isManager
    })
}

export async function deleteEmployeeById(id){
    return await axios.post(gateway + "/employees/delete",
        {
            id: id
        },
        {withCredentials: true});
}

export async function createCourse(course){
    let url = gateway + "/course/createCourse";
    return await axios.post(url,
        {
            name: course.name,
            description: course.description,
            coverPhotoPath: course.coverPhotoPath ,
            duration: course.duration,
            isLive: course.isLive,
            categoryId: course.categoryId
        }, {withCredentials: true});
}

export async function getVideoToken(videoId){
    let url = gateway + "/stream/videoToken";
    return await axios.post(url,
        {
            videoId: videoId
        }, {withCredentials: true});
}



export async function getEnrollmentWithEmployeeId(employeeId){
    return await axios.post(gateway + "/enrollment/get/employeeId", {
        id: employeeId,
        role: "employee"
    }, {withCredentials: true});
}

export async function getEnrollmentWithCourseId(courseId){
    return await axios.post(gateway + "/enrollment/get/courseId", {
        courseId: courseId
    }, {withCredentials: true});
}

export async function getProgressWithEmployeeId(employeeId){
    return await axios.post(gateway + "/reporting/getProgressWithEmployeeId",{
        id: employeeId
    }, {withCredentials: true})
}

export async function getProgressWithEmployeeIdAndVideoID(videoId){
    return await axios.post(gateway + "/reporting/getProgressWithEmployeeIdAndVideoID",{
        videoId: videoId
    }, {withCredentials: true})
}

export async function createProgress(videoId){
    return await axios.post(gateway + "/reporting/createProgress",{
        videoId: videoId,
        watchedTime: 0
    }, {withCredentials: true})
}

export async function updateProgress(videoId, watchTime){
    return await axios.put(gateway + "/reporting/updateProgress",{
        videoId: videoId,
        watchedTime: watchTime
    }, {withCredentials: true})
}

export async function getAssignmentWithManager(employeeId){
    return await axios.post(gateway + "/assignment/getWithManager", {
        id: employeeId,
    }, {withCredentials: true});
}

export async function getAssignmentWithEmployee(employeeId){
    return await axios.post(gateway + "/assignment/getWithEmployee", {
        id: employeeId,
    }, {withCredentials: true});
}

export async function sendApprovalRequest(requestData){
    return await axios.post(gateway + "/approvalRequest/create", {
        courseId: requestData.courseId,
        employeeId: requestData.employeeId
    }, {withCredentials: true});
}

export async function getApprovalRequestsWithEmployee(requestData){
    return await axios.post(gateway + "/approvalRequest/get/employee", {
        employeeId: requestData.employeeId
    }, {withCredentials: true});
}

export async function getEnrolledCourses(employeeId){
    return await axios.post(gateway + "/course/getAllCoursesOfEmployee", {
        employeeId: employeeId
    }, {withCredentials: true});
}

export async function createVideo(formData){
    return await axios.post("http://localhost:5001/api/video/register", formData, {withCredentials: true, headers: {'content-type': 'multipart/form-data'}});
}

export async function getAllVideos(){
    return await axios.post(gateway + "/video/getAll",  {}, {withCredentials:true});
}

export async function deleteVideo(id){
    return await axios.post(gateway + "/video/erase",  {id:id}, {withCredentials:true});
}

export async function updateVideo(video){
    return await axios.put("http://localhost:5001/api/video/update", video, {withCredentials: true});
}

export async function getVideoById(id){
    return await axios.post("http://localhost:5001/api/video/get", {id:id}, {withCredentials: true});
}

export async function createVideoCourseMatching(videoId, order, courseId){
    return await axios.post(gateway + "/course/createVideoCourseMatching", {
        videoId: videoId,
        order: order,
        courseId: courseId
    }, {withCredentials:true});
}

export async function getAllCategories(){
    return await axios.post(gateway + "/course/getAllCategories", {}, {withCredentials: true});
}

export async function getCategoryById(id){
    return await axios.post(gateway + "/course/getCategory", {id:id}, {withCredentials: true});
}

export async function updateCategoryById(payload){
    return await axios.put(gateway + "/course/updateCategory", payload, {withCredentials: true});
}

export async function deleteCategoryById(id){
    return await axios.post(gateway + "/course/deleteCategory", {id:id}, {withCredentials: true});
}

export async function createCategoryById(payload){
    return await axios.post(gateway + "/course/createCategory", payload, {withCredentials: true});
}

export default login;