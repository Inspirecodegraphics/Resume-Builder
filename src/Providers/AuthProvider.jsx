import React, {
	Component,
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";
import { auth } from "../services/firebase";
import { generateUserDocument } from "../services/utils/auth";

export const AuthContext = createContext({ user: null });

export function useAuth() {
	return useContext(AuthContext);
}
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
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
	};
	return (
		<AuthContext.Provider value={value}>
			{loading && "Loading"}
			{!loading && children}
		</AuthContext.Provider>
	);
}
// class UserProvider extends Component {
// 	state = {
// 		user: null,
// 	};

// 	componentDidMount = async () => {
// 		auth().onAuthStateChanged(async (userAuth) => {
// 			const user = await generateUserDocument(userAuth);
// 			this.setState({ user });
// 		});
// 	};

// 	render() {
// 		const { user } = this.state;

// 		return (
// 			<AuthContext.Provider value={user}>
// 				{this.props.children}
// 			</AuthContext.Provider>
// 		);
// 	}
// }

// export default UserProvider;
