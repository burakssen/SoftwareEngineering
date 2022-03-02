import '../styles/styles.css'
import Navbar from "../components/Navbar";
import {useState, useEffect} from "react";
import {getAllCategories} from "../endpoint/gateway";
import CategoryRow from "../components/CategoryRow";

const ListCategories = () => {
    let [categoryInfo, setCategoryInfo] = useState([]);
    useEffect(async ()=>{
        let response = await getAllCategories();
        console.log(response)
        if(sessionStorage.getItem('userrole') === "admin"){
            for(let i = 0; i < response.data.allCategories.length; i++){
                setCategoryInfo(prevState => [...prevState, response.data.allCategories[i]]);
            }
        }
    }, [])

    return (
        <div className="all-employees">
            <Navbar/>
            <div className="container mt-5">
                <h2> Categories </h2>
                <br/>
                <table className="table" >
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categoryInfo.map(category => (
                        <CategoryRow key={category.id} id={category.id} name={category.name}/>
                    ))}
                    </tbody>
                </table>
            </div>
            <br/>
        </div>
    );
}
export default ListCategories;