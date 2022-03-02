import React from 'react'

function CourseCard(props){
    return (
        <div className="col">
            <div className="card mb-4 box-shadow">
            <a href={'http://127.0.0.1:3000/course/' + props.id} >
                <img className="card-img-top" src={props.coverPhotoPath} alt='course cover' />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
                </a> 
            </div>
        </div>
    )
}

export default CourseCard