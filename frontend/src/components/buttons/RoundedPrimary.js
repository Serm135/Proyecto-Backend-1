import "./style.scss"

const RoundedPrimary = ({children, onClick}) => {
    return <button onClick={onClick} className={'rounded primary'}>
        {children}
    </button>
}

export default RoundedPrimary