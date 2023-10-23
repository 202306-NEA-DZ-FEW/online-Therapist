import { createContext, useContext, useEffect, useState } from "react";
import {
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    onAuthStateChanged,
    FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@/util/firebase";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false); // State to track signup success
    const [user, setUser] = useState(null);

    const googleSignup = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const facebookSignup = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                setUser(result.user);

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential =
                    FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                console.log(error);

                // ...
            });
    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const logged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else setUser(null);
        });
        return () => logged();
    }, []);

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                googleSignup,
                logOut,
                setIsSignUpSuccessful,
                isSignUpSuccessful,
                facebookSignup,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
export function useAppcontext() {
    return useContext(AppContext);
}
