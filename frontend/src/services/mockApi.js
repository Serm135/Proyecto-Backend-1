
// LOGIN
export const doLoginMock = async ({username, password}) => Promise.resolve()

export const fetchPrevLoginMock = async ({user_id}) => Promise.resolve()

// REGISTER
export const doRegisterMock = async ({display_name, username, password}) => Promise.resolve()

// USER
export const fetchUserMock = async ({user_id}) => Promise.resolve()

// POSTS
export const fetchUserPostsMock = async ({user_id}) => Promise.resolve()

export const fetchRecentPostsMock = async () => Promise.resolve()

export const fetchPostMock = async ({post_id}) => Promise.resolve()

export const createPostMock = async ({owner_id, display_name, description, price}) => Promise.resolve()

// CART
export const fetchCartMock = async ({user_id}) => Promise.resolve()

export const addToCartMock = async ({product_id, user_id}) => Promise.resolve()

export const removeFromCartMock = async ({item_id}) => Promise.resolve()

export const buyCartMock = async ({user_id}) => Promise.resolve()

// HISTORY

export const fetchHistoryMock = async ({user_id}) => Promise.resolve()


// REVIEWS
export const postReviewMock = async ({user_id, product_id, rating, description}) => Promise.resolve()

export const fetchReviewsMock = async ({product_id, user_id}) => Promise.resolve()