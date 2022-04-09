import React from 'react'
import "./style.scss"
import {fetchPost, fetchUser} from "../../services/api";
import {useSelector} from "react-redux";
import {getUrl} from "../../services/apiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router";

const Component = ({data, showAuthor, showProduct}) => {
    const navigate = useNavigate()
    const [authorData, setAuthorData] = React.useState(undefined)
    const [productData, setProductData] = React.useState(undefined)
    const API_URL = useSelector(getUrl)

    React.useEffect(() => {
        const fetch = async () => {
            const author = await fetchUser({url: API_URL, params: {user_id: data.user_id}})
            setAuthorData(author)

            const product = await fetchPost({url: API_URL, params: {post_id: data.product_id}})
            setProductData(product)
        }
        fetch()
    }, [])

    const redirectReviewer = () => navigate(`/profile/${data.user_id}`)
    const redirectProduct = () => navigate(`/product/${data.product_id}`)

    return <div className={'review'} >
        {
            authorData && productData && <div className={'review__author'}>
                <span>
                    {showAuthor && <div onClick={redirectReviewer}>{`Author: ${authorData.display_name}`}</div>}
                    {showProduct && <div onClick={redirectProduct}>{`Product: ${productData.display_name}`}</div>}
                </span>
                <span>
                    <span>{data.rating}</span>
                    <FontAwesomeIcon
                        icon={faStar}
                    />
                </span>
            </div>
        }
        <div className={'review__description'}>
            {data.description}
        </div>
        <div className={'review__timestamp small-text'}>
            {data.created_date}
        </div>
    </div>
}

export default Component
