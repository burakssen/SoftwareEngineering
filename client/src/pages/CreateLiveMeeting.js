import {React, useState, useEffect } from "react";
import { createLiveMeeting, getAllCourses } from "../endpoint/gateway";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

export function CreateLiveMeeting() {
  const [platform, setPlatform] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [course, setCourse] = useState();
  const [courses, setCourses] = useState([]);

  useEffect(async () => {
    const allCourses = await getAllCourses();
    setCourses(allCourses.data.allCourses);
  }, []);

  const handleValidation = () => {
      let isFormValid = true;
      if(meetingLink === ""){
          Notification("Meeting Link is Required", "error", 2000);
          isFormValid = false;
      }

      if(meetingTime === ""){
          Notification("Meeting Date is Required", "error", 2000);
          isFormValid = false;
      }

      if(capacity === 0){
          Notification("Capacity must be bigger than 0", "error", 2000);
          isFormValid = false;
      }

      return isFormValid;
  }

  const handleSubmit = async (evt) => {
      evt.preventDefault();
      if(handleValidation()){
          const requestData = {
              platform: platform,
              meetingLink: meetingLink,
              meetingTime: meetingTime,
              capacity: capacity,
              courseId: course
          }
          let response = await createLiveMeeting(requestData);
          if(response.status === 200){
              Notification("Live Meeting created successfully", "success", 2000);
          }
          else{
              Notification("Something went wrong please try again later", "error", 2000);
          }
      }
  }

  return (
        <div>
            <Navbar/>
            <br/>
            <div className="container">
            <h2> Create Live Meeting </h2>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label>Course:</label>
                                <select className="form-control" onChange={e => setCourse(e.target.value)} value={course}>
                                    {courses.map(course => (
                                        <option key={course.id} value={course.id}>{course.name}</option>
                                    ))} 
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label>Platform:</label>
                                <select className="form-control" onChange={e => setPlatform(e.target.value)} value={platform}>
                                    <option value="Zoom">Zoom</option>
                                    <option value="Google Meets">Google Meets</option>
                                    <option value="Microsoft Teams">Microsoft Teams</option>
                                </select>
                            </div>
                            
                            <div className="col-12">
                                <label> Meeting Link:</label>
                                <input className="form-control" type="text"  value={meetingLink} onChange={e => setMeetingLink(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label>Meeting Date:</label>
                                <input className="form-control"
                                type="datetime-local"
                                value={meetingTime}
                                onChange={e => setMeetingTime(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Capacity:</label>
                                <input
                                className="form-control"
                                type="number"
                                value={capacity}
                                onChange={e => setCapacity(e.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary"  onClick={handleSubmit}>Create Live Meeting</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>














  );
}

export default CreateLiveMeeting;

