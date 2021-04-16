import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
	const { currentUser, setLoginModalOpen } = useAuth();
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!currentUser) {
					setLoginModalOpen(true);
					return (
						<Redirect
							to={{ pathname: "/login", state: { from: props.location } }}
						></Redirect>
					);
				}
				return Component ? <Component {...props}></Component> : render(props);
			}}
		></Route>
	);
};

export default ProtectedRoute;
