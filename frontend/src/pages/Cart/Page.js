import React from "react";
import "./style.scss"
import {useSelector} from "react-redux";
import {getUrl} from "../../services/apiSlice";
import {buyCart, fetchCart, fetchPost, removeFromCart} from "../../services/api";
import {Spinner} from "../../components/spinners";
import {RegularPrimaryButton, RegularSecondaryButton} from "../../components/buttons";
import {getUser} from "../../services/userSlice";
import {ProductCard} from "../../components/product";
import {useNavigate} from "react-router";

const Page = () => {
    const navigate = useNavigate()
    const [cartData, setCartData] = React.useState(undefined)
    const API_URL = useSelector(getUrl)
    const userData = useSelector(getUser);

    const fetch = async () => {
        let cart = await fetchCart({url: API_URL, params: {user_id: userData._id}})

        const productData = await Promise.all(
            cart.map(item => fetchPost({url: API_URL, params: {post_id: item.product_id}}))
        )

        cart = cart.map((item, i) => ({
            ...item, product_data: productData[i]
        }))

        setCartData(cart)
    }

    React.useEffect(() => {
        if (userData) {
            fetch()
        } else {
            navigate('/')
        }
    }, [API_URL])

    if (!cartData) {
        return <Spinner text={'Loading cart...'}/>
    }

    const handleRemove = async (item_id) => {
        await removeFromCart({url: API_URL, params: {item_id}})
        await fetch()
    }

    const handleBuy = async () => {
        await buyCart({url: API_URL, params: {user_id: userData._id}})
        await fetch()
    }

    return <div className={"page cart"}>
        <h2>
            Cart
        </h2>
        {
            cartData.length > 0 &&
            <RegularPrimaryButton onClick={() => handleBuy()}>
                {`Buy cart`}
            </RegularPrimaryButton>
        }
        {
            cartData.length > 0 ? cartData.map((item, key) =>
                    <React.Fragment key={key}>
                        <ProductCard
                            data={item.product_data}
                        />
                        <div className={'cart__delete'}>
                            <RegularSecondaryButton onClick={() => handleRemove(item._id)}>
                                {`Remove ${item.product_data.display_name} from cart`}
                            </RegularSecondaryButton>
                        </div>
                    </React.Fragment>
                )
                :
                <div className={'cart__no-items'}> No items in cart. </div>
        }
    </div>
}

export default Page