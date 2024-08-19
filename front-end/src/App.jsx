import { useState } from 'react'
import './App.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './page/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer />
     <Home />
     
    </>
  )
}

export default App
