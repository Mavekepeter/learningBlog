import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import FooterComp from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import Createpost from './pages/Createpost'
const App = () => {
  return (
    <BrowserRouter>
    <Header/>
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path='/create-post' element={<Createpost/>} />
        </Route>
        <Route path='/projects' element={<Projects/>} />
       </Routes>
       <FooterComp/>
    </BrowserRouter>
  )
}

export default App