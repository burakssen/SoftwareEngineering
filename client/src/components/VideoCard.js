import React from 'react'
import {Link} from 'react-router-dom';

function Video(attributes){

    function fancyTimeFormat(duration)
    {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    return (
        <div className="col-md-4">
            <div className="card mb-4 box-shadow">
                <img className="card-img" src={process.env.PUBLIC_URL + '/assets/'+ attributes.id +'.jpg'} alt='video cover' />
                <div className="card-body">
                    <h5 className="card-text">{attributes.title}</h5>
                    <p className="card-text">{attributes.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <Link to={"/course/" + attributes.courseId + "/video/" + attributes.id   }><button type="button" className="btn btn-outline-secondary" >Watch</button></Link>
                        </div>
                        <small className="text-muted">{fancyTimeFormat(attributes.duration)}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video