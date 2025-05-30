import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {

	const [tempUserId, setTempUserId] = useState('');
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("ccps-user")) || null);

	return <AuthContext.Provider value={{ authUser, setAuthUser, tempUserId, setTempUserId }}>{children}</AuthContext.Provider>;
};

// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// export const useAuthContext = () => useContext(AuthContext);

// const getInitialUser = () => {
//   try {
//     const user = localStorage.getItem("ccps-user");
//     return user ? JSON.parse(user) : null;
//   } catch {
//     return null;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [tempUserId, setTempUserId] = useState('');
//   const [authUser, setAuthUser] = useState(getInitialUser());

//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser, tempUserId, setTempUserId }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
