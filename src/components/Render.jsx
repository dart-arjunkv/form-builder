import { useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import '../styles/formBuilder.css'
import { initialFormData } from '../InitialFormData.js'

const globalDropPointUid = 'main'
const formElementsOptionsCountLimit = 10

const formElementsAttributes = {
    text: ['label', 'id', 'name', 'placeholder', 'required', 'readOnly', 'disabled', 'minLength', 'maxLength'],
    number: ['label', 'id', 'name', 'placeholder', 'required', 'readOnly', 'disabled', 'min', 'max'],
    textarea: ['label', 'id', 'name', 'placeholder', 'required', 'readOnly', 'disabled', 'minLength', 'maxLength', 'rows', 'cols'],
    select: ['label', 'id', 'name', 'required', 'disabled', 'multiple', 'optionsCount', { options: ['value', 'text', 'selected', 'disabled'] }],
    checkbox: ['question', 'optionsCount', { options: ['label', 'id', 'name', 'checked', 'required', 'disabled'] }],
    radio: ['question', 'optionsCount', { options: ['label', 'id', 'name', 'checked', 'required', 'disabled'] }],
    date: ['label', 'id', 'name', 'required', 'readOnly', 'disabled'],
    time: ['label', 'id', 'name', 'required', 'readOnly', 'disabled'],
    button: ['buttonType', 'id', 'name', 'disabled', 'text'],
    hidden: ['id', 'name', 'value']
}

function generateCountOptionsHtml() {
    const options = []
    for (let i = 1; i <= formElementsOptionsCountLimit; i++) {
        options.push(<option value={i} key={i}>{i}</option>)
    }
    return options
}

function FormBuilder() {
    const [formData, setFormData] = useState([])
    const dropPointRef = useRef(null)
    const [popup, setPopup] = useState({ show: false, element: { type: null, dropPointUid: null } })

    const [formElementData, setFormElementData] = useState({
        type: '',
        buttonType: 'submit',
        text: '',
        question: '',
        label: '',
        id: '',
        name: '',
        value: '',
        placeholder: '',
        min: 0,
        max: 50,
        minLength: 0,
        maxLength: 100,
        rows: 5,
        cols: 40,
        required: true,
        readOnly: false,
        disabled: false,
        multiple: false,
        optionsCount: 0,
        select: {
            options: {
                value: ['', '', '', '', '', '', '', '', '', ''],
                text: ['', '', '', '', '', '', '', '', '', ''],
                selected: [false, false, false, false, false, false, false, false, false, false],
                disabled: [false, false, false, false, false, false, false, false, false, false]
            }
        },
        checkbox: {
            options: {
                label: ['', '', '', '', '', '', '', '', '', ''],
                id: ['', '', '', '', '', '', '', '', '', ''],
                name: ['', '', '', '', '', '', '', '', '', ''],
                checked: [false, false, false, false, false, false, false, false, false, false],
                required: [true, true, true, true, true, true, true, true, true, true],
                disabled: [false, false, false, false, false, false, false, false, false, false]
            }
        },
        radio: {
            options: {
                label: ['', '', '', '', '', '', '', '', '', ''],
                id: ['', '', '', '', '', '', '', '', '', ''],
                name: ['', '', '', '', '', '', '', '', '', ''],
                checked: [false, false, false, false, false, false, false, false, false, false],
                required: [true, true, true, true, true, true, true, true, true, true],
                disabled: [false, false, false, false, false, false, false, false, false, false]
            }
        }
    })

    const findIndexByUid = (els, uid) => {
        for (let i = 0; i < els.length; i++) {
          const el = els[i];
          if (el.uid === uid) {
            return { index: i, element: el };
          }
          if (el.children) {
            const nestedElement = findIndexByUid(el.children, uid);
            if (nestedElement) {
              return { index: i, nestedElement };
            }
          }
        }
        return null;
    };console.log(formData)

    const handleOnDragStart = (e, type, uid= null, initialDrop= true) => e.dataTransfer.setData('formField', JSON.stringify({ type, uid, initialDrop }))
    const handleOnDragOver = e => e.preventDefault()
    const handleOnDragEnter = () => dropPointRef.current.classList.add('border-active')
    const handleOnDragLeave = () => dropPointRef.current.classList.remove('border-active')
    const handleOnDrop = (e, dropPointUid=globalDropPointUid) => {
        const { type, uid, initialDrop } = JSON.parse(e.dataTransfer.getData('formField'))
        dropPointRef.current.classList.remove('border-active')

        if (initialDrop) {
            if (type === 'container') {
                setFormData(p => ([
                    ...p,
                    {
                        type,
                        uid: nanoid(),
                        parentContainerUid: 'main-container',
                        children: []
                    }
                ]))
            } else {
                // setFormElementData(p => ({ ...p, type }))
                setFormElementData({
                    type,
                    buttonType: 'submit',
                    text: '',
                    question: '',
                    label: '',
                    id: '',
                    name: '',
                    value: '',
                    placeholder: '',
                    min: 0,
                    max: 50,
                    minLength: 0,
                    maxLength: 100,
                    rows: 5,
                    cols: 40,
                    required: true,
                    readOnly: false,
                    disabled: false,
                    multiple: false,
                    optionsCount: 0,
                    select: {
                        options: {
                            value: ['', '', '', '', '', '', '', '', '', ''],
                            text: ['', '', '', '', '', '', '', '', '', ''],
                            selected: [false, false, false, false, false, false, false, false, false, false],
                            disabled: [false, false, false, false, false, false, false, false, false, false]
                        }
                    },
                    checkbox: {
                        options: {
                            label: ['', '', '', '', '', '', '', '', '', ''],
                            id: ['', '', '', '', '', '', '', '', '', ''],
                            name: ['', '', '', '', '', '', '', '', '', ''],
                            checked: [false, false, false, false, false, false, false, false, false, false],
                            required: [true, true, true, true, true, true, true, true, true, true],
                            disabled: [false, false, false, false, false, false, false, false, false, false]
                        }
                    },
                    radio: {
                        options: {
                            label: ['', '', '', '', '', '', '', '', '', ''],
                            id: ['', '', '', '', '', '', '', '', '', ''],
                            name: ['', '', '', '', '', '', '', '', '', ''],
                            checked: [false, false, false, false, false, false, false, false, false, false],
                            required: [true, true, true, true, true, true, true, true, true, true],
                            disabled: [false, false, false, false, false, false, false, false, false, false]
                        }
                    }
                })
                setPopup({ show: true, element: { type, dropPointUid } })
            }
        } else {
            if (dropPointUid === globalDropPointUid) {
                const { index, nestedElement } = findIndexByUid(formData, uid)
                if (nestedElement) {
                    setFormData(p => {
                        const newState = p.map((el, i1) => (i1 === index) ?
                            ({
                                ...el,
                                children: el.children.filter((t, i2) => nestedElement.index !== i2)
                            }) :
                            el
                        )
                        return ([ ...newState, { ...nestedElement.element, parentContainerUid: globalDropPointUid } ])
                    })
                }
            } else {
                const { index, element, nestedElement } = findIndexByUid(formData, uid)
                if (dropPointUid !== nestedElement?.element.parentContainerUid) {
                    if (element) {
                        setFormData(p => {
                            const newState = p.map(el => el.uid === dropPointUid ? ({ ...el, children: [...el.children, { ...element, parentContainerUid: el.uid }] }) : el)
                            return newState.filter((t, i) => index !== i)
                        })
                    } else {
                        setFormData(p => {
                            const newState = p.map(el => el.uid === dropPointUid ? ({ ...el, children: [...el.children, { ...nestedElement.element, parentContainerUid: el.uid }] }) : el)
                            return newState.map((el, i1) => i1 === index ? ({ ...el, children: el.children.filter((t, i2) => nestedElement.index !== i2) }) : el)
                        })
                    }
                }
            }
        }
    }

    const dropElement = ({ dropPointUid }) => {
        const attributes = formElementsAttributes[formElementData.type]
        const filteredData = Object.keys(formElementData).filter(attr => attributes.includes(attr)).reduce((data, attr) => {
            data[attr] = formElementData[attr]
            return data
        }, {})
        filteredData.type = formElementData.type
        if (['select', 'checkbox', 'radio'].includes(formElementData.type)) {
            filteredData[formElementData.type] = formElementData[formElementData.type].options
        }
        if (dropPointUid === globalDropPointUid) {
            setFormData(p => ([
                ...p,
                {
                    uid: nanoid(),
                    parentContainerUid: 'main-container',
                    ...filteredData
                }
            ]))
        } else {
            setFormData(p => p.map(
                element => element.uid === dropPointUid ?
                ({
                    ...element,
                    children: [
                        ...element.children,
                        {
                            uid: nanoid(),
                            parentContainerUid: element.uid,
                            ...filteredData
                        }
                    ]
                }) :
                element
            ))
        }
    }

    const generateFormHtml = (formEl, i) => {
        let formElHtml = ''
        const { uid, parentContainerUid, type, label, id, optionsCount, question, buttonType, text, required, options, ...attr } = formEl
        console.log(attr)
        if (type === 'text' || type === 'number' || type === 'date' || type === 'time' || type === 'hidden') {
            formElHtml = (
                <div
                    className='form-el'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <label htmlFor={id}>{label}</label>
                    <input {...attr} type={type} id={id} />
                </div>
            )
        } else if (type === 'container') {
            formElHtml = (
                <div
                    className='form-cont'
                    onDrop={e => {
                        e.stopPropagation()
                        handleOnDrop(e, uid)
                    }}
                    onDragOver={handleOnDragOver}
                >
                    {
                        formEl.children.map(generateFormHtml)
                    }
                </div>
            )
        } else if (type === 'button') {
            formElHtml = (
                <div
                    className='form-el'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <button
                        type={buttonType}
                        {...attr}
                    >
                        {text}
                    </button>
                </div>
            )
        } else if (type === 'textarea') {
            formElHtml = (
                <div
                    className='form-el'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <label htmlFor={id}>{label}</label>
                    <textarea
                        {...attr}
                        id={id}
                    >
                    </textarea>
                </div>
            )
        } else if (type === 'select') {
            formElHtml = (
                <div
                    className='form-el'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <label htmlFor={id}>{label}</label>
                    <select
                        {...attr}
                        id={id}
                    >
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <option
                                    key={i}
                                    value={options.value[i]}
                                    selected={options.selected[i]}
                                    disabled={options.disabled[i]}
                                >
                                    {options.text[i]}
                                </option>
                            ))
                        }
                    </select>
                </div>
            )
        } else if (type === 'checkbox') {
            formElHtml = (
                <div
                    className='form-el'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <span>{question}</span>
                    <div>
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        id={options.id[i]}
                                        name={options.name[i]}
                                        checked={options.checked[i]}
                                    />
                                    {/* move the required filed to outide of options and do popup validation */}
                                    <label htmlFor={options.id[i]}>{options.label[i]}</label>
                                </div>
                            ))
                        }
                    </div>
                    <input type='checkbox'/>
                </div>
            )
        } else if (type === 'radio') {
            formElHtml = (
                <div
                    className='form-el'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <label></label>
                    <input type='radio'/>
                </div>
            )
        }
        console.log(formElHtml)
        return (
            <div key={i}>{formElHtml}</div>
        )
    }

    const saveForm = () => {
        // const uniqueId = nanoid()
        // localStorage.setItem(uniqueId, JSON.stringify(formData))
        // setFormData([])
    }

    return (
        <div className='main'>
            <h1 className='main__title'>Form builder</h1>
            <div className='builder'>
                <div className='builder__form-els'>
                    <div
                        className='builder__form-el'
                        draggable
                        onDragStart={e => handleOnDragStart(e, 'container')}
                    >
                        container
                    </div>
                    {
                        initialFormData.map((item, i) => (
                            <div
                                key={i}
                                className='builder__form-el'
                                draggable
                                onDragStart={e => handleOnDragStart(e, item.type)}
                            >
                                {item.type}
                            </div>
                        ))
                    }
                </div>
                <div className='builder__droppoint-wrapper'>
                    <div
                        className={`builder__droppoint${formData.length === 0 ? ' show-inst' : ''}`}
                        onDrop={handleOnDrop}
                        onDragOver={handleOnDragOver}
                        onDragEnter={handleOnDragEnter}
                        onDragLeave={handleOnDragLeave}
                        ref={dropPointRef}
                    >
                        {
                            formData.map(generateFormHtml)
                        }
                    </div>
                    <div className='builder__btn-wrapper'>
                        <button onClick={saveForm} className='builder__btn'>save</button>
                    </div>
                </div>
                <div className={`popup-background${popup.show === true ? ' show' : ''}`}>
                    <div className='popup'>
                        <form onSubmit={e => {
                            e.preventDefault()
                            dropElement(popup.element)
                            setPopup(p => ({ ...p, show: false }))
                        }}>
                            {
                                formElementsAttributes[popup.element.type]?.includes('buttonType') &&
                                <div>
                                    <span>Button type</span>
                                    <input
                                        type='radio'
                                        name='buttonType'
                                        value='submit'
                                        id='buttonTypeId1'
                                        onChange={e => setFormElementData(p => ({ ...p, buttonType: e.target.value }))}
                                        checked={formElementData.buttonType === 'submit'}
                                    />
                                    <label htmlFor='buttonTypeId1'>Submit</label>
                                    <input
                                        type='radio'
                                        name='buttonType'
                                        value='button'
                                        id='buttonTypeId2'
                                        onChange={e => setFormElementData(p => ({ ...p, buttonType: e.target.value }))}
                                        checked={formElementData.buttonType === 'button'}
                                    />
                                    <label htmlFor='buttonTypeId2'>Button</label>
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('text') &&
                                <div>
                                    <input
                                        type='text'
                                        name='text'
                                        value={formElementData.text}
                                        placeholder='Text'
                                        onChange={e => setFormElementData(p => ({ ...p, text: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('question') &&
                                <div>
                                    <input
                                        type='text'
                                        name='question'
                                        value={formElementData.question}
                                        placeholder='Question'
                                        onChange={e => setFormElementData(p => ({ ...p, question: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('label') &&
                                <div>
                                    <input
                                        type='text'
                                        name='label'
                                        value={formElementData.label}
                                        placeholder='Label'
                                        onChange={e => setFormElementData(p => ({ ...p, label: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('id') &&
                                <div>
                                    <input
                                        type='text'
                                        name='id'
                                        value={formElementData.id}
                                        placeholder='ID'
                                        onChange={e => setFormElementData(p => ({ ...p, id: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('name') &&
                                <div>
                                    <input
                                        type='text'
                                        name='name'
                                        value={formElementData.name}
                                        placeholder='Name'
                                        onChange={e => setFormElementData(p => ({ ...p, name: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('value') &&
                                <div>
                                    <input
                                        type='text'
                                        name='value'
                                        value={formElementData.value}
                                        placeholder='Value'
                                        onChange={e => setFormElementData(p => ({ ...p, value: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('placeholder') &&
                                <div>
                                    <input
                                        type='text'
                                        name='placeholder'
                                        value={formElementData.placeholder}
                                        placeholder='Placeholder'
                                        onChange={e => setFormElementData(p => ({ ...p, placeholder: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('min') &&
                                <div>
                                    <input
                                        type='number'
                                        name='min'
                                        value={formElementData.min}
                                        placeholder='Min length'
                                        onChange={e => setFormElementData(p => ({ ...p, min: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('max') &&
                                <div>
                                    <input
                                        type='number'
                                        name='max'
                                        value={formElementData.max}
                                        placeholder='Max length'
                                        onChange={e => setFormElementData(p => ({ ...p, max: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('minLength') &&
                                <div>
                                    <input
                                        type='number'
                                        name='minLength'
                                        value={formElementData.minLength}
                                        placeholder='Min length'
                                        onChange={e => setFormElementData(p => ({ ...p, minLength: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('maxLength') &&
                                <div>
                                    <input
                                        type='number'
                                        name='maxLength'
                                        value={formElementData.maxLength}
                                        placeholder='Max length'
                                        onChange={e => setFormElementData(p => ({ ...p, maxLength: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('rows') &&
                                <div>
                                    <input
                                        type='number'
                                        name='rows'
                                        value={formElementData.rows}
                                        placeholder='Rows'
                                        onChange={e => setFormElementData(p => ({ ...p, rows: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('cols') &&
                                <div>
                                    <input
                                        type='number'
                                        name='cols'
                                        value={formElementData.cols}
                                        placeholder='Columns'
                                        onChange={e => setFormElementData(p => ({ ...p, cols: e.target.value }))}
                                    />
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('required') &&
                                <div>
                                    <span>Required</span>
                                    <input
                                        type='radio'
                                        name='required'
                                        value='true'
                                        id='requiredId1'
                                        onChange={e => setFormElementData(p => ({ ...p, required: JSON.parse(e.target.value) }))}
                                        checked={formElementData.required === true}
                                    />
                                    <label htmlFor='requiredId1'>Yes</label>
                                    <input
                                        type='radio'
                                        name='required'
                                        value='false'
                                        id='requiredId2'
                                        onChange={e => setFormElementData(p => ({ ...p, required: JSON.parse(e.target.value) }))}
                                        checked={formElementData.required === false}
                                    />
                                    <label htmlFor='requiredId2'>No</label>
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('readOnly') &&
                                <div>
                                    <span>Readonly</span>
                                    <input
                                        type='radio'
                                        name='readOnly'
                                        value='true'
                                        id='readOnlyId1'
                                        onChange={e => setFormElementData(p => ({ ...p, readOnly: JSON.parse(e.target.value) }))}
                                        checked={formElementData.readOnly === true}
                                    />
                                    <label htmlFor='readOnlyId1'>Yes</label>
                                    <input
                                        type='radio'
                                        name='readOnly'
                                        value='false'
                                        id='readOnlyId2'
                                        onChange={e => setFormElementData(p => ({ ...p, readOnly: JSON.parse(e.target.value) }))}
                                        checked={formElementData.readOnly === false}
                                    />
                                    <label htmlFor='readOnlyId2'>No</label>
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('disabled') &&
                                <div>
                                    <span>Disabled</span>
                                    <input
                                        type='radio'
                                        name='disabled'
                                        value='true'
                                        id='disabledId1'
                                        onChange={e => setFormElementData(p => ({ ...p, disabled: JSON.parse(e.target.value) }))}
                                        checked={formElementData.disabled === true}
                                    />
                                    <label htmlFor='disabledId1'>Yes</label>
                                    <input
                                        type='radio'
                                        name='disabled'
                                        value='false'
                                        id='disabledId2'
                                        onChange={e => setFormElementData(p => ({ ...p, disabled: JSON.parse(e.target.value) }))}
                                        checked={formElementData.disabled === false}
                                    />
                                    <label htmlFor='disabledId2'>No</label>
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('multiple') &&
                                <div>
                                    <span>Multiple</span>
                                    <input
                                        type='radio'
                                        name='multiple'
                                        value='true'
                                        id='multipleId1'
                                        onChange={e => setFormElementData(p => ({ ...p, multiple: JSON.parse(e.target.value) }))}
                                        checked={formElementData.multiple === true}
                                    />
                                    <label htmlFor='multipleId1'>Yes</label>
                                    <input
                                        type='radio'
                                        name='multiple'
                                        value='false'
                                        id='multipleId2'
                                        onChange={e => setFormElementData(p => ({ ...p, multiple: JSON.parse(e.target.value) }))}
                                        checked={formElementData.multiple === false}
                                    />
                                    <label htmlFor='multipleId2'>No</label>
                                </div>
                            }
                            {
                                formElementsAttributes[popup.element.type]?.includes('optionsCount') &&
                                <div>
                                    <select
                                        name='optionsCount'
                                        id='optionsCount'
                                        onChange={e => setFormElementData(p => ({ ...p, optionsCount: e.target.value }))}
                                    >
                                        {generateCountOptionsHtml()}
                                    </select>
                                </div>
                            }
                            {
                                formElementData.optionsCount > 0 &&
                                formElementData.type === 'select' ?
                                (
                                    <div>
                                        {
                                            Array.from({ length: formElementData.optionsCount }).map((_, i) => (
                                                <div key={i}>
                                                    <div>
                                                        <input
                                                            type='text'
                                                            name={`valueOption${i + 1}`}
                                                            value={formElementData[formElementData.type].options.value[i]}
                                                            placeholder='Value'
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            value: p[formElementData.type].options.value.map((op, i1) => i1 === i ? e.target.value : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type='text'
                                                            name={`textOption${i + 1}`}
                                                            value={formElementData[formElementData.type].options.text[i]}
                                                            placeholder='Text'
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            text: p[formElementData.type].options.text.map((op, i1) => i1 === i ? e.target.value : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <span>Selected</span>
                                                        <input
                                                            type='radio'
                                                            name={`selectedOption${i + 1}`}
                                                            value='true'
                                                            id={`selectedOptionIdA${i + 1}`}
                                                            checked={formElementData[formElementData.type].options.selected[i] === true}
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            selected: p[formElementData.type].options.selected.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                        <label htmlFor={`selectedOptionIdA${i + 1}`}>Yes</label>
                                                        <input
                                                            type='radio'
                                                            name={`selectedOption${i + 1}`}
                                                            value='false'
                                                            id={`selectedOptionIdB${i + 1}`}
                                                            checked={formElementData[formElementData.type].options.selected[i] === false}
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            selected: p[formElementData.type].options.selected.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                        <label htmlFor={`selectedOptionIdB${i + 1}`}>No</label>
                                                    </div>
                                                    <div>
                                                        <span>Disabled</span>
                                                        <input
                                                            type='radio'
                                                            name={`disabledOption${i + 1}`}
                                                            value='true'
                                                            id={`disabledOptionIdA${i + 1}`}
                                                            checked={formElementData[formElementData.type].options.disabled[i] === true}
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            disabled: p[formElementData.type].options.disabled.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                        <label htmlFor={`disabledOptionIdA${i + 1}`}>Yes</label>
                                                        <input
                                                            type='radio'
                                                            name={`disabledOption${i + 1}`}
                                                            value='false'
                                                            id={`disabledOptionIdB${i + 1}`}
                                                            checked={formElementData[formElementData.type].options.disabled[i] === false}
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            disabled: p[formElementData.type].options.disabled.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                        <label htmlFor={`disabledOptionIdB${i + 1}`}>No</label>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) :
                                (
                                    <div>
                                        {
                                            Array.from({ length: formElementData.optionsCount }).map((_, i) => (
                                                <div key={i}>
                                                    <div>
                                                        <input
                                                            type='text'
                                                            name={`labelOption${i + 1}`}
                                                            value={formElementData[formElementData.type].options.label[i]}
                                                            placeholder='Label'
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            label: p[formElementData.type].options.label.map((op, i1) => i1 === i ? e.target.value : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type='text'
                                                            name={`idOption${i + 1}`}
                                                            value={formElementData[formElementData.type].options.id[i]}
                                                            placeholder='ID'
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            id: p[formElementData.type].options.id.map((op, i1) => i1 === i ? e.target.value : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type='text'
                                                            name={`nameOption${i + 1}`}
                                                            value={formElementData[formElementData.type].options.name[i]}
                                                            placeholder='Name'
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            name: p[formElementData.type].options.name.map((op, i1) => i1 === i ? e.target.value : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <span>Checked</span>
                                                        <input
                                                            type='radio'
                                                            name={`checkedOption${i + 1}`}
                                                            value='true'
                                                            id={`checkedOptionIdA${i + 1}`}
                                                            checked={formElementData[formElementData.type].options.checked[i] === true}
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            checked: p[formElementData.type].options.checked.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                        <label htmlFor={`checkedOptionIdA${i + 1}`}>Yes</label>
                                                        <input
                                                            type='radio'
                                                            name={`checkedOption${i + 1}`}
                                                            value='false'
                                                            id={`checkedOptionIdB${i + 1}`}
                                                            checked={formElementData[formElementData.type].options.checked[i] === false}
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            checked: p[formElementData.type].options.checked.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                        <label htmlFor={`checkedOptionIdB${i + 1}`}>No</label>
                                                    </div>
                                                    <div>
                                                        <span>Required</span>
                                                        <input
                                                            type='radio'
                                                            name={`requiredOption${i + 1}`}
                                                            value='true'
                                                            id={`requiredOptionIdA${i + 1}`}
                                                            checked={formElementData[formElementData.type].options.required[i] === true}
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            required: p[formElementData.type].options.required.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                        <label htmlFor={`requiredOptionIdA${i + 1}`}>Yes</label>
                                                        <input
                                                            type='radio'
                                                            name={`requiredOption${i + 1}`}
                                                            value='false'
                                                            id={`requiredOptionIdB${i + 1}`}
                                                            checked={formElementData[formElementData.type].options.required[i] === false}
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            required: p[formElementData.type].options.required.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                        <label htmlFor={`requiredOptionIdB${i + 1}`}>No</label>
                                                    </div>
                                                    <div>
                                                        <span>Disabled</span>
                                                        <input
                                                            type='radio'
                                                            name={`disabledOption${i + 1}`}
                                                            value='true'
                                                            id={`disabledOptionIdA${i + 1}`}
                                                            checked={formElementData[formElementData.type].options.disabled[i] === true}
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            disabled: p[formElementData.type].options.disabled.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                        <label htmlFor={`disabledOptionIdA${i + 1}`}>Yes</label>
                                                        <input
                                                            type='radio'
                                                            name={`disabledOption${i + 1}`}
                                                            value='false'
                                                            id={`disabledOptionIdB${i + 1}`}
                                                            checked={formElementData[formElementData.type].options.disabled[i] === false}
                                                            onChange={e => setFormElementData(p => (
                                                                {
                                                                    ...p,
                                                                    [formElementData.type]: {
                                                                        ...p[formElementData.type],
                                                                        options: {
                                                                            ...p[formElementData.type].options,
                                                                            disabled: p[formElementData.type].options.disabled.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                        }
                                                                    }
                                                                }
                                                            ))}
                                                        />
                                                        <label htmlFor={`disabledOptionIdB${i + 1}`}>No</label>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <div>
                                <button type='submit'>
                                    submit
                                </button>
                                <button type='button' onClick={() => setPopup(p => ({ ...p, show: false }))}>
                                    cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormBuilder