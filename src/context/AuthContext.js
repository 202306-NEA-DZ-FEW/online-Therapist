import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth"
import {doc, getDoc} from "firebase/firestore"
import Image from "next/image"
import Spinner from "public/loading.svg"
import Profile from "public/profile.png"
import {createContext, useContext, useEffect, useState} from "react"

import Layout from "@/layout/Layout"
import {auth} from "@/util/firebase"
import {db} from "@/util/firebase"

const AuthContext = createContext()

export function AppWrapper ({children}) {
    const [user, setUser] = useState({
        email: null,
        uid: null,
        isTherapist: false,
    })
    const [loading, setLoading] = useState(true)
    const [profilePicture, setProfilePicture] = useState(null)
    const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false)
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider() // State to track signup success

    const AuthWithGoogle = () => {
        // Implement Google login using Firebase here
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                // The signed-in user info.
                const user = result.user
                console.log("google user", user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // console.log("can't log in", errorMessage, " ", errorCode);
                // The email of the user's account used.
                const email = error.customData.email
                // console.log("wrong email", email);
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error)
                // console.log("error", credential);
                // ...
            })
    }

    const AuthWithFacebook = () => {
        // Implement Facebook login using Firebase here
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user
                console.log("facebook user", user)
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential =
                    FacebookAuthProvider.credentialFromResult(result)
                const accessToken = credential.accessToken
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                fetch(
                    `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
                )
                    .then((response) => response.blob())
                    .then((blob) => {
                        setProfilePicture(URL.createObjectURL(blob))
                    })
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
                // The email of the user's account used.
                const email = error.customData.email
                // console.log("wrong email", email);
                // The AuthCredential type that was used.
                const credential =
                    FacebookAuthProvider.credentialFromError(error)
                // console.log("error", credential);

                // ...
            })
    }

    const logOut = () => {
        signOut(auth)
    }

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //     })
    //     return () => unsubscribe()
    // }, [user])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "therapists", user.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    const isTherapist = true
                    setUser({
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL || Profile,
                        isTherapist,
                    })
                } else {
                    const isTherapist = false
                    setUser({
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL || Profile,
                        isTherapist,
                    })
                }
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const updateProfilePhoto = async (photoURL) => {
        const user = auth.currentUser
        updateProfile(user, {photoURL})
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logOut,
                signOut,
                AuthWithGoogle,
                AuthWithFacebook,
                profilePicture,
                isSignUpSuccessful,
                setIsSignUpSuccessful,
                loading,
                setLoading,
                updateProfilePhoto,
            }}
        >
            {loading ? (
                <Layout>
                    <div className='flex justify-center items-center h-screen'>
                        <Image
                            src={Spinner}
                            alt='loading'
                            height={200}
                            width={200}
                        />
                    </div>
                </Layout>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}
export function UserAuth () {
    return useContext(AuthContext)
}

export const useAuth = () => useContext(AuthContext)
