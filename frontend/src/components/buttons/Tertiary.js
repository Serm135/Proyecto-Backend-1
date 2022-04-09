const Tertiary = ({children, onClick}) => {
    return <button className={'tertiary'} onClick={onClick}>
        {children}
    </button>
}

export default Tertiary