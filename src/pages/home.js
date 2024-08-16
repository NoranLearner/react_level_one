import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MainContent from '../components/MainContent'
import { Helmet } from "react-helmet-async";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

import { Link } from "react-router-dom";

import { sendEmailVerification } from "firebase/auth";

import Loading from '../components/Loading.jsx';

import Error404 from "../pages/Error404.jsx";

const Home = () => {

    const [user, loading, error] = useAuthState(auth);
    console.log(user);

    // --------------------------------------------------------------------- //

    if (!user) {

        return (
            <>

                {/* --------------------------------------------------------------------- */}

                <Helmet>
                    <title>Home Page</title>
                    <meta name="description" content="Home Page Description" />
                    {/* <style type="text/css">{`
                        body {
                            background-color: yellow;
                        }
    
                        main {
                            font-size: 60px;
                        }
                    `}
                    </style> */}
                </Helmet>

                {/* --------------------------------------------------------------------- */}

                <Header />

                <main>
                    <p className='pls'>
                        Please{" "}
                        <Link style={{ fontSize: "30px" }} to="/sign-in">
                            sign in
                        </Link>{" "}
                        to continue... <span>🧡</span>
                    </p>
                </main>

                {/* --------------------------------------------------------------------- */}

                <Footer />

                {/* --------------------------------------------------------------------- */}

            </>
        )

    }

    // --------------------------------------------------------------------- //

    if (loading) {
        return <Loading />;
    }

    if(error){
        return <Error404/>;
    }

    // --------------------------------------------------------------------- //

    if (!user.emailVerified) {
        return (
            <>
                <Helmet>
                    <title>HOME Page</title>
                    <meta name="description" content="HOMEEEEEEEEEEEE" />
                </Helmet>

                <Header />

                <main style={{ flexDirection: "column" }}>
                    <p>
                        {" "}
                        Welcome: {user.displayName} <span>🧡</span>
                    </p>

                    <p>Please verify your email to continue ✋ </p>
                    <button className="delete" onClick={() => {
                        sendEmailVerification(auth.currentUser)
                            .then(() => {
                                console.log("Email verification sent!")
                                // ...
                            });
                    }}>Send email</button>
                </main>

                <Footer />
            </>
        );
    }

    // --------------------------------------------------------------------- //

    if (user) {
        if (user.emailVerified) {
            return (
                <>
                    <Helmet>
                        <title>HOME Page</title>
                        <meta name="description" content="HOMEEEEEEEEEEEE" />
                    </Helmet>

                    <Header />

                    <main>
                        <p>
                            {" "}
                            Welcome: {user.displayName} <span><i className="fa-solid fa-heart"></i></span>
                        </p>
                    </main>

                    <Footer />
                </>
            );
        }

    }

}

export default Home;