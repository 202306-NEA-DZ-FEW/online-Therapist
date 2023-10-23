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
    const [profilePicture, setProfilePicture] = useState(null);
    const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false); // State to track signup success
    const [user, setUser] = useState(null);

    const googleSignup = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("google user", user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const facebookSignup = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log("facebook user", user);
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential =
                    FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                // fetch facebook graph api to get user actual profile picture
                fetch(
                    `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
                )
                    .then((response) => response.blob())
                    .then((blob) => {
                        setProfilePicture(URL.createObjectURL(blob));
                    });

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    FacebookAuthProvider.credentialFromError(error);

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
                profilePicture,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
export function useAppcontext() {
    return useContext(AppContext);
}
