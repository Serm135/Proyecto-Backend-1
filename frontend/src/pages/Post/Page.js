import React from "react";
import "./style.scss"
import {useSelector} from "react-redux";
import {getUrl} from "../../services/apiSlice";
import {addToCart, fetchPost, fetchReviews, fetchUser} from "../../services/api";
import {Spinner} from "../../components/spinners";
import {useNavigate, useParams} from "react-router";
import {RegularPrimaryButton} from "../../components/buttons";
import {Review} from "../../components/review";
import {getUser} from "../../services/userSlice";
import {NewReview} from "../../components/new-review";

const Page = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [productData, setProductData] = React.useState(undefined)
    const [ownerData, setOwnerData] = React.useState(undefined)
    const [reviewData, setReviewData] = React.useState(undefined)
    const [reqState, setReqState] = React.useState(undefined)
    const API_URL = useSelector(getUrl)
    const userData = useSelector(getUser);

    const fetch = async () => {
        const product = await fetchPost({url: API_URL, params: {post_id: params.id}})
        setProductData(product)

        const owner = await fetchUser({url: API_URL, params: {user_id: product.owner_id}})
        setOwnerData(owner)

        const reviews = await fetchReviews({url: API_URL, params: {product_id: params.id}})
        setReviewData(reviews)
    }

    React.useEffect(() => {
        fetch()
    }, [API_URL])

    if (!productData) {
        return <Spinner text={'Loading...'}/>
    }
    const refreshData = async () => await fetch()
    const redirectSeller = () => navigate(`/profile/${productData.owner_id}`)
    const handleBuy = async () => {
        if (!userData) {
            navigate('/login')
        } else {
            await addToCart({url: API_URL, params: {user_id: userData._id, product_id: params.id}})
            setReqState(true)
        }
    }

    return <div className={"page post"}>
        <h1>
            {productData.display_name}
        </h1>
        <img
            className={'post__img'}
            src={productData.img_url}
        />
        <div className={'post__price'}>
            {`$${productData.price}`}
        </div>
        {
            ownerData && <div className={'post__seller'} onClick={redirectSeller}>
                {`Seller: ${ownerData.display_name}`}
            </div>
        }
        <div className={'post__timestamp small-text'}>
            {productData.created_date}
        </div>
        <RegularPrimaryButton stateColor={reqState} onClick={handleBuy}>
            {reqState ? "Added to cart" : "Add to cart"}
        </RegularPrimaryButton>
        <h2>
            Reviews
        </h2>
        <div className={'post__reviews'}>
            {
                reviewData ?
                    reviewData.length > 0 ?
                        reviewData.map((item, key) => <Review
                            showAuthor={true}
                            showProduct={false}
                            key={key}
                            data={item}
                        />)
                        :
                        <div className={'post__no-reviews'}> No reviews. </div>
                    :
                    <Spinner
                        text={"Loading reviews..."}
                    />
            }
            <NewReview
                product_id={params.id}
                refreshReviews={refreshData}
            />
        </div>
    </div>
}

export default Page