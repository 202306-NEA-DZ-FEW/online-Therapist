import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/util/firebase";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from "firebase/auth";

const AuthContext = createContext();

export function AppWrapper({ children }) {
    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const [profilePicture, setProfilePicture] = useState(null);

    const AuthWithGoogle = () => {
        // Implement Google login using Firebase here
        signInWithPopup(auth, googleProvider)
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
                console.log("can't log in", errorMessage, " ", errorCode);
                // The email of the user's account used.
                const email = error.customData.email;
                console.log("wrong email", email);
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                console.log("error", credential);
                // ...
            });
    };

    const AuthWithFacebook = () => {
        // Implement Facebook login using Firebase here
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log("facebook user", user);
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential =
                    FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                fetch(
                    `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
                )
                    .then((response) => response.blob())
                    .then((blob) => {
                        setProfilePicture(URL.createObjectURL(blob));
                    });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                // console.log("wrong email", email);
                // The AuthCredential type that was used.
                const credential =
                    FacebookAuthProvider.credentialFromError(error);
                // console.log("error", credential);

                // ...
            });
    };

    const logOut = () => {
        signOut(auth);
    };

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //     })
    //     return () => unsubscribe()
    // }, [user])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         if (user) {
    //             setUser(user);
    //         } else {
    //             setUser(null);
    //         }
    //     });

    //     return () => unsubscribe();
    // }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logOut,
                signOut,
                AuthWithGoogle,
                AuthWithFacebook,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export function UserAuth() {
    return useContext(AuthContext);
}
