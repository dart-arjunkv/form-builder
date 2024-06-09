import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Form() {
    const { formId } = useParams()
    const [formData, setFormData] = useState([])

    const generateFormHtml = (field, i) => {
        let fieldHtml = ''
        const { name, type, label, placeholder } = field
        if (type === 'text') {
            fieldHtml = <div>
                <label>{label}</label>
                <input type='text' name={name} placeholder={placeholder} />
            </div>
        } else if (type === 'button') {
            fieldHtml = <button>{placeholder}</button>
        }
        return (
            <div key={i}>{fieldHtml}</div>
        )
    }
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(formId))
        setFormData([ ...data ])
    }, [])

    return (
        <div className='main'>
            <h1 className='main__title'>Form</h1>
            <div className='form'>
                {
                    formData.map(generateFormHtml)
                }
            </div>
        </div>
    )
}

export default Form