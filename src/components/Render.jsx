import { useState } from "react"
import styled, { css } from "styled-components"

const StyledFormItemWrapper = styled.div`
    ${
        (props) =>
            props.$customstyles &&
            css`${props.$customstyles}`
    }
`

function Render({ data }) {
    const [formData, setFormData] = useState(data)

    const generateFormHtml = (formItem, i) => {
        let formItemHtml = ''
        const { uid, parentContainerUid, type, label, id, optionsCount, question, buttonType, text, required, options, customStyles, ...attr } = formItem

        if (type === 'text' || type === 'number' || type === 'date' || type === 'time' || type === 'hidden') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        {type === 'hidden' ? ' Hidden input element' : ''}
                        { label && <label htmlFor={id}>{label}</label> }
                        <input {...attr} type={type} id={id} />
                    </StyledFormItemWrapper>
                </div>
            )
        } else if (type === 'container') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        <div className='builder__form-field-container'>
                            {
                                formItem.children.map(generateFormHtml)
                            }
                        </div>
                    </StyledFormItemWrapper>
                </div>
            )
        } else if (type === 'button') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        <button
                            type={buttonType}
                            {...attr}
                        >
                            {text}
                        </button>
                    </StyledFormItemWrapper>
                </div>
            )
        } else if (type === 'textarea') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        { label && <label htmlFor={id}>{label}</label> }
                        <textarea
                            {...attr}
                            id={id}
                        >
                        </textarea>
                    </StyledFormItemWrapper>
                </div>
            )
        } else if (type === 'select') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        { label && <label htmlFor={id}>{label}</label> }
                        <select
                            {...attr}
                            id={id}
                        >
                            <option>select an option</option>
                            {
                                Array.from({ length: optionsCount }).map((_, i) => (
                                    <option
                                        key={i}
                                        value={options.value[i]}
                                        disabled={options.disabled[i]}
                                    >
                                        {options.text[i]}
                                    </option>
                                ))
                            }
                        </select>
                    </StyledFormItemWrapper>
                </div>
            )
        } else if (type === 'checkbox') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        <span>{question}</span>
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        type={type}
                                        id={options.id[i]}
                                        name={options.name[i]}
                                        checked={options.checked[i]}
                                        disabled={options.disabled[i]}
                                        readOnly={true}
                                    />
                                    { options.label[i] && <label htmlFor={options.id[i]}>{options.label[i]}</label> }
                                </div>
                            ))
                        }
                    </StyledFormItemWrapper>
                </div>
            )
        } else if (type === 'radio') {
            formItemHtml = (
                <div>
                    <StyledFormItemWrapper $customstyles={customStyles}>
                        <span>{question}</span>
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        type={type}
                                        id={options.id[i]}
                                        name={options.name[i]}
                                        checked={options.checked[i]}
                                        disabled={options.disabled[i]}
                                        readOnly={true}
                                    />
                                    { options.label[i] && <label htmlFor={options.id[i]}>{options.label[i]}</label> }
                                </div>
                            ))
                        }
                    </StyledFormItemWrapper>
                </div>
            )
        }
        return (
            <div key={i}>{formItemHtml}</div>
        )
    }

    return (
        <div>
            {
                formData.map(generateFormHtml)
            }
        </div>
    )
}

export default Render