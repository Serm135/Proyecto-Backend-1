import React from "react";
import "./style.scss"
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setUser} from "../../services/userSlice";
import {SmartForm} from "../../components/form";
import {genNameFromPlaceHolder} from "../../utils/tools";
import {doRegister} from "../../services/api";
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

    const onSubmit = async (data) => doRegister({url: API_URL, params: data})
    const onSuccess = (data) => {
        dispatch(dispatch => setUser(dispatch, data))
        navigate('/')
    }

    const formStructure = [
        {
            type: 'text',
            placeholder: 'Name'
        },
        {
            type: 'text',
            placeholder: 'Username'
        },
        {
            type: 'password',
            placeholder: 'Password',
            equality: 1
        },
        {
            type: 'password',
            placeholder: 'Confirm Password',
            equality: 1
        }
    ]
    const formButtons = [
        {
            type: "rounded-primary",
            text: "Register me",
            isSubmit: true
        },
        {
            type: "tertiary",
            text: "I have an account",
            fn: () => navigate('/login')
        },
    ]
    const formInitData = formStructure.reduce((acc, curr) => ({...acc, [genNameFromPlaceHolder(curr)]: ""}), {})

    return <div className={"page register"}>
        <div className={'welcome-text xlarge-text text-700'}>
            Welcome!
        </div>
        <SmartForm
            formInitData={formInitData}
            formStructure={formStructure}
            formButtons={formButtons}
            onSubmit={onSubmit}
            onSuccess={onSuccess}
            workingText={"Registering..."}
        />
    </div>
}

export default Page