import React, { useState, useEffect, useRef } from "react";
import {
    collection,
    getDocs,
    query,
    where,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    onSnapshot,
    or,
} from "firebase/firestore";
import { db } from "@/util/firebase";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const ChatCard = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [appointments, setAppointments] = useState(false);
    const [inputText, setInputText] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [chatUserId, setChatUserId] = useState([]);
    const [chatTherapistid, setChatTherapistid] = useState([]);
    const { user } = useAuth();
    const bottomEl = useRef(null);

    const fetchUserAppointments = async (userUid) => {
        try {
            const AppointmentsCollection = collection(db, "appointments");
            const userAppointmentsQuery = query(
                AppointmentsCollection,
                or(
                    where("uid", "==", userUid),
                    where("therapistId", "==", userUid)
                )
            );
            const querySnapshot = await getDocs(userAppointmentsQuery);
            const userAppointments = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            if (
                userAppointments[0].appointmentStatus.toLowerCase() == "ready"
            ) {
                setAppointments(true);
            }
            setChatUserId(userAppointments[0].uid);
            setChatTherapistid(userAppointments[0].therapistId);
            return userAppointments;
        } catch (error) {
            console.error("Error fetching user appointments:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const userId = user.uid;
                await fetchUserAppointments(userId);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [user]);

    const fetchUserChat = async (userUid) => {
        try {
            const chatCollection = collection(db, "chat");
            const userchatQuery = query(
                chatCollection,
                or(
                    where("uid", "==", userUid),
                    where("therapistId", "==", userUid)
                )
            );

            const unsubscribe = onSnapshot(userchatQuery, (querySnapshot) => {
                const userChats = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                if (userChats[0]) {
                    setChatMessages([...userChats[0].messages]);
                }
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Error fetching user chat:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const userId = user.uid;
                await fetchUserChat(userId);
            } catch (error) {
                console.error("Error fetching chat:", error);
            }
        };

        fetchChat();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const userRef = doc(db, "chat", chatUserId);
            const userSnapshot = await getDoc(userRef);
            const currentTime = new Date().toISOString();

            if (userSnapshot.exists()) {
                if (inputText) {
                    const messages = userSnapshot.data().messages;
                    const newMessage = {
                        text: inputText,
                        sender: user.uid,
                        time: currentTime,
                    };
                    messages.push(newMessage);
                    setInputText("");
                    await updateDoc(userRef, {
                        messages: [...messages],
                    });
                }
            } else {
                if (inputText) {
                    await setDoc(userRef, {
                        messages: [
                            {
                                text: inputText,
                                sender: user.uid,
                                time: currentTime,
                            },
                        ],
                        uid: chatUserId,
                        therapistId: chatTherapistid,
                    });
                    setInputText("");
                }
            }
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    useEffect(() => {
        if (bottomEl.current) {
            bottomEl.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [chatMessages]);

    useEffect(() => {
        if (bottomEl.current) {
            bottomEl.current.scrollIntoView({
                behavior: "instant",
                block: "end",
            });
        }
    }, [isChatOpen]);

    return (
        <div>
            {user && appointments ? (
                isChatOpen ? (
                    <div className='fixed flex flex-col bottom-0 sm:right-0 sm:h-[460px] sm:rounded-t-xl sm:mr-5 sm:w-[325px] outline outline-2 outline-gray-100 w-full h-[90%]'>
                        <div
                            className='bg-gray-100 border-b flex justify-between p-4 sm:h-[10%] h-[5%] place-items-center rounded-t-md cursor-pointer'
                            onClick={() => {
                                setIsChatOpen(false);
                            }}
                        >
                            <p className='font-medium'>
                                {user.uid === chatUserId
                                    ? "Your Therapist"
                                    : "Your Patient"}
                            </p>
                            <svg
                                className='w-3 h-3'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 14 14'
                            >
                                <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                />
                            </svg>
                        </div>

                        <div className='p-2 bg-white sm:h-[80%] h-[88%] w-full flex overflow-y-scroll flex-col'>
                            {chatMessages.map((item) => (
                                <p
                                    key={item.time}
                                    className={`rounded-xl px-3 py-2 my-0.5 w-fit break max-w-[77%] ${
                                        item.sender === user.uid
                                            ? "mr-auto bg-Teal text-white"
                                            : "ml-auto bg-gray-200"
                                    }`}
                                >
                                    {item.text}
                                </p>
                            ))}
                            <div ref={bottomEl}></div>
                        </div>

                        <form
                            onSubmit={submitHandler}
                            className='bottom-0 sm:h-[13%] h-[7%] flex bg-gray-100 border-t'
                        >
                            <input
                                onChange={handleChange}
                                value={inputText}
                                className='h-9 sm:w-[255px] w-4/5 bg-gray-200 rounded-full outline-none p-4 m-auto'
                                placeholder='Aa'
                            />
                            <button
                                type='submit'
                                className='bg-inherit text-white h-9 w-12 m-auto rounded-full'
                            >
                                <svg
                                    className='w-6 h-6 text-Teal m-auto'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 18 20'
                                    transform='rotate(90)'
                                >
                                    <path
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='m9 17 8 2L9 1 1 19l8-2Zm0 0V9'
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            setIsChatOpen(true);
                        }}
                        className='fixed bottom-0 right-0 w-[60px] h-[60px] rounded-full cursor-pointer mb-6 mr-2'
                    >
                        <Image
                            src='/profile.png'
                            width={200}
                            height={200}
                            alt='Profile'
                        />
                    </div>
                )
            ) : (
                <></>
            )}
        </div>
    );
};

export default ChatCard;
