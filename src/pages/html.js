import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MainContent from '../components/MainContent'
import { Helmet } from "react-helmet-async";

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

import Loading from '../components/Loading.jsx';

const Html = () => {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {

        if (!user && !loading) {
            navigate("/");
        }

        if (user) {
            if (!user.emailVerified) {
                navigate("/");
            }
        }
    });

    // --------------------------------------------------------------------- //

    if (loading) {
        return <Loading />;
    }

    // --------------------------------------------------------------------- //

    if (user) {

        if (user.emailVerified) {

            return (
                <>

                    {/* --------------------------------------------------------------------- */}

                    <Helmet>
                        <title>HTML Page</title>
                        <meta name="description" content="HTML Page Description" />
                    </Helmet>

                    {/* --------------------------------------------------------------------- */}

                    <Header />

                    {/* --------------------------------------------------------------------- */}

                    <MainContent pageName="HTML Page" />

                    {/* --------------------------------------------------------------------- */}

                    <Footer />

                    {/* --------------------------------------------------------------------- */}

                </>
            )

        }

    }

}

export default Html;