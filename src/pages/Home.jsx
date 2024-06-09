import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()
    
    return (
        <div className='main'>
            <h1 className='main__title'>Form builder</h1>
            <div className='btn-links-wrapper'>
                <button onClick={() => navigate('/form-builder')}>Create a form</button>
                <button onClick={() => navigate('/forms')}>View created forms</button>
            </div>
        </div>
    )
}

export default Home