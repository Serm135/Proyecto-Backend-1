import React from 'react';
import {useNavigate} from "react-router";
import {RoundedPrimaryButton, RoundedSecondaryButton} from "../../components/buttons";
import "./style.scss"

const Page = () => {
    const navigate = useNavigate();

    const redirectLogin = () => navigate('/login')
    const redirectRegister = () => navigate('/register')

    return (
        <div className="page no-auth-dashboard">
            <span
                style={{
                    "--color-1": "rgb(var(--rainbow-1))",
                    "--color-2": "rgb(var(--rainbow-2))",
                    "--anim-delay": "0s"
                }}
                className={'xxxlarge-text text-900 center-text color-fill animate-enlarge'}
            >
                Buy
            </span>
            <span
                style={{
                    "--color-1": "rgb(var(--rainbow-2))",
                    "--color-2": "rgb(var(--rainbow-3))",
                    "--anim-delay": "0.25s"
                }}
                className={'xxxlarge-text text-900 center-text color-fill animate-enlarge'}
            >
                Make
            </span>
            <span
                style={{
                    "--color-1": "rgb(var(--rainbow-3))",
                    "--color-2": "rgb(var(--rainbow-4))",
                    "--anim-delay": "0.5s"
                }}
                className={'xxxlarge-text text-900 center-text color-fill animate-enlarge'}
            >
                Sell
            </span>
            <span
                className={'xlarge-text center-text subtitle'}
            >
                for free!
            </span>
            <RoundedPrimaryButton
                onClick={redirectLogin}
            >
                Log In
            </RoundedPrimaryButton>
            <RoundedSecondaryButton
                onClick={redirectRegister}
            >
                Register
            </RoundedSecondaryButton>
        </div>
    );
}

export default Page