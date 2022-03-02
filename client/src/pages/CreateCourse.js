import { Component } from "react";
import {createCourse, getAllCategories, getAllVideos, createVideoCourseMatching} from "../endpoint/gateway";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
import '../styles/course.css'


class CreateCourse extends Component{

    constructor() {
        super();
        this.state = {
            isLive: false,
            name: "",
            description: "",
            coverPhotoPath: "",
            duration: 0,
            categoryId: 0,
            videos: [],
            selectedVideos: new Set(),
            selectedOrder: [],
            categories: []
        };
    }

    handleValidation(){
        let isFormValid = true;


        if(this.state.name === ""){
            Notification("Name is required!", "error", 2000);
            isFormValid = false;
        }
        else{
            if(this.state.name.length < 2 || this.state.name.length > 32){
                Notification("Name should be between 2-32 characters!", "error", 2000);
                isFormValid = false;
            }
        }

        if(this.state.description === ""){
            Notification("Description is required!", "error", 2000);
            isFormValid = false;
        }
        else{
            if(this.state.description > 200){
                Notification("Description should not be longer than 200 characters", "error", 2000);
                isFormValid = false;
            }
        }

        if(this.state.coverPhotoPath === ""){
            Notification("Cover Photo is required!", "error", 2000);
            isFormValid = false;
        }

        if(this.state.duration === ""){
            Notification("Duration is required!", "error", 2000);
            isFormValid = false;
        }

        if(!this.state.categoryId){
            Notification("Category Id is required!", "error", 2000);
            isFormValid = false;
        }
        return isFormValid;
    }

    async componentDidMount(){
        let response = await getAllVideos();
        this.setState({videos: response.data.Videos});
        let categoryResponse = await getAllCategories();
        this.setState({categories: categoryResponse.data.allCategories})
    }

    render(){

        const handleSelection = (evt) => {
            if(evt.checked){
                this.state.selectedVideos.add(evt.value);
            }else{
                this.state.selectedVideos.delete(evt.value);
            }
        }

        const handleOrder = (videoId, value) => {
            this.state.selectedOrder[videoId] = value;
        }
        const handleCreate = async (e) => {
            e.preventDefault();
            if(this.handleValidation()){
                const course = {
                    name: this.state.name,
                    description: this.state.description,
                    coverPhotoPath: this.state.coverPhotoPath,
                    duration: this.state.duration,
                    isLive: this.state.isLive,
                    categoryId: parseInt(this.state.categoryId),
                }
                let response = await createCourse(course);
                let courseId = response.data.newCourse.id;

                let responseVideo;
                for(let i = 0; i< this.state.selectedVideos.size; i++){
                    responseVideo = await createVideoCourseMatching(parseInt([...this.state.selectedVideos][i]), parseInt(this.state.selectedOrder[[...this.state.selectedVideos][i]]), parseInt(courseId));
                }

                if(responseVideo.status === 200){
                    Notification("Videos are added to course successfully", "success", 2000);
                }
                else{
                    Notification("Something went wrong please try again later", "error", 2000);
                }

                if(response.status === 200){
                    Notification("Course created successfully", "success", 2000);
                }
                else{
                    Notification("Something went wrong please try again later", "error", 2000);
                }
            }
        }

        return(
            <div>
                <Navbar/>
                <br/>
                <div className="container">
                    <h2> Create A Course </h2>
                    <div className="album py-5 bg-light">
                        <div className="container">
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="name">Course Name</label>
                                    <input type="text" className="form-control" id="name"  placeholder="Enter name" onChange={(e)=>{this.setState({name: e.target.value})}}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="surname">Course Category</label>
                                    <select className="form-control" onChange={(e) => {this.setState({categoryId: e.target.value})}}>
                                        {
                                            this.state.categories.map((category)=>(
                                                <option key={category.id} value={category.id} >{category.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="positionName">Course Description</label>
                                    <input type="text" className="form-control" id="description"  placeholder="Enter description"  onChange={(e)=>{this.setState({description:(e.target.value)})}}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email">Duration</label>
                                    <input type="email" className="form-control" id="duration" aria-describedby="emailHelp" placeholder="Enter duration"  onChange={(e)=>{this.setState({duration: e.target.value})}}/>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="username">Cover Photo Path</label>
                                    <input type="text" className="form-control" id="path"  placeholder="Enter cover photo's path"  onChange={(e)=>{this.setState({coverPhotoPath: e.target.value})}}/>
                                </div>

                                <div className="col">
                                    <input type="checkbox" className="form-check-input"  onClick={(e)=> (this.setState({isLive: !this.state.isLive}))}/>
                                    <label className="form-check-label" htmlFor="isManager">&ensp;Live </label>
                                </div>
                                {
                                    !this.state.isLive &&
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">Select</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Video Order</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.videos.map(video => (
                                            <tr key={video.id}>
                                                <td><input type="checkbox" onClick={e => handleSelection(e.target)}
                                                           value={video.id} /></td>
                                                <td>{video.title}</td>
                                                <td>{video.duration}</td>
                                                <td><input type="number" className="form-control center-search-10" onChange={(e) => {handleOrder(video.id,e.target.value)}}/></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                }

                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary"  onClick={(e)=>handleCreate(e)}>Create </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CreateCourse;