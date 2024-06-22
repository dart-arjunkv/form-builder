import { useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import '../styles/builder.css'

const formLayouts = ['container']
const formFields = {
    text: ['label', 'id', 'name', 'placeholder', 'required', 'readOnly', 'disabled', 'minLength', 'maxLength'],
    number: ['label', 'id', 'name', 'placeholder', 'required', 'readOnly', 'disabled', 'min', 'max'],
    textarea: ['label', 'id', 'name', 'placeholder', 'required', 'readOnly', 'disabled', 'minLength', 'maxLength', 'rows', 'cols'],
    select: ['label', 'id', 'name', 'required', 'disabled', 'multiple', 'optionsCount', { options: ['value', 'text', 'selected', 'disabled'] }],
    checkbox: ['question', 'required', 'optionsCount', { options: ['label', 'id', 'name', 'checked', 'disabled'] }],
    radio: ['question', 'required', 'optionsCount', { options: ['label', 'id', 'name', 'checked', 'disabled'] }],
    date: ['label', 'id', 'name', 'required', 'readOnly', 'disabled'],
    time: ['label', 'id', 'name', 'required', 'readOnly', 'disabled'],
    button: ['buttonType', 'id', 'name', 'disabled', 'text'],
    hidden: ['id', 'name', 'value']
}
const mainDropPointUid = 'main'
const formFieldOptionsLimit = 10 // change formFieldData when changing this

const findIndexByUid = (items, uid) => {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.uid === uid) {
            return { index: i, item }
        }
        if (item.children) {
            const nestedItem = findIndexByUid(item.children, uid)
            if (nestedItem) {
                return { index: i, nestedItem }
            }
        }
    }
    return null
}

