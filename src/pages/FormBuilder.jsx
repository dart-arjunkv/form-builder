import { useRef, useState } from 'react'
import { nanoid } from 'nanoid'

function FormBuilder() {
    const [formData, setFormData] = useState([])
    const dragDropContainerRef = useRef(null)

    const [formFieldOptions, setFormFieldOptions] = useState({
        name: '',
        type: '',
        placeholder: '',
        label: ''
    })

    const [popup, setPopup] = useState(false)

    const handleOnDragStart = (e, formFieldType) => e.dataTransfer.setData('formFieldType', formFieldType)
    const handleOnDragOver = e => e.preventDefault()
    const handleOnDragEnter = () => dragDropContainerRef.current.classList.add('border-highlight')
    const handleOnDragLeave = () => dragDropContainerRef.current.classList.remove('border-highlight')
    const handleOnDrop = e => {
        const formFieldType = e.dataTransfer.getData('formFieldType')
        setFormFieldOptions(p => ({ ...p, type: formFieldType }))
        setPopup(true)
        dragDropContainerRef.current.classList.remove('border-highlight')
    }

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

    const saveForm = () => {
        const uniqueId = nanoid()
        localStorage.setItem(uniqueId, JSON.stringify(formData))
        setFormData([])
    }

    return (
        <div className='main'>
            <h1 className='main__title'>Create a form</h1>
            <div className='form-builder'>
                <div className='form-items'>
                    <div className='form-item' draggable onDragStart={e => handleOnDragStart(e, 'text')}>Text</div>
                    <div className='form-item' draggable onDragStart={e => handleOnDragStart(e, 'button')}>Submit button</div>
                </div>
                <div 
                    className={`drag-and-drop-container${formData.length > 0 ? ' hide-instruction' : ''}`}
                    onDrop={handleOnDrop}
                    onDragOver={handleOnDragOver}
                    onDragEnter={handleOnDragEnter}
                    onDragLeave={handleOnDragLeave}
                    ref={dragDropContainerRef}
                >
                    {
                        formData.map(generateFormHtml)
                    }
                </div>
                <div>
                    <button onClick={saveForm} style={{marginLeft: '1em'}}>save</button>
                </div>
                <div className={`popup-background${popup === true ? ' show' : ''}`}>
                    <div className='popup'>
                        {
                            formFieldOptions.type !== 'button' && 
                            <>
                                <input 
                                    type='text'
                                    name='name'
                                    value={formFieldOptions.name}
                                    onChange={e => setFormFieldOptions(p => ({ ...p, name: e.target.value }))}
                                    placeholder='Name'
                                />
                                <input 
                                    type='text'
                                    name='label'
                                    value={formFieldOptions.label}
                                    onChange={e => setFormFieldOptions(p => ({ ...p, label: e.target.value }))}
                                    placeholder='Label'
                                />
                            </>
                        }
                        <input 
                            type='text'
                            name='placeholder'
                            value={formFieldOptions.placeholder}
                            onChange={e => setFormFieldOptions(p => ({ ...p, placeholder: e.target.value }))}
                            placeholder='Placeholder'
                        />
                        <div>
                            <button onClick={() => {
                                setFormData(p => [...p, { ...formFieldOptions }])
                                setPopup(false)
                                setFormFieldOptions({
                                    name: '',
                                    type: '',
                                    placeholder: '',
                                    label: ''
                                })
                            }}>
                                submit
                            </button>
                            <button onClick={() => {
                                setPopup(false)
                                setFormFieldOptions({
                                    name: '',
                                    type: '',
                                    placeholder: '',
                                    label: ''
                                })
                            }}>
                                close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormBuilder