import { useContext, useState } from 'react'
import './App.css'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './page/Home/Home'
import { StoreContext } from './context/StoreContext';
import Loader from './components/Loader/Loader';


function App() {
  const [count, setCount] = useState(0)
  const {isLoading,setIsloading} = useContext(StoreContext)
  return (
    <>
    <ToastContainer />
    {isLoading && <Loader/>}
     <Home /> 
    </>
  )
}

export default App