function Builder() {
    const [formData, setFormData] = useState([])
    const dropPointRef = useRef(null)
    const [popup, setPopup] = useState({ show: false, element: { type: null, dropPointUid: null } })

    const [formFieldData, setFormFieldData] = useState({
        type: '',
        buttonType: 'submit',
        text: '',
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
        question: '',
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
                disabled: [false, false, false, false, false, false, false, false, false, false]
            }
        },
        radio: {
            options: {
                label: ['', '', '', '', '', '', '', '', '', ''],
                id: ['', '', '', '', '', '', '', '', '', ''],
                name: ['', '', '', '', '', '', '', '', '', ''],
                checked: [false, false, false, false, false, false, false, false, false, false],
                disabled: [false, false, false, false, false, false, false, false, false, false]
            }
        }
    })

    const handleOnDragStart = (e, type, uid= null, initialDrop= true) => e.dataTransfer.setData('formField', JSON.stringify({ type, uid, initialDrop }))
    const handleOnDragOver = e => e.preventDefault()
    const handleOnDragEnter = () => dropPointRef.current.classList.add('border-color')
    const handleOnDragLeave = () => dropPointRef.current.classList.remove('border-color')
    const handleOnDrop = (e, dropPointUid=mainDropPointUid) => {
        const { type, uid, initialDrop } = JSON.parse(e.dataTransfer.getData('formField'))
        dropPointRef.current.classList.remove('border-color')

        if (initialDrop) {
            if (type === 'container') {
                setFormData(p => ([
                    ...p,
                    {
                        type,
                        uid: nanoid(),
                        parentContainerUid: mainDropPointUid,
                        children: []
                    }
                ]))
            } else {
                setFormFieldData({
                    type: '',
                    buttonType: 'submit',
                    text: '',
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
                    question: '',
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
                            disabled: [false, false, false, false, false, false, false, false, false, false]
                        }
                    },
                    radio: {
                        options: {
                            label: ['', '', '', '', '', '', '', '', '', ''],
                            id: ['', '', '', '', '', '', '', '', '', ''],
                            name: ['', '', '', '', '', '', '', '', '', ''],
                            checked: [false, false, false, false, false, false, false, false, false, false],
                            disabled: [false, false, false, false, false, false, false, false, false, false]
                        }
                    }
                })
                setPopup({ show: true, element: { type, dropPointUid } })
            }
        } else {
            if (dropPointUid === mainDropPointUid) {
                const { index, nestedItem } = findIndexByUid(formData, uid)
                if (nestedItem) {
                    setFormData(p => {
                        const newState = p.map((item, i1) => (i1 === index) ?
                            ({
                                ...item,
                                children: item.children.filter((_, i2) => nestedItem.index !== i2)
                            }) :
                            item
                        )
                        return ([ ...newState, { ...nestedItem.item, parentContainerUid: mainDropPointUid } ])
                    })
                }
            } else {
                const { index, item, nestedItem } = findIndexByUid(formData, uid)
                if (dropPointUid !== nestedItem?.item?.parentContainerUid) {
                    if (item) {
                        setFormData(p => {
                            const newState = p.map(fi => fi.uid === dropPointUid ? ({ ...fi, children: [...fi.children, { ...item, parentContainerUid: fi.uid }] }) : fi)
                            return newState.filter((_, i) => index !== i)
                        })
                    } else {
                        setFormData(p => {
                            const newState = p.map(fi => fi.uid === dropPointUid ? ({ ...fi, children: [...fi.children, { ...nestedItem.item, parentContainerUid: fi.uid }] }) : fi)
                            return newState.map((fi, i1) => i1 === index ? ({ ...fi, children: fi.children.filter((_, i2) => nestedItem.index !== i2) }) : fi)
                        })
                    }
                }
            }
        }
    }

    const drop = ({ type, dropPointUid }) => {
        const attrList = formFields[type]
        const filteredData = Object.keys(formFieldData).filter(attr => attrList.includes(attr)).reduce((data, attr) => {
            data[attr] = formFieldData[attr]
            return data
        }, {})
        filteredData.type = type
        if (['select', 'checkbox', 'radio'].includes(type)) {
            filteredData[type] = formFieldData[type].options
        }
        if (dropPointUid === mainDropPointUid) {
            setFormData(p => ([
                ...p,
                {
                    uid: nanoid(),
                    parentContainerUid: mainDropPointUid,
                    ...filteredData
                }
            ]))
        } else {
            setFormData(p => p.map(
                fi => fi.uid === dropPointUid ?
                ({
                    ...fi,
                    children: [
                        ...fi.children,
                        {
                            uid: nanoid(),
                            parentContainerUid: fi.uid,
                            ...filteredData
                        }
                    ]
                }) :
                fi
            ))
        }
    }

    const generateFormHtml = (formItem, i) => {
        let formItemHtml = ''
        const { uid, parentContainerUid, type, label, id, optionsCount, question, buttonType, text, required, options, ...attr } = formItem

        if (type === 'text' || type === 'number' || type === 'date' || type === 'time' || type === 'hidden') {
            formItemHtml = (
                <div
                    className='form-item'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <label htmlFor={id}>{label}</label>
                    <input {...attr} type={type} id={id} />
                </div>
            )
        } else if (type === 'container') {
            formItemHtml = (
                <div
                    className='form-container'
                    onDrop={e => {
                        e.stopPropagation()
                        handleOnDrop(e, uid)
                    }}
                    onDragOver={handleOnDragOver}
                >
                    {
                        formItem.children.map(generateFormHtml)
                    }
                </div>
            )
        } else if (type === 'button') {
            formItemHtml = (
                <div
                    className='form-item'
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
            formItemHtml = (
                <div
                    className='form-item'
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
            formItemHtml = (
                <div
                    className='form-item'
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
            formItemHtml = (
                <div
                    className='form-item'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <span>{question}</span>
                    <div>
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        type={type}
                                        id={options.id[i]}
                                        name={options.name[i]}
                                        checked={options.checked[i]}
                                        disabled={options.disabled[i]}
                                    />
                                    <label htmlFor={options.id[i]}>{options.label[i]}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        } else if (type === 'radio') {
            formItemHtml = (
                <div
                    className='form-item'
                    draggable
                    onDragStart={e => handleOnDragStart(e, type, uid, false)}
                >
                    <span>{question}</span>
                    <div>
                        {
                            Array.from({ length: optionsCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        type={type}
                                        id={options.id[i]}
                                        name={options.name[i]}
                                        checked={options.checked[i]}
                                        disabled={options.disabled[i]}
                                    />
                                    <label htmlFor={options.id[i]}>{options.label[i]}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
        return (
            <div key={i}>{formItemHtml}</div>
        )
    }

    const save = () => {
        console.log('sjhbg')
    }
    return (
        <div className='builder'>
            <div className='builder__sidebar'>
                {
                    formLayouts.map((layout, i) => (
                        <div
                            key={i}
                            className='builder__sidebar-item'
                            draggable
                            onDragStart={e => handleOnDragStart(e, layout)}
                        >
                            {layout}
                        </div>
                    ))
                }
                {
                    Object.keys(formFields).map((field, i) => (
                        <div
                            key={i}
                            className='builder__sidebar-item'
                            draggable
                            onDragStart={e => handleOnDragStart(e, field)}
                        >
                            {field}
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
                    <button onClick={save} className='builder__btn-save'>save</button>
                </div>
            </div>
            <div className={`builder__popup-bg${popup.show === true ? ' show' : ''}`}>
                <div className='builder__popup'>
                    <form onSubmit={e => {
                        e.preventDefault()
                        drop(popup.element)
                        setPopup(p => ({ ...p, show: false }))
                    }}>
                        <div className='builder__popup-flex-wrapper'>
                            <div className='builder__popup-html-section'>
                                <h2 className='builder__popup-html-title'>Html</h2>
                                {
                                    formFields[popup.element.type]?.includes('buttonType') &&
                                    <div>
                                        <span>Button type</span>
                                        <input
                                            type='radio'
                                            name='buttonType'
                                            value='submit'
                                            id='buttonTypeId1'
                                            onChange={e => setFormFieldData(p => ({ ...p, buttonType: e.target.value }))}
                                            checked={formFieldData.buttonType === 'submit'}
                                        />
                                        <label htmlFor='buttonTypeId1'>Submit</label>
                                        <input
                                            type='radio'
                                            name='buttonType'
                                            value='button'
                                            id='buttonTypeId2'
                                            onChange={e => setFormFieldData(p => ({ ...p, buttonType: e.target.value }))}
                                            checked={formFieldData.buttonType === 'button'}
                                        />
                                        <label htmlFor='buttonTypeId2'>Button</label>
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('text') &&
                                    <div>
                                        <input
                                            type='text'
                                            name='text'
                                            value={formFieldData.text}
                                            placeholder='Text'
                                            onChange={e => setFormFieldData(p => ({ ...p, text: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('question') &&
                                    <div>
                                        <input
                                            type='text'
                                            name='question'
                                            value={formFieldData.question}
                                            placeholder='Question'
                                            onChange={e => setFormFieldData(p => ({ ...p, question: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('label') &&
                                    <div>
                                        <input
                                            type='text'
                                            name='label'
                                            value={formFieldData.label}
                                            placeholder='Label'
                                            onChange={e => setFormFieldData(p => ({ ...p, label: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('id') &&
                                    <div>
                                        <input
                                            type='text'
                                            name='id'
                                            value={formFieldData.id}
                                            placeholder='ID'
                                            onChange={e => setFormFieldData(p => ({ ...p, id: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('name') &&
                                    <div>
                                        <input
                                            type='text'
                                            name='name'
                                            value={formFieldData.name}
                                            placeholder='Name'
                                            onChange={e => setFormFieldData(p => ({ ...p, name: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('value') &&
                                    <div>
                                        <input
                                            type='text'
                                            name='value'
                                            value={formFieldData.value}
                                            placeholder='Value'
                                            onChange={e => setFormFieldData(p => ({ ...p, value: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('placeholder') &&
                                    <div>
                                        <input
                                            type='text'
                                            name='placeholder'
                                            value={formFieldData.placeholder}
                                            placeholder='Placeholder'
                                            onChange={e => setFormFieldData(p => ({ ...p, placeholder: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('min') &&
                                    <div>
                                        <input
                                            type='number'
                                            name='min'
                                            value={formFieldData.min}
                                            placeholder='Min length'
                                            onChange={e => setFormFieldData(p => ({ ...p, min: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('max') &&
                                    <div>
                                        <input
                                            type='number'
                                            name='max'
                                            value={formFieldData.max}
                                            placeholder='Max length'
                                            onChange={e => setFormFieldData(p => ({ ...p, max: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('minLength') &&
                                    <div>
                                        <input
                                            type='number'
                                            name='minLength'
                                            value={formFieldData.minLength}
                                            placeholder='Min length'
                                            onChange={e => setFormFieldData(p => ({ ...p, minLength: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('maxLength') &&
                                    <div>
                                        <input
                                            type='number'
                                            name='maxLength'
                                            value={formFieldData.maxLength}
                                            placeholder='Max length'
                                            onChange={e => setFormFieldData(p => ({ ...p, maxLength: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('rows') &&
                                    <div>
                                        <input
                                            type='number'
                                            name='rows'
                                            value={formFieldData.rows}
                                            placeholder='Rows'
                                            onChange={e => setFormFieldData(p => ({ ...p, rows: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('cols') &&
                                    <div>
                                        <input
                                            type='number'
                                            name='cols'
                                            value={formFieldData.cols}
                                            placeholder='Columns'
                                            onChange={e => setFormFieldData(p => ({ ...p, cols: e.target.value }))}
                                        />
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('required') &&
                                    <div>
                                        <span>Required</span>
                                        <input
                                            type='radio'
                                            name='required'
                                            value='true'
                                            id='requiredId1'
                                            onChange={e => setFormFieldData(p => ({ ...p, required: JSON.parse(e.target.value) }))}
                                            checked={formFieldData.required === true}
                                        />
                                        <label htmlFor='requiredId1'>Yes</label>
                                        <input
                                            type='radio'
                                            name='required'
                                            value='false'
                                            id='requiredId2'
                                            onChange={e => setFormFieldData(p => ({ ...p, required: JSON.parse(e.target.value) }))}
                                            checked={formFieldData.required === false}
                                        />
                                        <label htmlFor='requiredId2'>No</label>
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('readOnly') &&
                                    <div>
                                        <span>Readonly</span>
                                        <input
                                            type='radio'
                                            name='readOnly'
                                            value='true'
                                            id='readOnlyId1'
                                            onChange={e => setFormFieldData(p => ({ ...p, readOnly: JSON.parse(e.target.value) }))}
                                            checked={formFieldData.readOnly === true}
                                        />
                                        <label htmlFor='readOnlyId1'>Yes</label>
                                        <input
                                            type='radio'
                                            name='readOnly'
                                            value='false'
                                            id='readOnlyId2'
                                            onChange={e => setFormFieldData(p => ({ ...p, readOnly: JSON.parse(e.target.value) }))}
                                            checked={formFieldData.readOnly === false}
                                        />
                                        <label htmlFor='readOnlyId2'>No</label>
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('disabled') &&
                                    <div>
                                        <span>Disabled</span>
                                        <input
                                            type='radio'
                                            name='disabled'
                                            value='true'
                                            id='disabledId1'
                                            onChange={e => setFormFieldData(p => ({ ...p, disabled: JSON.parse(e.target.value) }))}
                                            checked={formFieldData.disabled === true}
                                        />
                                        <label htmlFor='disabledId1'>Yes</label>
                                        <input
                                            type='radio'
                                            name='disabled'
                                            value='false'
                                            id='disabledId2'
                                            onChange={e => setFormFieldData(p => ({ ...p, disabled: JSON.parse(e.target.value) }))}
                                            checked={formFieldData.disabled === false}
                                        />
                                        <label htmlFor='disabledId2'>No</label>
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('multiple') &&
                                    <div>
                                        <span>Multiple</span>
                                        <input
                                            type='radio'
                                            name='multiple'
                                            value='true'
                                            id='multipleId1'
                                            onChange={e => setFormFieldData(p => ({ ...p, multiple: JSON.parse(e.target.value) }))}
                                            checked={formFieldData.multiple === true}
                                        />
                                        <label htmlFor='multipleId1'>Yes</label>
                                        <input
                                            type='radio'
                                            name='multiple'
                                            value='false'
                                            id='multipleId2'
                                            onChange={e => setFormFieldData(p => ({ ...p, multiple: JSON.parse(e.target.value) }))}
                                            checked={formFieldData.multiple === false}
                                        />
                                        <label htmlFor='multipleId2'>No</label>
                                    </div>
                                }
                                {
                                    formFields[popup.element.type]?.includes('optionsCount') &&
                                    <div>
                                        <select
                                            name='optionsCount'
                                            id='optionsCount'
                                            onChange={e => setFormFieldData(p => ({ ...p, optionsCount: e.target.value }))}
                                        >
                                            <option>select no of options</option>
                                            {
                                                Array.from({ length: formFieldOptionsLimit }).map((_, i) => (
                                                    <option value={i + 1} key={i}>{i + 1}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                }
                                {
                                    formFieldData.optionsCount > 0 &&
                                    popup.element.type === 'select' ?
                                    (
                                        <div className='builder__popup-options-wrapper'>
                                            {
                                                Array.from({ length: formFieldData.optionsCount }).map((_, i) => (
                                                    <div key={i}>
                                                        <div>
                                                            <input
                                                                type='text'
                                                                name={`valueOption${i + 1}`}
                                                                value={formFieldData[popup.element.type].options.value[i]}
                                                                placeholder='Value'
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                value: p[popup.element.type].options.value.map((op, i1) => i1 === i ? e.target.value : op)
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
                                                                value={formFieldData[popup.element.type].options.text[i]}
                                                                placeholder='Text'
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                text: p[popup.element.type].options.text.map((op, i1) => i1 === i ? e.target.value : op)
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
                                                                checked={formFieldData[popup.element.type].options.selected[i] === true}
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                selected: p[popup.element.type].options.selected.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
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
                                                                checked={formFieldData[popup.element.type].options.selected[i] === false}
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                selected: p[popup.element.type].options.selected.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
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
                                                                checked={formFieldData[popup.element.type].options.disabled[i] === true}
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                disabled: p[popup.element.type].options.disabled.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
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
                                                                checked={formFieldData[popup.element.type].options.disabled[i] === false}
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                disabled: p[popup.element.type].options.disabled.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
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
                                        <div className='builder__popup-options-wrapper'>
                                            {
                                                Array.from({ length: formFieldData.optionsCount }).map((_, i) => (
                                                    <div key={i}>
                                                        <div>
                                                            <input
                                                                type='text'
                                                                name={`labelOption${i + 1}`}
                                                                value={formFieldData[popup.element.type].options.label[i]}
                                                                placeholder='Label'
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                label: p[popup.element.type].options.label.map((op, i1) => i1 === i ? e.target.value : op)
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
                                                                value={formFieldData[popup.element.type].options.id[i]}
                                                                placeholder='ID'
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                id: p[popup.element.type].options.id.map((op, i1) => i1 === i ? e.target.value : op)
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
                                                                value={formFieldData[popup.element.type].options.name[i]}
                                                                placeholder='Name'
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                name: p[popup.element.type].options.name.map((op, i1) => i1 === i ? e.target.value : op)
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
                                                                checked={formFieldData[popup.element.type].options.checked[i] === true}
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                checked: p[popup.element.type].options.checked.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
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
                                                                checked={formFieldData[popup.element.type].options.checked[i] === false}
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                checked: p[popup.element.type].options.checked.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
                                                                            }
                                                                        }
                                                                    }
                                                                ))}
                                                            />
                                                            <label htmlFor={`checkedOptionIdB${i + 1}`}>No</label>
                                                        </div>
                                                        <div>
                                                            <span>Disabled</span>
                                                            <input
                                                                type='radio'
                                                                name={`disabledOption${i + 1}`}
                                                                value='true'
                                                                id={`disabledOptionIdA${i + 1}`}
                                                                checked={formFieldData[popup.element.type].options.disabled[i] === true}
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                disabled: p[popup.element.type].options.disabled.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
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
                                                                checked={formFieldData[popup.element.type].options.disabled[i] === false}
                                                                onChange={e => setFormFieldData(p => (
                                                                    {
                                                                        ...p,
                                                                        [popup.element.type]: {
                                                                            ...p[popup.element.type],
                                                                            options: {
                                                                                ...p[popup.element.type].options,
                                                                                disabled: p[popup.element.type].options.disabled.map((op, i1) => i1 === i ? JSON.parse(e.target.value) : op)
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
                            </div>
                            <div className='builder__popup-style-section'>
                                <h2 className='builder__popup-style-title'>Styles</h2>
                            </div>
                        </div>
                        <div className='builder__popup-btn-wrapper'>
                            <button 
                                type='button' 
                                className='builder__popup-btn-cancel'
                                onClick={() => setPopup(p => ({ ...p, show: false }))}
                            >
                                cancel
                            </button>
                            <button type='submit' className='builder__popup-btn-submit'>
                                submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Builder