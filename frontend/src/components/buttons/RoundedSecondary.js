import "./style.scss"

const RoundedSecondary = ({children, onClick}) => {
    return <button onClick={onClick} className={'rounded secondary'}>
        {children}
    </button>
}

export default RoundedSecondary