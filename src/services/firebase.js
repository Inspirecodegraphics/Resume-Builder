import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDPpqKWxp22oLzvbPbI_B0_O7aXyGiwYw0",
	authDomain: "inspire-resume.firebaseapp.com",
	projectId: "inspire-resume",
	storageBucket: "inspire-resume.appspot.com",
	messagingSenderId: "1058073675937",
	appId: "1:1058073675937:web:f0c64a1ce6658cbcfa48e0",
	measurementId: "G-W25EE9QC9G",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const firestore = firebase.firestore();
