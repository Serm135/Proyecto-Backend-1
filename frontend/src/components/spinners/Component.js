import React from 'react'
import {useDispatch} from "react-redux";
import {fetchUser} from "../../services/userSlice";
import "./style.scss"

const Component = ({text}) => {
    return <div className={'spinner'}>
        <div className={'spinner__circle animate-spin'}/>
        {
            text ?
                <span className={'spinner__text'}>{text}</span>
                : <></>
        }
    </div>
}

export default Component