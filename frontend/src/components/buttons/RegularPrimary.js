const RegularPrimary = ({stateColor, children, onClick}) => {
    return <button className={`regular primary ${stateColor ? 'color-green' : ''}`} onClick={onClick}>
        {children}
    </button>
}

export default RegularPrimary