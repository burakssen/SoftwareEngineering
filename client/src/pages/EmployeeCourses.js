import React from "react";
import Navbar from "../components/Navbar";
import '../styles/course.css'

import { 
    getAllCourses, 
    getAllLiveTrainings, 
    getEnrollmentWithCourseId, 
    sendApprovalRequest, 
    getApprovalRequestsWithEmployee,
    getEnrolledCourses
} from "../endpoint/gateway";
import Notification from "../components/Notification";

export default class NewCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            allCourses: [],
            liveTrainings: [],
            allLiveTrainings: [],
            numberOfEnrolledEmployeesInCourse: {},
            requestedCourses: new Set(),
            enrolledCourses: new Set(),
            categories: [],
            searchInput: ''
        }
    }

    async componentDidMount() {
        Notification("Loading", "loading", 2000);
        const courses = await getAllCourses();
        const allLiveTrainings = await getAllLiveTrainings();
        const enrolledCourses = await getEnrolledCourses(sessionStorage.getItem("userid"));

        let enrolledCourseSet = new Set();
        for(let i=0; i<enrolledCourses.data.result.enrolledCourses.length; i++){
            let enrCourse = enrolledCourses.data.result.enrolledCourses[i];
            enrolledCourseSet.add(enrCourse.id);
        }
        let categorieIdsSet = new Set();
        let categorieNamesSet = new Set();
        let categorieIdsArray = [];
        let categorieNamesArray = [];
        courses.data.allCourses.forEach(course => {
            categorieIdsSet.add(course.category.id);
            categorieNamesSet.add(course.category.name);
        });

        categorieIdsArray = [...categorieIdsSet];
        categorieNamesArray = [...categorieNamesSet];

        let cat = [{id: -1, name:"No Filter"}]
        for(let i = 1; i < categorieNamesSet.size + 1; i++){
            cat[i] = {id: categorieIdsArray[i - 1], name: categorieNamesArray[i - 1]}
        }

        courses.data.allCourses.sort((x, y) => {
            if (x.id < y.id) {
                return 1;
            }
            if (x.id > y.id) {
                return -1;
            }
            return 0;
        });

        this.setState({categories: cat});
        this.setState({allCourses: courses.data.allCourses});
        this.setState({courses: courses.data.allCourses});
        this.setState({allLiveTrainings: allLiveTrainings.data.allLinks});
        this.setState({liveTrainings: allLiveTrainings.data.allLinks});
        this.setState({enrolledCourses: enrolledCourseSet});

        for(let i=0; i<this.state.liveTrainings.length; i++){
            let courseId  = parseInt(this.state.liveTrainings[i].courseId);
            let nofEnrolledEmployee = await this.getNumberOfEnrolledEmployeesInCourse(courseId);
            const newNofEnrolled = { ...this.state.numberOfEnrolledEmployeesInCourse, [courseId] : nofEnrolledEmployee };
            this.setState({numberOfEnrolledEmployeesInCourse : newNofEnrolled});
        }

        let employeeId = parseInt(sessionStorage.getItem("userid"));
        const data = await getApprovalRequestsWithEmployee(employeeId);
        const enrollmentRequests = data.data.approvalRequests;

        let set = new Set();
        for(let i=0; i<enrollmentRequests.length; i++){
            if(parseInt(enrollmentRequests[i].status) === 0){
                let courseId  = parseInt(enrollmentRequests[i].courseId);
                set.add(courseId);
            }
        }

        this.setState({requestedCourses : set});
        this.handleLiveMeetingSelection("Upcoming");
    }

    async getNumberOfEnrolledEmployeesInCourse(courseId) {
        const enrollments = await getEnrollmentWithCourseId(courseId);
        return enrollments.data.enrollments.length;
    }

    sendEnrollmentRequest = async (courseId) => {
        let employeeId = sessionStorage.getItem("userid");
        const requestData = {
            employeeId: employeeId,
            courseId: courseId
        }

        let set = this.state.requestedCourses;
        set.add(courseId);

        this.setState({requestedCourses : set});
        await sendApprovalRequest(requestData);
    }

    dateFormatter(isoDate){
        let date = new Date(isoDate);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        let time = date.getUTCHours();
        let min = date.getHours();

        if (time < 10) {
            time = '0' + time;
        }
        if (min < 10) {
            min = '0' + min;
        }

        return dt + '/' + month + '/' + year + '  ' + time + ':' + min;
    }

    handleCategorySelection(categoryId){
        if(categoryId === -1){
            this.setState({courses: this.state.allCourses});
        }
        else{
            this.setState(
                {courses: this.state.allCourses.filter(course => {
                        return course.categoryId === categoryId;
                    })})
        }
    }

    handleLiveMeetingSelection(type){
        if(type === "Passed"){
            this.setState({liveTrainings: this.state.allLiveTrainings.filter(training => {
                    let now = new Date();
                    let deadline = new Date(training.meetingTime);
                    return (deadline.getTime() < now.getTime());
                })});
        }
        else if(type === "Upcoming"){
            this.setState({liveTrainings: this.state.allLiveTrainings.filter(training => {
                    let now = new Date();
                    let deadline = new Date(training.meetingTime);
                    return (deadline.getTime() >= now.getTime());
                })});
        }
    }

    handleSearch(event){
        this.setState({
            searchInput: event.target.value
        })

        if(this.state.searchInput.length === 1){
            this.setState({courses: this.state.allCourses});
        }
        else{
            this.setState({courses: this.state.allCourses.filter(course => {
                    return course.name.toLowerCase().includes(this.state.searchInput.toLowerCase());
                })})
        }
    }

    render() {
        const courses = this.state.courses;
        const liveTrainings = this.state.liveTrainings;
        const categories = this.state.categories;

        return (
            <div className="displayCourses">
                <Navbar/>
                <div className="container">
                    <h1 className="jumbotron-heading"> Courses </h1>
                    <hr/>
                    <h4>Search</h4>
                    <input type="text" onChange={(e)=>{this.handleSearch(e)}} className="form-control w-50 center-search mb-5 mt-2" placeholder="search" aria-label="search" aria-describedby="basic-addon1" />
                    <h4>Categories</h4>
                    {
                        categories !== [] &&
                        categories.map((category) => (
                            <button key={category.id}  className ={ `btn ${category.id !== -1 ? "btn-outline-secondary" : "btn-warning" } m-1`} onClick={() => {
                                this.handleCategorySelection(category.id)
                            }}>{category.name}</button>
                        ))
                    }

                    <div className="album py-5 bg-light">
                        <div className="container">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                                {
                                    courses.map(course => (
                                            <div className="col" key={course.id}>
                                                <div className="card">
                                                    <a href={'http://127.0.0.1:3000/course/' + course.id}>
                                                        <img className="card-img-top"
                                                             src={course.coverPhotoPath}
                                                             alt='course cover'/>
                                                    </a>
                                                    <div className="card-body align-items-end">
                                                        <h5 className="card-title">{course.name}</h5>
                                                        <p className="card-text">{course.description}</p>
                                                    </div>
                                                    

                                                    {this.state.enrolledCourses.has(course.id) &&
                                                        <button className="btn btn-success"> Enrolled </button>
                                                    }

                                                    {
                                                        !this.state.enrolledCourses.has(course.id) && !this.state.requestedCourses.has(course.id) && sessionStorage.getItem('userrole') !== "admin" &&
                                                        <button onClick={() => this.sendEnrollmentRequest(course.id)}
                                                                className="btn btn-primary">Enrollment Request</button>
                                                    }

                                                    {
                                                        !this.state.enrolledCourses.has(course.id) && this.state.requestedCourses.has(course.id) &&
                                                        <button className="btn btn-warning">Request is pending..</button>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <h1 className="jumbotron-heading"> Live Trainings </h1>
                    <hr/>
                    <div className="albums py-2 bg-light">
                        <div className="container">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                                {

                                    <div className="w-50 center-search mb-1">
                                        <button className ="btn btn-outline-secondary m-1" onClick={() => {
                                            this.handleLiveMeetingSelection("Passed");
                                        }}>Passed</button>
                                        <button className ="btn btn-outline-secondary m-1"  onClick={() => {
                                            this.handleLiveMeetingSelection("Upcoming")
                                        }}>Upcoming</button>
                                    </div>
                                }
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Platform</th>
                                        <th scope="col">Meeting Date</th>
                                        <th scope="col">Meeting Link</th>
                                        <th scope="col">Capacity</th>
                                        {sessionStorage.getItem('userrole') !== "admin" &&
                                        <th scope="col">Enroll</th>}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {liveTrainings.map(link => (
                                        <tr key={link.id}>
                                            <td>{link.platform}</td>
                                            <td>{this.dateFormatter(link.meetingTime)}</td>
                                            <td> {(this.state.enrolledCourses.has(link.courseId) || sessionStorage.getItem('userrole') === "admin") &&
                                                <a style={{textDecoration: 'none'}}
                                                   href={link.meetingLink}> {link.meetingLink} </a>
                                            }
                                            </td>
                                            <td>{this.state.numberOfEnrolledEmployeesInCourse[link.courseId] || 0} / {link.capacity} </td>

                                            {
                                                sessionStorage.getItem('userrole') !== "admin" &&
                                                <td>
                                                {
                                                    this.state.enrolledCourses.has(link.courseId) &&
                                                    "Enrolled"
                                                }

                                                {  !this.state.enrolledCourses.has(link.courseId) && this.state.requestedCourses.has(link.courseId) &&
                                                    "Request is pending.."
                                                }
                                                {!this.state.enrolledCourses.has(link.courseId) && !this.state.requestedCourses.has(link.courseId) &&
                                                    <button onClick={() => this.sendEnrollmentRequest(link.courseId)}
                                                            disabled={this.state.numberOfEnrolledEmployeesInCourse[link.courseId] >= link.capacity}
                                                            className="btn btn-primary">Enrollment Request</button>
                                                }

                                                </td>
                                            }
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}