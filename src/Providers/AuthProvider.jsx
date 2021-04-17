import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
import {
	generateUserDocument,
	generateResumeDocument,
} from "../services/utils/auth";
import { v4 as uuidv4 } from "uuid";

export const AuthContext = createContext({ user: null });

export function useAuth() {
	return useContext(AuthContext);
}
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [currentResume, setCurrentResume] = useState();
	const [loginModalOpen, setLoginModalOpen] = React.useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged(async (userAuth) => {
			const id = uuidv4();
			generateResumeDocument(id, userAuth, updateResume);
			const user = await generateUserDocument(userAuth, id);
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);
	const updateResume = (resume) => {
		setCurrentResume(resume);
	};
	const value = {
		currentResume,
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
