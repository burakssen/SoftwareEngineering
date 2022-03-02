import '../styles/styles.css'
import Navbar from "../components/Navbar";
import {useState, useEffect} from "react";
import {getAllVideos} from "../endpoint/gateway";
import VideoRow from "../components/VideoRow";

const ListVideo = () => {
    let [videoInfo, setVideoInfo] = useState([]);
    useEffect(async ()=>{
        let response = await getAllVideos();
        console.log(response)
        if(sessionStorage.getItem('userrole') === "admin"){
            for(let i = 0; i < response.data.Videos.length; i++){
                setVideoInfo(prevState => [...prevState, response.data.Videos[i]]);
            }
        }
    }, [])

    return (
        <div className="all-employees">
            <Navbar/>
            <div className="container mt-5">
                <h2> Videos </h2>
                <br/>
                <table className="table" >
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Duration</th>
                    </tr>
                    </thead>
                    <tbody>
                    {videoInfo.map(video => (
                        <VideoRow key={video.id} id={video.id} title={video.title} duration={video.duration}/>
                    ))}
                    </tbody>
                </table>
            </div>
            <br/>
        </div>
    );
}
export default ListVideo;