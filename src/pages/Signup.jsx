import React from 'react'
import { Helmet } from "react-helmet-async";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

import { useState } from 'react';

import { auth } from '../firebase/config.js'
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";

import { useEffect } from "react";

import Loading from '../components/Loading.jsx';

const Signup = () => {

    const [userName, setuserName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();

    const [hasError, sethasError] = useState(false);
    const [firebaseError, setfirebaseError] = useState("");

    const [user, loading, error] = useAuthState(auth);

    // --------------------------------------------------------------------- //

    // Loading    (done)
    // NOT sign-in  (done)
    // sign-in without Email verification   (done)
    // (sign-in && verified email) => navigate(/)    (done)

    useEffect(() => {
        if (user) {
            if (user.emailVerified) {
                navigate("/");
            }
        }
    });

    // --------------------------------------------------------------------- //

    if (!user) {

        return (
            <>

                {/* --------------------------------------------------------------------- */}

                <Helmet>
                    <title>Signup Page</title>
                    <meta name="description" content="Signup Page Description" />
                </Helmet>

                {/* --------------------------------------------------------------------- */}

                <Header />

                {/* --------------------------------------------------------------------- */}

                <main>
                    <form>
                        <p style={{ fontSize: "23px", marginBottom: "22px" }}> Create a new account <span>🧡</span> </p>

                        <input required placeholder=" UserName : " type="text" onChange={(eo) => { setuserName(eo.target.value); }} />

                        <input required placeholder=" E-mail : " type="email" onChange={(eo) => { setemail(eo.target.value) }} />

                        <input required placeholder=" Password : " type="password" onChange={(eo) => { setpassword(eo.target.value) }} />

                        <button onClick={
                            (eo) => {

                                eo.preventDefault();

                                createUserWithEmailAndPassword(auth, email, password)

                                    .then((userCredential) => {

                                        // Signed up 
                                        const user = userCredential.user;
                                        console.log(user);

                                        // Email Verification
                                        sendEmailVerification(auth.currentUser).then(() => {
                                            console.log("Email verification sent!");
                                        });

                                        // Update Profile
                                        updateProfile(auth.currentUser, {
                                            displayName: userName
                                        }).then(() => {
                                            // Profile updated!
                                            console.log("doneeeeeeeeee");
                                            navigate("/");
                                        }).catch((error) => {
                                            // An error occurred
                                            console.log(error.code);
                                        });
                                    })

                                    .catch((error) => {

                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                        console.log(errorMessage)
                                        console.log(errorMessage);
                                        sethasError(true)

                                        switch (errorCode) {

                                            case "auth/invalid-email":
                                                setfirebaseError("Wrong Email")
                                                break;


                                            case "auth/user-not-found":
                                                setfirebaseError("Wrong Email")
                                                break;


                                            case "auth/wrong-password":
                                                setfirebaseError("Wrong Password")
                                                break;


                                            case "auth/too-many-requests":
                                                setfirebaseError("Too many requests, please try again later")
                                                break;


                                            default:
                                                setfirebaseError("Please check your email & password")
                                                break;

                                        }

                                    })
                            }
                        }>Sign up</button>

                        <p className="account">
                            Already have an account <Link to="/sign-in">Sign-in</Link>
                        </p>

                        {hasError && <h2>{firebaseError}</h2>}

                    </form>
                </main >

                {/* --------------------------------------------------------------------- */}

                < Footer />

                {/* --------------------------------------------------------------------- */}

            </>
        )

    }

    // --------------------------------------------------------------------- //

    if (loading) {
        return <Loading />;
    }

    // --------------------------------------------------------------------- //

    if (user) {
        if (!user.emailVerified) {
            return (
                <div>
                    <Header />
                    <main>
                        <p>We send you an email to verify your Account</p>
                        <button className="delete">Send again</button>
                    </main>
                    <Footer />
                </div>
            );
        }
    }


}

export default Signup;