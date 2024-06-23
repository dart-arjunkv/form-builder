import Render from './components/Render'
import './styles/index.css'

const data = [
  {
      "uid": "OX_kjHqLuNOa53czwL3fD",
      "parentContainerUid": "main",
      "label": "name",
      "id": "jhvj",
      "name": "name",
      "placeholder": "name",
      "minLength": 0,
      "maxLength": 100,
      "required": true,
      "readOnly": false,
      "disabled": false,
      "type": "text",
      "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n    & input {\n        padding: .65em .8em;\n        width: 100%;\n        font-family: inherit;\n        font-size: .9rem;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        outline: none;\n    }\n\n    & input::placeholder {\n        color: hsl(0, 0%, 46%);\n    }\n"
  },
  {
      "uid": "wCpJq0yQxAqpyFZZ1fZbC",
      "parentContainerUid": "main",
      "label": "age",
      "id": "bjh",
      "name": "age",
      "placeholder": "age",
      "minLength": 0,
      "maxLength": 100,
      "required": true,
      "readOnly": false,
      "disabled": false,
      "type": "text",
      "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n    & input {\n        padding: .65em .8em;\n        width: 100%;\n        font-family: inherit;\n        font-size: .9rem;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        outline: none;\n    }\n\n    & input::placeholder {\n        color: hsl(0, 0%, 46%);\n    }\n"
  },
  {
      "type": "container",
      "uid": "kiJjvOpIOqtT9xv5Mee4L",
      "parentContainerUid": "main",
      "customStyles": "\n    & .builder__form-field-container {\n        margin: 1.2em 0;\n        min-height: 70px;\n        border: 2px dashed hsl(0, 0%, 77%);\n        border-radius: 3px;\n        position: relative;\n    }\n\n    & .builder__form-field-container::before {\n        content: 'Container';\n        position: absolute;\n        top: 0;\n        left: 0;\n        transform: translateY(-18px);\n        font-size: .8em;\n        color: hsl(0, 0%, 31%);\n    }\n",
      "children": [
          {
              "uid": "Czsz9rSfZepb5W-sSIfKn",
              "parentContainerUid": "kiJjvOpIOqtT9xv5Mee4L",
              "label": "something",
              "id": "bh",
              "name": "jhbhjb",
              "placeholder": "sm",
              "minLength": 0,
              "maxLength": 100,
              "required": true,
              "readOnly": false,
              "disabled": false,
              "type": "text",
              "customStyles": "\n    margin-top: .6em;\n    display: flex;\n    align-items: center;\n\n    & label {\n        margin-right: 1em;\n        font-size: .9rem;\n        color: hsl(0, 0%, 31%);\n    }\n    & input {\n        padding: .65em .8em;\n        width: 100%;\n        font-family: inherit;\n        font-size: .9rem;\n        background-color: hsl(0, 0%, 100%);\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        outline: none;\n    }\n\n    & input::placeholder {\n        color: hsl(0, 0%, 46%);\n    }\n"
          }
      ]
  },
  {
      "uid": "z1p6r0VlLSm4Hww_Udlpm",
      "parentContainerUid": "main",
      "required": true,
      "question": "hbjb",
      "optionsCount": "2",
      "type": "checkbox",
      "customStyles": "\n    margin-top: .6em;\n\n    & span {\n        font-size: .9rem;\n        color: hsl(0, 0%, 46%);\n        display: block;\n    }\n\n    & input {\n        display: none;\n    }\n\n    & input + label {\n        display: inline-block;\n        padding: .5em 3em .5em 1em;\n        margin-top: .4em;\n        background-color: transparent;\n        color: hsl(0, 0%, 19%);\n        border: 1px solid hsl(0, 0%, 62%);\n        border-radius: 3px;\n        cursor: pointer;\n        position: relative;\n    }\n\n    & input + label::before {\n        content: '';\n        position: absolute;\n        right: 10px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 12px;\n        height: 12px;\n        background-color: hsl(0, 0%, 95%);\n        border: 2px solid hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n\n    & input:checked + label::after {\n        content: '';\n        position: absolute;\n        right: 13px;\n        top: 50%;\n        transform: translateY(-50%);\n        width: 9px;\n        height: 9px;\n        background-color: hsl(0, 0%, 62%);\n        border-radius: 50%;\n    }\n",
      "options": {
          "label": [
              "jb",
              "jhb",
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
              "hbj",
              "jhbj",
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
              "jhbj",
              "hbj",
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
      "uid": "x8PFeSV2GGcixHcgHZ5wP",
      "parentContainerUid": "main",
      "buttonType": "submit",
      "text": "submit",
      "id": "hbj",
      "name": "jhbj",
      "disabled": false,
      "type": "button",
      "customStyles": "\n    margin-top: .6em;\n\n    & button {\n        margin: .8em 0;\n        padding: .7em 2em;\n        font-size: .9rem;\n        background-color: #9658dc;\n        color: #f2f2f2;\n        border: none;\n        border-radius: 5px;\n        cursor: pointer;\n        transition: background-color 130ms ease-in;\n    }\n\n    & button:hover {\n        background-color: #763bb9;\n    }\n\n    & button:disabled {\n        cursor: not-allowed;\n    }\n"
  }
]

function App() {
    return (
      <Render data={data} />
    )
}

export default App