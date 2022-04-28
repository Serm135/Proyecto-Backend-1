import React from "react";
import "./style.scss"
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getUrl} from "../../services/apiSlice";
import {Spinner} from "../../components/spinners";
import {fetchReviews, fetchUser, fetchUserPosts} from "../../services/api";
import {ProductCard} from "../../components/product";
import {dataReceived, getUser} from "../../services/userSlice";
import {RegularPrimaryButton} from "../../components/buttons";
import {Review} from "../../components/review";

const Page = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const API_URL = useSelector(getUrl);
    const [userPosts, setUserPosts] = React.useState(undefined);
    const [userReviews, setUserReviews] = React.useState(undefined);
    const [userData, setUserData] = React.useState(undefined);
    const currentUser = useSelector(getUser);

    React.useEffect(() => {
        const fetch = async () => {
            const user = await fetchUser({url: API_URL, params: {user_id: params.id}})
            setUserData(user)

            const posts = await fetchUserPosts({url: API_URL, params: {user_id: params.id}})
            setUserPosts(posts)

            const reviews = await fetchReviews({url: API_URL, params: {user_id: params.id}})
            setUserReviews(reviews)
        }
        fetch()
    }, [API_URL])

    if (!userData) {
        return <Spinner
            text={"Loading..."}
        />
    }

    const redirectHistory = () => navigate('/history')
    const logOut = () => {
        localStorage.removeItem('user_id');
        dispatch(dataReceived(undefined))
        navigate('/')
    }

    return <div className={"page profile"}>
        <h1>
            {userData.display_name}
        </h1>
        <div className={'profile__username'}>
            {`@${userData.username}`}
        </div>
        <div className={'profile__bio'}>
            {userData.bio}
        </div>
        {
            currentUser._id === params.id && <div className={'profile__buttons'}>
                <RegularPrimaryButton onClick={redirectHistory}>
                    Purchase History
                </RegularPrimaryButton>
                <RegularPrimaryButton onClick={logOut}>
                    Log Out
                </RegularPrimaryButton>
            </div>
        }
        <h2>
            {`${userData.display_name}'s Products`}
        </h2>
        <div className={'profile__posts'}>
            {
                userPosts ?
                    userPosts.length > 0 ?
                        userPosts.map((item, key) => <ProductCard
                            key={key}
                            data={item}
                        />)
                        :
                        <div className={'profile__no-posts'}> No posts. </div>
                    :
                    <Spinner
                        text={"Loading posts..."}
                    />
            }
        </div>
        <h2>
            {`${userData.display_name}'s Reviews`}
        </h2>
        <div>
            {
                userReviews ?
                    userReviews.length > 0 ?
                        userReviews.map((item, key) => <Review
                            showAuthor={false}
                            showProduct={true}
                            key={key}
                            data={item}
                        />)
                        :
                        <div className={'profile__no-reviews'}> No reviews. </div>
                    :
                    <Spinner
                        text={"Loading reviews..."}
                    />
            }
        </div>
    </div>
}

export default Page