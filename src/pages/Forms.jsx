import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Forms() {
    const [keys, setKeys] = useState([])
    useEffect(() => {
        const getKeys = () => {
            const temp = []
            for (let i = 0; i < localStorage.length; i++) {
                temp.push(localStorage.key(i))
            }
            setKeys([ ...temp ])
        }

        getKeys()
    }, [])
    console.log(keys)
    return (
        <div className='main'>
            <h1 className='main__title'>Forms</h1>
            <div className='forms'>
                {
                    keys.map((key, i) => (
                        <div key={i}>
                            <Link to={`/form/${key}`}>Form {i + 1}</Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Forms