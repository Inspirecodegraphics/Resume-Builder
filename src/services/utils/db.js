import { firestore as db } from "../firebase";
import { auth } from "./../firebase";

const user = auth().currentUser;

export const getResumes = async () => {
	try {
		let resume = {};
		db.doc(`users/${user.uid}/resumes/${"1"}`).onSnapshot((doc) => {
			console.log("Current data: ", doc.data());
			resume = doc.data();
			return doc.data();
		});
		return resume;
	} catch (error) {
		console.error("Error fetching Document", error);
	}
};

export const writeResume = async (data, uid, resumeId) => {
	const ref = `/users/${uid}/resumes/${resumeId}`;
	try {
		const resumeCollection = await db.doc(ref).update(data);
		return resumeCollection;
	} catch (error) {
		console.error("Error fetching Document", error);
	}
};
