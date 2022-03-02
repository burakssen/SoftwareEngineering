import {React, useEffect, useState} from "react";
import {getCategoryById, updateCategoryById} from "../endpoint/gateway";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

const EditCategory = () => {
    const [name, setName] = useState("");

    let navigate = useNavigate();
    let params = useParams();
    let categoryId = params.categoryId;

    useEffect(async () => {
        const response = await getCategoryById(categoryId);
        setName(response.data.category.name);
    }, []);

    const handleValidation = () => {
        let isFormValid = true;
        if(name === ""){
            Notification("Name is required", "error", 2000);
            isFormValid = false;
        }
        else{
            if(name.length < 2 || name.length > 32){
                Notification("Name should be between 2-32 characters", "error", 2000);
                isFormValid = false;
            }
        }
        return isFormValid;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(handleValidation()){
            const category = {
                id: categoryId,
                name: name,
            }

            updateCategoryById(category);
            navigate("/list-categories");
        }
    }

    return (
        <div>
            <Navbar/>
            <br/>
            <div className="container">
                <h2> Edit Category </h2>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <form className="row g-3">
                            <div className="col-md-3"/>
                            <div className="col-md-6">
                                <label htmlFor="categoryName">Name</label>
                                <input type="text" className="form-control" id="categoryName"  placeholder="Enter category name" defaultValue={name} onChange={(e)=> setName(e.target.value)}/>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary"  onClick={handleRegister}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EditCategory;