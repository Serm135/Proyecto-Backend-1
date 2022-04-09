import React from "react";
import "./style.scss"
import {useSelector} from "react-redux";
import {getUrl} from "../../services/apiSlice";
import {fetchHistory, fetchPost} from "../../services/api";
import {Spinner} from "../../components/spinners";
import {getUser} from "../../services/userSlice";
import {ProductCard} from "../../components/product";
import {useNavigate} from "react-router";

const Page = () => {
    const navigate = useNavigate()
    const [historyData, setHistoryData] = React.useState(undefined)
    const API_URL = useSelector(getUrl)
    const userData = useSelector(getUser);

    const fetch = async () => {
        let history = await fetchHistory({url: API_URL, params: {user_id: userData._id}})

        const productData = await Promise.all(
            history.map(item => fetchPost({url: API_URL, params: {post_id: item.product_id}}))
        )

        history = history.map((item, i) => ({
            ...item, product_data: productData[i]
        }))

        setHistoryData(history)
    }

    React.useEffect(() => {
        if (userData) {
            fetch()
        } else {
            navigate('/')
        }
    }, [])

    if (!historyData) {
        return <Spinner text={'Loading history...'}/>
    }

    return <div className={"page history"}>
        <h2>
            Purchase History
        </h2>
        <div className={'history__items'}>
        {
            historyData.length > 0 ? historyData.map((item, key) =>
                    <>
                        <ProductCard
                            key={key}
                            data={item.product_data}
                        />
                    </>
                )
                :
                <div className={'history__no-items'}> No items in history. </div>
        }
        </div>
    </div>
}

export default Page