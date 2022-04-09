import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, getUser} from "../../services/userSlice";
import {ReactComponent as Logo} from "../../assets/Asset 4.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faPlus } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router";
import "./style.scss"


const Component = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(getUser)

    React.useEffect(() => {
        dispatch(fetchUser)
    }, [])

    const navigateProfile = () => navigate(`/profile/${userData._id}`)
    const navigateCart = () => navigate('/cart')
    const navigateHome = () => navigate('/')
    const navigateNewPost = () => navigate('/new-post')

    return <header>
        <Logo
            onClick={navigateHome}
            className={"logo"}
        />
        {
            userData && <div className={'icons'}>
                <div className={'icon-badge'} onClick={navigateNewPost}>
                    <FontAwesomeIcon
                        icon={faPlus}
                    />
                </div>
                <div className={'icon-badge'} onClick={navigateCart}>
                    <FontAwesomeIcon
                        icon={faCartShopping}
                    />
                </div>
                <div className={'icon-badge'} onClick={navigateProfile}>
                    <FontAwesomeIcon
                        icon={faUser}
                    />
                </div>
        </div>
        }
    </header>
}

export default Component