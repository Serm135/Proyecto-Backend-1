import React from "react";
import {useNavigate} from "react-router";
import "./style.scss"

const Page = () => {
    const navigate = useNavigate()

    const redirect = () => navigate("/")

    return <div className={"page not-found"} onClick={redirect}>
        <div className={'xxxlarge-text text-900'}>404</div>
        <div className={'large-text text-700'}>
            Not Found
        </div>
        <div>
            and that's on you.
        </div>
    </div>
}

export default Page