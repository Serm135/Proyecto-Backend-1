import axios from 'axios';
import {
    doLoginMock,
    fetchPrevLoginMock,
    doRegisterMock,
    fetchUserPostsMock,
    fetchRecentPostsMock,
    fetchPostMock,
    createPostMock,
    addToCartMock,
    removeFromCartMock,
    buyCartMock,
    fetchHistoryMock,
    fetchUserMock,
    postReviewMock, fetchReviewsMock, fetchCartMock
} from "./mockApi";

// LOGIN
export const doLogin = async ({url, params}) => {
    const {username, password} = params
    if (!url) {
        return doLoginMock({username, password})
    } else {
        const res = await axios.post(
            `${url}/users/login`,
            {username, password}
        )
        return res.data
    }
}

export const fetchPrevLogin = async ({url, params}) => {
    const {user_id} = params
    if (!url) {
        return fetchPrevLoginMock({user_id})
    } else {
        const res = await axios.post(
            `${url}/users/prev-login`,
            {user_id}
        )
        return res.data
    }
}

// REGISTER
export const doRegister = async ({url, params}) => {
    const {name: display_name, username, password} = params
    if (!url) {
        return doRegisterMock({display_name, username, password})
    } else {
        const res = await axios.post(
            `${url}/users/register`,
            {display_name, username, password}
        )
        return res.data
    }
}

// USER
export const fetchUser = async ({url, params}) => {
    const {user_id} = params
    if (!url) {
        return fetchUserMock({user_id})
    } else {
        const res = await axios.get(
            `${url}/users/`,
            {
                params: {user_id}
            }
        )
        return res.data
    }
}

// POSTS
export const fetchUserPosts = async ({url, params}) => {
    const {user_id} = params;
    if (!url) {
        return fetchUserPostsMock({user_id})
    } else {
        const res = await axios.get(
            `${url}/posts/`,
            {params: {user_id}}
        )
        return res.data
    }
}

export const fetchRecentPosts = async ({url}) => {
    if (!url) {
        return fetchRecentPostsMock()
    } else {
        const res = await axios.get(
            `${url}/posts/recent`
        )
        return res.data
    }
}

export const fetchPost = async ({url, params}) => {
    const {post_id} = params
    if (!url) {
        return fetchPostMock({post_id})
    } else {
        const res = await axios.get(
            `${url}/posts/`,
            {params: {post_id}}
        )
        return res.data
    }
}

export const createPost = async ({url, params}) => {
    const {owner_id, image_url: img_url, name: display_name, description, price} = params
    if (!url) {
        return createPostMock({owner_id, img_url, display_name, description, price})
    } else {
        const res = await axios.post(
            `${url}/posts/`,
            {owner_id, img_url, display_name, description, price}
        )
        return res.data
    }
}

// CART
export const fetchCart = async ({url, params}) => {
    const {user_id} = params
    if (!url) {
        return fetchCartMock({user_id})
    } else {
        const res = await axios.get(
            `${url}/cart/`,
            { params: {user_id}}
        )
        return res.data
    }
}

export const addToCart = async ({url, params}) => {
    const {product_id, user_id} = params
    if (!url) {
        return addToCartMock({product_id, user_id})
    } else {
        const res = await axios.post(
            `${url}/cart/`,
            {product_id, user_id}
        )
        return res.data
    }
}

export const removeFromCart = async ({url, params}) => {
    const {item_id} = params
    if (!url) {
        return removeFromCartMock({item_id})
    } else {
        return axios.delete(
            `${url}/cart/`,
            {params: {item_id}}
        )
    }
}

export const buyCart = async ({url, params}) => {
    const {user_id} = params
    if (!url) {
        return buyCartMock({user_id})
    } else {
        const res = await axios.post(
            `${url}/cart/buy`,
            {user_id}
        )
        return res.data
    }
}

// HISTORY
export const fetchHistory = async ({url, params}) => {
    const {user_id} = params
    if (!url) {
        return fetchHistoryMock({user_id})
    } else {
        const res = await axios.get(
            `${url}/history/${user_id}`,
        )
        return res.data
    }
}

// REVIEWS
export const postReview = async ({url, params}) => {
    const {user_id, product_id, rating, description} = params
    if (!url) {
        return postReviewMock({user_id, product_id, rating, description})
    } else {
        const res = await axios.post(
            `${url}/reviews/`,
            {user_id, product_id, rating, description}
        )
        return res.data
    }
}

export const fetchReviews = async ({url, params}) => {
    const {product_id, user_id} = params
    if (!url) {
        return fetchReviewsMock({product_id, user_id})
    } else {
        const res = await axios.get(
            `${url}/reviews/`,
            {params: {product_id, user_id}}
        )
        return res.data
    }
}

