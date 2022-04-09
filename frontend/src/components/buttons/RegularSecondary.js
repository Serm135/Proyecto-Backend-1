
const RegularSecondary = ({children, onClick}) => {
    return <button className={'regular'} onClick={onClick}>
        {children}
    </button>
}

export default RegularSecondary