import React from 'react';
import "./style.scss"
import {useSelector} from "react-redux";
import {getUser} from "../../services/userSlice";
import NoAuthPage from "./NoAuthPage";
import AuthPage from "./AuthPage";

const Page = () => {
    const currentUser = useSelector(getUser)
    if (currentUser) {
        return <AuthPage />
    } else {
        return <NoAuthPage />
    }
}

export default Page