import React from 'react'
import "./style.scss"

const Component = ({placeholder, formData, name, onChange, type}) => {
    return <div className={`input-container ${formData[name] ? 'has-text' : ''}`}>
        <input type={type} value={formData[name]} onChange={e => onChange(e.target.value, name)}/>
        <span className={'placeholder'}>{placeholder}</span>
    </div>
}

export default Component