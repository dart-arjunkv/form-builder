import Builder from './components/Builder'
import Render from './components/Render'
import './styles/index.css'

const data = [
    {
        "uid": "b9aUZvqXDsLFap3vrHsE0",
        "parentContainerUid": "main",
        "label": "Name",
        "id": "jhb",
        "name": "jhbjb",
        "placeholder": "Enter name",
        "minLength": 0,
        "maxLength": 100,
        "required": true,
        "readOnly": false,
        "disabled": false,
        "type": "text",
        "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n    & input {\n        padding: .65em .8em;\n        width: 100%;\n        font-family: inherit;\n        font-size: .9rem;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        outline: none;\n    }\n\n    & input::placeholder {\n        color: hsl(0, 0%, 46%);\n    }\n"
    },
    {
        "uid": "ruEw3PROOf5dt0S029KE1",
        "parentContainerUid": "main",
        "label": "Age",
        "id": "hbj",
        "name": "hjbjb",
        "placeholder": "Enter age",
        "minLength": 0,
        "maxLength": 100,
        "required": false,
        "readOnly": false,
        "disabled": false,
        "type": "text",
        "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n    & input {\n        padding: .65em .8em;\n        width: 100%;\n        font-family: inherit;\n        font-size: .9rem;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        outline: none;\n    }\n\n    & input::placeholder {\n        color: hsl(0, 0%, 46%);\n    }\n"
    },
    {
        "type": "container",
        "uid": "YONYlMk18m2G02Z_M5HMR",
        "parentContainerUid": "main",
        "customStyles": "display: flex;",
        "children": [
            {
                "uid": "h8l908WszknGAQ9r1_gIH",
                "parentContainerUid": "YONYlMk18m2G02Z_M5HMR",
                "label": "Phone number",
                "id": "jhb",
                "name": "jhb",
                "placeholder": "Enter phone number",
                "min": 0,
                "max": 50,
                "required": true,
                "readOnly": false,
                "disabled": false,
                "type": "number",
                "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n    & input {\n        padding: .65em .8em;\n        width: 100%;\n        font-family: inherit;\n        font-size: .9rem;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        outline: none;\n    }\n\n    & input::placeholder {\n        color: hsl(0, 0%, 46%);\n    }\n"
            },
            {
                "uid": "yzIWD_d-k387PjZaS8A47",
                "parentContainerUid": "YONYlMk18m2G02Z_M5HMR",
                "label": "select",
                "id": "jhb",
                "name": "jhbj",
                "required": true,
                "disabled": false,
                "multiple": false,
                "optionsCount": "2",
                "type": "select",
                "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n\n    & select {\n        padding: .4em 1.2em .4em .8em;\n        width: 100%;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        cursor: pointer;\n    }\n",
                "options": {
                    "value": [
                        "one",
                        "two",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        ""
                    ],
                    "text": [
                        "one",
                        "two",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        ""
                    ],
                    "selected": [
                        true,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false
                    ],
                    "disabled": [
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false
                    ]
                }
            }
        ]
    },
    {
        "uid": "l3Uk529ItfpL_gS29VLQR",
        "parentContainerUid": "main",
        "required": true,
        "question": "hgjsgf",
        "optionsCount": "2",
        "type": "checkbox",
        "customStyles": "\n    margin-top: .6em;\n\n    & span {\n        font-size: .9rem;\n        color: hsl(0, 0%, 46%);\n        display: block;\n    }\n\n    & input {\n        display: none;\n    }\n\n    & input + label {\n        display: inline-block;\n        padding: .5em 3em .5em 1em;\n        margin-top: .4em;\n        background-color: transparent;\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        cursor: pointer;\n        position: relative;\n    }\n\n    & input + label::before {\n        content: '';\n        position: absolute;\n        right: 10px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 12px;\n        height: 12px;\n        background-color: hsl(0, 0%, 95%);\n        border: 2px solid hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n\n    & input:checked + label::after {\n        content: '';\n        position: absolute;\n        right: 13px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 9px;\n        height: 9px;\n        background-color: hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n",
        "options": {
            "label": [
                "one",
                "jhh",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "id": [
                "hb",
                "jhbb",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "name": [
                "ig",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "checked": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ],
            "disabled": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        }
    },
    {
        "uid": "zmhkaDiS1Pqk-rq_VRvy9",
        "parentContainerUid": "main",
        "required": false,
        "question": "kkjhfbgkhdg",
        "optionsCount": "2",
        "type": "radio",
        "customStyles": "\n    margin-top: .6em;\n\n    & span {\n        font-size: .9rem;\n        color: hsl(0, 0%, 46%);\n        display: block;\n    }\n\n    & input {\n        display: none;\n    }\n\n    & input + label {\n        display: inline-block;\n        padding: .5em 3em .5em 1em;\n        margin-top: .4em;\n        background-color: transparent;\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        cursor: pointer;\n        position: relative;\n    }\n\n    & input + label::before {\n        content: '';\n        position: absolute;\n        right: 10px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 12px;\n        height: 12px;\n        background-color: hsl(0, 0%, 95%);\n        border: 2px solid hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n\n    & input:checked + label::after {\n        content: '';\n        position: absolute;\n        right: 13px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 9px;\n        height: 9px;\n        background-color: hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n",
        "options": {
            "label": [
                "one",
                "two",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "id": [
                "mnd",
                "mnbv",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "name": [
                "cuyu",
                "mfu",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "checked": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ],
            "disabled": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        }
    },
    {
        "uid": "VzouTGmRh5jNXp-a0g0Vw",
        "parentContainerUid": "main",
        "buttonType": "submit",
        "text": "submit",
        "id": "pi",
        "name": "tujg",
        "disabled": false,
        "type": "button",
        "customStyles": "\n    margin-top: .6em;\n\n    & button {\n        margin: .8em 0;\n        padding: .7em 2em;\n        font-size: .9rem;\n        background-color: #9658dc;\n        color: #f2f2f2;\n        border: none;\n        border-radius: 5px;\n        cursor: pointer;\n        transition: background-color 130ms ease-in;\n    }\n\n    & button:hover {\n        background-color: #763bb9;\n    }\n\n    & button:disabled {\n        cursor: not-allowed;\n    }\n"
    }
]

const build = data => {
    console.log(data)
}

function App() {
    return (
      <Render data={data} />
        // <Builder build={build} />
    )
}

export default App