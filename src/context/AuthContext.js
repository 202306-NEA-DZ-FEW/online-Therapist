import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { FieldValue, doc, getDoc, updateDoc } from "firebase/firestore";
import { collection, getDocs, query, setDoc, where } from "firebase/firestore";
import Image from "next/image";
import Spinner from "public/loading.svg";
import Profile from "public/profile.png";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@/util/firebase";
import { db } from "@/util/firebase";

const AuthContext = createContext();

export function AppWrapper({ children }) {
    const [user, setUser] = useState({
        email: null,
        uid: null,
        isTherapist: false,
        isUser: false,
    });
    const [loading, setLoading] = useState(true);
    const [profilePicture, setProfilePicture] = useState(null);
    const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false); // State to track signup success
    const [activeLink, setActiveLink] = useState("appointments");
    const [cards, setCards] = useState([]);
    const [totalTickets, setTotalTickets] = useState(0);
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const AuthWithGoogle = () => {
        try {
            signInWithPopup(auth, googleProvider).then(async (result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                // Save user information in Firestore
                const userCollection = collection(db, "users");
                const userDocRef = doc(userCollection, user.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (!userDocSnapshot.exists()) {
                    // If the document doesn't exist, create a new one
                    await setDoc(userDocRef, {
                        firstname: user.displayName.split(" ")[0],
                        lastname: user.displayName.split(" ")[1],
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL,
                    });
                }
                setIsSignUpSuccessful(true);
            });
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
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
                console.log(errorCode, errorMessage);
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "therapists", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const isUser = false;
                    const isTherapist = true;
                    const { fullname, username } = docSnap.data();
                    setUser({
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL || Profile.src,
                        displayName: fullname ?? username,
                        isTherapist,
                        isUser,
                    });
                    localStorage.setItem("uid", user.uid);
                    localStorage.setItem("diplayname", user.displayName);
                    localStorage.setItem(`profile_${user.uid}`, user.photoURL);
                } else {
                    const isUser = true;
                    const isTherapist = false;
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const { firstname, lastname } = docSnap.data();
                        setUser({
                            email: user.email,
                            uid: user.uid,
                            photoURL: user.photoURL || Profile.src,
                            displayName:
                                user.displayName || `${firstname} ${lastname}`,
                            isTherapist,
                            isUser,
                        });
                    }

                    localStorage.setItem(`profile_${user.uid}`, user.photoURL);
                    localStorage.setItem("uid", user.uid);
                    localStorage.setItem("diplayname", user.displayName);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateProfilePhoto = async (photoURL) => {
        const user = auth.currentUser;
        updateProfile(user, { photoURL });
    };

    const fetchUserCards = async (userUid) => {
        try {
            const cardsCollection = collection(db, "cards");
            const userCardsQuery = query(
                cardsCollection,
                where("uid", "==", userUid)
            );
            const querySnapshot = await getDocs(userCardsQuery);
            const userCards = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            return userCards;
        } catch (error) {
            console.error("Error fetching user cards:", error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const userId = user.uid;
                const userCards = await fetchUserCards(userId);
                setCards(userCards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchCards();
    }, [user]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const userDocRef = doc(collection(db, "tickets"), user.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const userTickets = userData.tickets || {};

                    // Convert the tickets object into an array
                    const ticketArray = Object.keys(userTickets).map(
                        (ticketId) => ({
                            id: ticketId,
                            quantity: userTickets[ticketId].quantity,
                        })
                    );

                    // Calculate the total quantity
                    const totalQuantity = ticketArray.reduce(
                        (total, ticket) => total + ticket.quantity,
                        0
                    );
                    setTotalTickets(totalQuantity);
                }
            } catch (error) {
                console.error("Error fetching user tickets:", error);
            }
        };

        const fetchConfirmedAppointments = async () => {
            try {
                const appointmentsQuery = query(
                    collection(db, "appointments"),
                    where("uid", "==", user.uid),
                    where("appointmentStatus", "==", "ready")
                );
                const appointmentsSnapshot = await getDocs(appointmentsQuery);

                // Iterate through the confirmed appointments and decrement tickets
                appointmentsSnapshot.forEach(async (appointmentDoc) => {
                    const appointmentData = appointmentDoc.data();
                    const ticketId = appointmentData.ticketId; // Assuming you have a ticketId field in your appointments
                    const userDocRef = doc(collection(db, "tickets"), user.uid);
                    await updateDoc(userDocRef, {
                        [`tickets.${ticketId}.quantity`]:
                            FieldValue.increment(-1),
                    });
                });
            } catch (error) {
                console.error("Error fetching confirmed appointments:", error);
            }
        };

        if (user) {
            fetchTickets();
            fetchConfirmedAppointments();
        }
    }, [user]);

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
                activeLink,
                setActiveLink,
                loading,
                setLoading,
                updateProfilePhoto,
                fetchUserCards,
                cards,
                setCards,
                totalTickets,
            }}
        >
            {loading ? (
                <div className='grid place-items-center h-screen '>
                    <Image
                        src={Spinner}
                        alt='loading'
                        height={150}
                        width={150}
                        className='h-28 w-28'
                    />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
export function UserAuth() {
    return useContext(AuthContext);
}

export const useAuth = () => useContext(AuthContext);
