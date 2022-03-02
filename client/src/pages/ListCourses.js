import '../styles/styles.css'
import Navbar from "../components/Navbar";
import CourseRow from "../components/CourseRow"
import React, {useState, useEffect} from "react";
import {getAllCourses} from "../endpoint/gateway";

const ListCourses = () => {
    let [courses, setCourses] = useState([]);
    let [allCourses, setAllCourses] = useState([]);
    let isAdmin = (sessionStorage.getItem('userrole') === "admin");
    let [searchInput, setSearchInput] = useState('');

    useEffect(async ()=>{
        let response = await getAllCourses();
        setCourses(response.data.allCourses);
        setAllCourses(response.data.allCourses);
    }, [])

    const handleSearch = (event) =>{
        setSearchInput(event.target.value);

        if(searchInput.length === 1){
            setCourses(allCourses);
        }
        else{
            setCourses( allCourses.filter(course => {
                return course.name.toLowerCase().includes(searchInput.toLowerCase());
            }));
        }
    }

    return (
        <div className="all-employees">
            <Navbar/>
            <div className="container mt-5">
                <h2> Courses </h2>
                <br/>
                <input type="text" onChange={(e)=>{handleSearch(e)}} className="form-control w-50 center-search mb-5 mt-2" placeholder="search" aria-label="search" aria-describedby="basic-addon1" />
                <table className="table" >
                    <thead>
                    <tr>
                        <th scope="col">Course Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Is Live?</th>
                        <th scope="col">Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        courses &&
                        courses.map(course => (
                            <CourseRow key={course.id} id={course.id} name={course.name} category={course.category}
                                         duration={course.duration}  isLive={course.isLive} />
                        ))}
                    </tbody>
                </table>
            </div>
            <br/>
        </div>
    );
}
export default ListCourses;