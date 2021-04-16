import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { generateUserDocument } from "../services/utils/auth";

export const AuthContext = createContext({ user: null });

export function useAuth() {
	return useContext(AuthContext);
}
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loginModalOpen, setLoginModalOpen] = React.useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged(async (userAuth) => {
			const user = await generateUserDocument(userAuth);
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);
	const value = {
		currentUser,
		loginModalOpen,
		setLoginModalOpen,
	};
	return (
		<AuthContext.Provider value={value}>
			{loading && "Loading"}
			{!loading && children}
		</AuthContext.Provider>
	);
}
