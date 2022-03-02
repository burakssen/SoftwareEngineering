import '../styles/login.css'
import React, {useEffect, useState} from 'react';
import login, {isLogedIn} from '../endpoint/gateway';
import {toast} from "wc-toast";

const Login = () => {
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	let handleSubmit = async (e) => {
		e.preventDefault();

		if(username === ""){
			toast("Username is required", {
				icon: {
					type: "error"
				},
				duration: 3000
			})
		}

		if(password == ""){
			toast("Password is required", {
				icon: {
					type: "error"
				},
				duration: 3000
			})
		}

		if(username === "")
			return;

		if(password === "")
			return;

		await login(username, password);
	}

	return(
		<div className="container-fluid w-100 h-100 m-0 p-0">
			<div className="row w-100 h-100 m-0 fill">
				<div className="login-form responsive col-md-3 bg-color-1">
					<div className="row h-100 w-100 d-flex m-0 align-items-center">
						<div className="container-fluid p-0">
							<div className="logo p-5">
								<img src="/assets/logo.png" className="d-block w-100"/>
							</div>
							<form className="row-md-12 w-100 h-100" onSubmit={handleSubmit} >
								<input type="text" className="col-md-12 form-control p-2 mb-2" placeholder="Username" aria-label="Username"
									   aria-describedby="basic-addon1" name="username" onChange={(e) => {setUsername(e.target.value)}}/>
								<input type="password" className="col-md-12 form-control p-2 mb-2" placeholder="Password" aria-label="Password"
									   aria-describedby="basic-addon1" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
								<input type="submit" className="btn bg-color-2 p-2 w-50" value="LogIn"/>
							</form>
						</div>
					</div>
				</div>
				<div className="responsive content bg-color-2 col-md-9 m-0 p-0 fill d-flex justify-content-center align-items-center">
					<img src="/assets/login-cover_50.png" className="login-cover d-block" />
				</div>
			</div>
			<a className="contrib" href='https://www.freepik.com/vectors/blue'>Blue vector created by vectorjuice - www.freepik.com</a>
		</div>
	);
}

export default Login;