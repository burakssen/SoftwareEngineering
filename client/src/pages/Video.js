import Navbar from "../components/Navbar";
import '../styles/course.css'
import {useParams} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import {
    createProgress,
    getCourseById,
    getProgressWithEmployeeIdAndVideoID,
    getVideo,
    getVideosOfCourse, updateProgress
} from "../endpoint/gateway";
import {getVideoToken} from "../endpoint/gateway";
import ReactPlayer from 'react-player'
const Video = () => {
    const [token, setToken] = useState();
    const [course, setCourse] = useState();
    const [videos, setVideos] = useState([]);
    const [currentVideoTitle, setCurrentVideoTitle] = useState();
    const [currentVideoDesc, setCurrentVideoDesc] = useState();
    const player = useRef();


    let params = useParams();
    let courseId = params.courseid;
    let currentVideoID = params.videoId;

    async function progressTracker(progress){
        await updateProgress(currentVideoID, Math.ceil(progress.played * 100));
    }

    async function handleSeek(time){
        player.current.seekTo((time/100), 'fraction')
    }

    useEffect(async () => {
        const tokenResult = (await getVideoToken(currentVideoID)).data.token;
        setToken(tokenResult);
        const allVideos = [];
        const videoIds = await getVideosOfCourse(courseId);
        const currentVideo = await getVideo(currentVideoID);
        setCurrentVideoTitle(currentVideo.data.Video.title);
        setCurrentVideoDesc(currentVideo.data.Video.description);
        let progress = null;
        let watchedFraction = 0
        try{
            progress = await getProgressWithEmployeeIdAndVideoID(currentVideo.data.Video.id);
            watchedFraction = progress.data.updatedProgress.watchedTime;
        }catch (err){
            await createProgress(currentVideo.data.Video.id)
        }
        console.log(watchedFraction)
        handleSeek(watchedFraction);
        const courseInfo = await getCourseById(courseId);

        setCourse(courseInfo.data.course);

        for (let i = 0; i < videoIds.data.allVideos.length; i++) {
            let videoId = videoIds.data.allVideos[i].id;
            const video = await getVideo(videoId);
            allVideos.push(video.data.Video);
        }
        setVideos(allVideos);
    }, []);

    return (

        <div className="displayVideos">
            <Navbar/>
            <h1 className="jumbotron-heading">{course && course.name}</h1>
            <br/>
            <div className="container">
                <div className="row" >
                    <div className="col-md-10">
                    <div className="row" >
                        {
                            token &&
                            <ReactPlayer
                                ref={player}
                                className='react-player'
                                width='100%'
                                height='100%'
                                loop={false}
                                onProgress={(progress) => progressTracker(progress)}
                                url={ "http://127.0.0.1:5001/api/stream/" + token}
                                controls={true}
                                config={{ file: {attributes: {crossOrigin: 'use-credentials'}}}}
                                progressInterval={2000}
                            />
                        }
                        <h2> {currentVideoTitle}</h2>
                        <p> {currentVideoDesc}</p>
                    </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row">
                            <div id="scroll-column">
                                <div class="list-group">
                                    {videos.map(video => (

                                        <a href={"/course/" + courseId + "/video/" + video.id} key = {video.id}>
                                            <div className="card mb-4 box-shadow">
                                                <img className="card-img" src={process.env.PUBLIC_URL + '/assets/'+ video.id +'.jpg'} alt='video cover' />
                                                <div className="card-body">
                                                    <h5 className="card-text">{video.title}</h5>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video;