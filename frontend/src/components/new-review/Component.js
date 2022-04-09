import React from 'react'
import "./style.scss"
import {postReview} from "../../services/api";
import {useSelector} from "react-redux";
import {getUrl} from "../../services/apiSlice";
import {getUser, setUser} from "../../services/userSlice";
import {SmartForm} from "../form";
import {genNameFromPlaceHolder} from "../../utils/tools";

const Component = ({product_id, refreshReviews}) => {
    const API_URL = useSelector(getUrl)
    const currentUser = useSelector(getUser)

    if (!currentUser) {
        return false
    }

    const onSubmit = async ({rating, description}) => postReview({url: API_URL, params: {user_id: currentUser._id, product_id, rating, description}})
    const onSuccess = () => {
        refreshReviews()
    }

    const formStructure = [
        {
            type: 'text',
            placeholder: 'Description'
        },
        {
            type: 'number',
            placeholder: 'Rating'
        }
    ]
    const formButtons = [
        {
            type: "rounded-primary",
            text: "Post review",
            isSubmit: true
        },
    ]
    const formInitData = formStructure.reduce((acc, curr) => ({...acc, [genNameFromPlaceHolder(curr)]: ""}), {})

    return <div className={'new-review'} >
        <h2>
            Leave a review
        </h2>
        <SmartForm
            formInitData={formInitData}
            formStructure={formStructure}
            formButtons={formButtons}
            onSubmit={onSubmit}
            onSuccess={onSuccess}
            workingText={"Posting review..."}
        />
    </div>
}

export default Component
