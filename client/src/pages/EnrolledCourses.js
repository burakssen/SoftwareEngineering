import React from "react";
import '../styles/styles.css'
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";
import { getEnrolledCourses } from "../endpoint/gateway";
import Notification from "../components/Notification";

export default class EnrolledCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

  async componentDidMount() {
    Notification("Loading", "loading", 3000);
    const employeeId = sessionStorage.getItem("userid");
    const enrolledCourses = await getEnrolledCourses(employeeId);
    this.setState({courses: enrolledCourses.data.result.enrolledCourses});
  }

  render() {
    const courses = this.state.courses;
    return(
        <div className="displayCourses">
            <Navbar/>
            <div className="container">
                <h1 className="jumbotron-heading">Enrolled Courses </h1>
                <hr/>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                        {courses.length > 0 &&
                            courses.map(course => (
                                <CourseCard key={course.id} id={course.id} name={course.name} coverPhotoPath={course.coverPhotoPath}  description={course.description}>
                                </CourseCard>
                        ))}

                        {
                            courses.length === 0 &&
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width:'100%'}}>
                                <h2> You have not registered for a course yet! </h2>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}