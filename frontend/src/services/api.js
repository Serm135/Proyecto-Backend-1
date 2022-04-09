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
        return axios.post(
            `${url}/users/login`,
            {username, password}
        )
    }
}

export const fetchPrevLogin = async ({url, params}) => {
    const {user_id} = params
    if (!url) {
        return fetchPrevLoginMock({user_id})
    } else {
        return axios.post(
            `${url}/users/prev-login`,
            {user_id}
        )
    }
}

// REGISTER
export const doRegister = async ({url, params}) => {
    const {name: display_name, username, password} = params
    if (!url) {
        return doRegisterMock({display_name, username, password})
    } else {
        return axios.post(
            `${url}/users/register`,
            {display_name, username, password}
        )
    }
}

// USER
export const fetchUser = async ({url, params}) => {
    const {user_id} = params
    if (!url) {
        return fetchUserMock({user_id})
    } else {
        return axios.get(
            `${url}/users/`,
            {
                params: {user_id}
            }
        )
    }
}

// POSTS
export const fetchUserPosts = async ({url, params}) => {
    const {user_id} = params;
    if (!url) {
        return fetchUserPostsMock({user_id})
    } else {
        return axios.get(
            `${url}/posts/`,
            {params: {user_id}}
        )
    }
}

export const fetchRecentPosts = async ({url}) => {
    if (!url) {
        return fetchRecentPostsMock()
    } else {
        return axios.get(
            `${url}/posts/recent`
        )
    }
}

export const fetchPost = async ({url, params}) => {
    const {post_id} = params
    if (!url) {
        return fetchPostMock({post_id})
    } else {
        return axios.get(
            `${url}/posts/`,
            {params: {post_id}}
        )
    }
}

export const createPost = async ({url, params}) => {
    const {owner_id, image_url: img_url, name: display_name, description, price} = params
    if (!url) {
        return createPostMock({owner_id, img_url, display_name, description, price})
    } else {
        return axios.post(
            `${url}/posts/`,
            {owner_id, img_url, display_name, description, price}
        )
    }
}

// CART
export const fetchCart = async ({url, params}) => {
    const {user_id} = params
    if (!url) {
        return fetchCartMock({user_id})
    } else {
        return axios.get(
            `${url}/cart/`,
            { params: {user_id}}
        )
    }
}

export const addToCart = async ({url, params}) => {
    const {product_id, user_id} = params
    if (!url) {
        return addToCartMock({product_id, user_id})
    } else {
        return axios.post(
            `${url}/cart/`,
            {product_id, user_id}
        )
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
        return axios.post(
            `${url}/cart/buy`,
            {user_id}
        )
    }
}

// HISTORY
export const fetchHistory = async ({url, params}) => {
    const {user_id} = params
    if (!url) {
        return fetchHistoryMock({user_id})
    } else {
        return axios.get(
            `${url}/history/${user_id}`,
        )
    }
}

// REVIEWS
export const postReview = async ({url, params}) => {
    const {user_id, product_id, rating, description} = params
    if (!url) {
        return postReviewMock({user_id, product_id, rating, description})
    } else {
        return axios.post(
            `${url}/reviews/`,
            {user_id, product_id, rating, description}
        )
    }
}

export const fetchReviews = async ({url, params}) => {
    const {product_id, user_id} = params
    if (!url) {
        return fetchReviewsMock({product_id, user_id})
    } else {
        return axios.delete(
            `${url}/reviews/`,
            {params: {product_id, user_id}}
        )
    }
}

