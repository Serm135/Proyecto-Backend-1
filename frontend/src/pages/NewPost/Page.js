import React from "react";
import "./style.scss"
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {getUrl} from "../../services/apiSlice";
import {getUser} from "../../services/userSlice";
import {createPost} from "../../services/api";
import {genNameFromPlaceHolder} from "../../utils/tools";
import {SmartForm} from "../../components/form";

const Page = () => {
    const navigate = useNavigate();
    const API_URL = useSelector(getUrl)
    const currentUser = useSelector(getUser)

    React.useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
    }, [])

    const onSubmit = async (data) => {
        const response = await createPost({url: API_URL, params: {...data, owner_id: currentUser._id}})
        console.log(response)
    }
    const onSuccess = (data) => {
        navigate(`/profile/${currentUser._id}`)
    }

    const formStructure = [
        {
            type: 'text',
            placeholder: 'Name'
        },
        {
            type: 'text',
            placeholder: 'Description'
        },
        {
            type: 'text',
            placeholder: 'Image URL',
        },
        {
            type: 'number',
            placeholder: 'Price',
        },
    ]
    const formButtons = [
        {
            type: "rounded-primary",
            text: "Post",
            isSubmit: true
        },
    ]
    const formInitData = formStructure.reduce((acc, curr) => ({...acc, [genNameFromPlaceHolder(curr)]: ""}), {})

    return <div className={"page new-post"}>
        <div className={'welcome-text xlarge-text text-700'}>
            Post a product!
        </div>
        <SmartForm
            formInitData={formInitData}
            formStructure={formStructure}
            formButtons={formButtons}
            onSubmit={onSubmit}
            onSuccess={onSuccess}
            workingText={"Posting..."}
        />
    </div>
}

export default Page