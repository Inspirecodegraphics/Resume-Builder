import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";
import Button from "@material-ui/core/Button";

const Login = () => {
	const { currentUser, setLoginModalOpen } = useAuth();

	if (currentUser) return <Redirect to="/"></Redirect>;

	return (
		<div className="container text-center p-5">
			<div className="row">
				<div className="col">
					<h4 className="text-center">
						"You shall not pass" without authentication
					</h4>
					<Button
						variant="outlined"
						onClick={() => setLoginModalOpen(true)}
						className="my-3"
					>
						Sign In For Free
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Login;
