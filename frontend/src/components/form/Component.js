import React from 'react'
import {Input} from "../input";
import {ErrorMessage} from "../errormsg";
import "./style.scss"
import {RoundedPrimaryButton, TertiaryButton} from "../buttons";
import {Spinner} from "../spinners";
import {genNameFromPlaceHolder} from "../../utils/tools";

const Component = ({formInitData, formStructure, formButtons, onSubmit, onSuccess, workingText}) => {
    const [formData, setFormData] = React.useState(formInitData)
    const [errorMsg, setError] = React.useState("")
    const [isFetching, setFetching] = React.useState(false)

    const handleChange = (newValue, name) => setFormData({...formData, [name]: newValue})
    const handleSubmit = async (e) => {
        e.preventDefault()

        const equalityResult = formStructure
            .map(i => i.equality)
            .filter((i, index, list) => (i !== undefined) && list.findIndex(s => s === i) === index)
            .map(group =>
                formStructure
                    .filter(fsi => fsi.equality === group)
                    .map(fsi => genNameFromPlaceHolder(fsi))
                    .map(fsi => formData[fsi])
                    .map((fsi, i, list) => fsi === list[0])
            )
            .flat()
            .reduce((acc, curr) => acc && curr, true)

        if (!equalityResult) {
            setError("Inputted data does not match.")
        }

        try {
            setFetching(true)
            const response = await onSubmit(formData)
            setFetching(false)
            setFormData(formInitData)
            onSuccess(response)
        } catch(error) {
            setFetching(false)
            setError(error.message)
        }
    }

    return <>
        <form
            style={{
                "--form-height": `${ ((formStructure.length + 1) * 81) + (formButtons.length * 50) }px`
            }}
            className={`smart-form__body ${!isFetching? 'visible' : ''}`}
        >
            {
                formStructure.map((item, key) =>
                    <Input
                        formData={formData}
                        name={genNameFromPlaceHolder(item)}
                        onChange={handleChange}
                        type={item.type}
                        placeholder={item.placeholder}
                        key={key}
                    />
                )
            }
            <ErrorMessage>
                {errorMsg}
            </ErrorMessage>
            {
                formButtons.map((item, key) => <ParseButton {...item} handleSubmit={handleSubmit} key={key} />)
            }
        </form>
        <div className={`smart-form__fetching ${isFetching ? 'visible' : ''}`}>
            <Spinner
                text={workingText}
            />
        </div>
    </>
}

const ParseButton = ({type, text, isSubmit=false, fn, handleSubmit}) => {
    switch(type) {
        case 'rounded-primary':
            return <RoundedPrimaryButton
                onClick={isSubmit? handleSubmit : fn}
            >
                {text}
            </RoundedPrimaryButton>
        case 'tertiary':
            return <TertiaryButton
                onClick={isSubmit? handleSubmit : fn}
            >
                {text}
            </TertiaryButton>
        default:
            return <></>
    }
}

export default Component