import React from "react";
import "./style.scss"
import {useNavigate} from "react-router";
import {SmartForm} from "../../components/form";
import {doLogin} from "../../services/api";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setUser} from "../../services/userSlice";
import {genNameFromPlaceHolder} from "../../utils/tools";
import {getUrl} from "../../services/apiSlice";

const Page = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const API_URL = useSelector(getUrl)
    const currentUser = useSelector(getUser)

    React.useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
    }, [currentUser])

    const onSubmit = async (data) => doLogin({url: API_URL, params: data})
    const onSuccess = (data) => {
        dispatch(dispatch => setUser(dispatch, data))
        navigate('/')
    }

    const formStructure = [
        {
            type: 'text',
            placeholder: 'Username'
        },
        {
            type: 'password',
            placeholder: 'Password'
        }
    ]
    const formButtons = [
        {
            type: "rounded-primary",
            text: "Log me in",
            isSubmit: true
        },
        {
            type: "tertiary",
            text: "I don't have an account",
            fn: () => navigate('/register')
        },
    ]
    const formInitData = formStructure.reduce((acc, curr) => ({...acc, [genNameFromPlaceHolder(curr)]: ""}), {})

    return <div className={"page login"}>
        <div className={'welcome-text xlarge-text text-700'}>
            Welcome back!
        </div>
        <SmartForm
            formInitData={formInitData}
            formStructure={formStructure}
            formButtons={formButtons}
            onSubmit={onSubmit}
            onSuccess={onSuccess}
            workingText={"Logging in..."}
        />
    </div>
}

export default Page