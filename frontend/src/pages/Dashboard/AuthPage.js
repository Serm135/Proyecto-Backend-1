import React from 'react';
import "./style.scss"
import {fetchRecentPosts} from "../../services/api";
import {useSelector} from "react-redux";
import {getUrl} from "../../services/apiSlice";
import {ProductCard} from "../../components/product";
import {Spinner} from "../../components/spinners";

const Page = () => {
    const [recentPosts, setRecents] = React.useState(undefined)
    const API_URL = useSelector(getUrl)

    React.useEffect(() => {
        const fetch = async () => {
            const posts = await fetchRecentPosts({url: API_URL})
            setRecents(posts)
        }
        fetch()
    }, [])

    if (!recentPosts) {
        return <Spinner text={'Loading recent posts...'}/>
    }

    return (
        <div className="page auth-dashboard">
            {
                recentPosts.length > 0 ? recentPosts.map((item, key) =>
                        <ProductCard
                            key={key}
                            data={item}
                        />
                    )
                    :
                    <div className={'auth-dashboard__no-items'}> No recent items. </div>
            }
        </div>
    );
}

export default Page