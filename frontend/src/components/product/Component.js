import React from 'react'
import "./style.scss"
import {useNavigate} from "react-router";

const Component = ({data}) => {
    const navigate = useNavigate()

    const redirect = () => navigate(`/product/${data._id}`)

    return <div className={'product-card'} onClick={redirect}>
        <div className={'product-card__img-container'}>
        <img
            className={'product-card__img'}
            src={data.img_url}
        />
        </div>
        <div className={'product-card__info'}>
            <div className={'product-card__name large-text'}>
                {data.display_name}
            </div>
            <div className={'product-card__price'}>
                {`$${data.price}`}
            </div>
            <div className={'product-card__timestamp small-text'}>
                {data.created_date}
            </div>
        </div>
    </div>
}

export default Component