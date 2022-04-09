import React from 'react'
import "./style.scss"
import {Input} from "../input";
import {useDispatch} from "react-redux";
import {setURL} from "../../services/apiSlice";

const Component = () => {
    const [formData, setFormData] = React.useState({url: ""})
    const dispatch = useDispatch()

    const onChange = (url) => {
        setFormData({url})
        dispatch(setURL(url))
    }

    return <div className={'url-changer'}>
        <span>
            Backend URL:
        </span>
        <Input
            onChange={onChange}
            type={"text"}
            placeholder={'localhost:3000'}
            formData={formData}
            name={"url"}
        />
    </div>
}

export default Component