import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Home from './pages/Home'
import FormBuilder from './pages/FormBuilder'
import Forms from './pages/Forms'
import Form from './pages/Form'

import './App.css'

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/form-builder', element: <FormBuilder /> },
    { path: '/forms', element: <Forms /> },
    { path: '/form/:formId', element: <Form /> },
])

function App() {
    return (
      <RouterProvider router={router} />
    )
}

export default App