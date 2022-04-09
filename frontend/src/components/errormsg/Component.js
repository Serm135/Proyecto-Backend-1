import React from 'react'
import "./style.scss"

const Component = ({children}) => {

    if (!children) {
        return
    }

    return <div className={'error-msg'}>
        <span className={'error-title'}>
            Error
        </span>
        <span className={'error-contents'}>
            {children}
        </span>
    </div>
}

export default Component