import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {
    Login,
    Courses,
    NewCourses,
    Course,
    CourseRequest,
    TrainingAssignment,
    EditEmployee,
    CreateLiveMeeting,
    ListEmployees,
    EmployeePerformance,
    Video,
    EditCourse,
    Register,
    CreateCourse,
    UploadVideo,
    ListVideo,
    EditVideo,
    ListCategories,
    EditCategory,
    CreateCategory,
    ListCourses
} from './pages/Pages'

import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";

const App = () => {
    return (
        <Router>
            <div className="App">
                <div className='content'>
                    <Routes>
                        <Route exact path="/" element={<Login/>}/>
                        <Route exact path="/enrolled-courses" element={
                            <RequireAuth>
                                <Courses/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/new-courses" element={
                            <RequireAuth>
                                <NewCourses/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/course/:courseid" element={
                            <RequireAuth>
                                <Course/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/course/:courseid/video/:videoId" element={
                            <RequireAuth>
                                <Video/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/course-request" element={
                            <RequireAuth>
                                <CourseRequest/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/create-live-meeting" element={
                            <RequireAuth>
                                <CreateLiveMeeting/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/training-assignment" element={
                            <RequireAuth>
                                <TrainingAssignment/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/edit-employee/:employeeid" element={
                            <RequireAuth>
                                <RequireAdmin>
                                    <EditEmployee/>
                                </RequireAdmin>
                            </RequireAuth>
                        }/>
                        <Route exact path="/list-employees" element={
                            <RequireAuth>
                                <ListEmployees/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/employee-performance/:employeeid" element={
                            <RequireAuth>
                                <EmployeePerformance/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/edit-course/:courseid" element={
                            <RequireAuth>
                                <RequireAdmin>
                                    <EditCourse/>
                                </RequireAdmin>
                            </RequireAuth>
                        }/>
                        <Route exact path="/list-courses" element={
                           <RequireAuth>
                                <RequireAdmin>
                                    <ListCourses/>
                                </RequireAdmin>
                           </RequireAuth>
                        }/>
                        <Route exact path="/register" element={
                            <RequireAuth>
                                <RequireAdmin>
                                    <Register/>
                                </RequireAdmin>
                            </RequireAuth>
                        }/>
                        <Route exact path="/create-course" element={
                            <RequireAuth>
                                <RequireAdmin>
                                    <CreateCourse/>
                                </RequireAdmin>
                            </RequireAuth>
                        }/>
                        <Route exact path="/upload-video" element={
                            <RequireAuth>
                                <RequireAdmin>
                                    <UploadVideo/>
                                </RequireAdmin>
                            </RequireAuth>
                        }/>
                        <Route exact path="/list-video" element={
                            <RequireAuth>
                                <RequireAdmin>
                                    <ListVideo/>
                                </RequireAdmin>
                            </RequireAuth>
                        }/>
                        <Route exact path="/edit-video/:videoId" element={
                            <RequireAuth>
                                <EditVideo/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/list-categories" element={
                            <RequireAuth>
                                <ListCategories/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/edit-category/:categoryId" element={
                            <RequireAuth>
                                <EditCategory/>
                            </RequireAuth>
                        }/>
                        <Route exact path="/create-category" element={
                            <RequireAuth>
                                <CreateCategory/>
                            </RequireAuth>
                        }/>
                        <Route  path="*" element={
                            <h1> 404: Not Found </h1>
                        }/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
