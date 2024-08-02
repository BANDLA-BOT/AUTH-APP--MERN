import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/Signin' element={<SignIn/>}/>
        <Route path='/Signup' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App