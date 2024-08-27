import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Crypto from "./pages/Crypto/Crypto"
import Blog from "./pages/Blog/Blog"
import SubmitBlog from "./pages/SubmitBlog/SubmitBlog"
import Protected from "./components/Protected/Protected"
import { useDispatch, useSelector } from "react-redux"
import AlertError from "./components/AlertMessages/AlertError"
import { setErrorState } from "./store/alertError"
import SuccessMessage from "./components/AlertMessages/SuccessMessage"
import { setSuccessState } from "./store/alertSuccess"
import BlogDetails from "./pages/BlogDetails/BlogDetails"
import useAutoLogin from "./hook/userAutoLogin"
import Loader from "./components/Loader/Loader"
import EditBlog from "./pages/EditBlog/EditBlog"


function App() {
  let dispatch = useDispatch();
  let isAuth = useSelector(state=>state.user.auth);
  const errorData = useSelector(state=>state.error);
  const successData = useSelector(state=>state.success);
  setTimeout(()=>{
    let erroData = {
      errorState: false,
      message: ''
    }
    let successData = {
      successState: false,
      message: ''
    }
    dispatch(setErrorState(erroData));
    dispatch(setSuccessState(successData))
  }, 5000);
  const loading = useAutoLogin();
  let switchCheck = useSelector(state=>state.switchCheck)
  
  return loading ? <Loader/> :
    
      <BrowserRouter>
      {errorData.errorState ? <AlertError text={errorData.message}/> : ''}
      {successData.successState ? <SuccessMessage text={successData.message}/> : ''}
    <body style={{background: (switchCheck ? 'black': 'white'), color: (switchCheck ? 'white': 'black')}}>
      <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/cryptocurrencies" exact element={<Crypto/>}/>
          <Route path="/blog" exact element={<Protected isAuth={isAuth}><Blog/></Protected>}/>
          <Route path="/submit-blog" exact element={<Protected isAuth={isAuth}><SubmitBlog/></Protected>}/>
          <Route path="/blog/blog-detail/:id" exact element={<Protected isAuth={isAuth}><BlogDetails/></Protected>}/>
          <Route path="/edit-blog/:id" exact element={<Protected isAuth={isAuth}><EditBlog/></Protected>}/>
        </Routes>
        <Footer/>
      </body>
      </BrowserRouter>
    
}

export default App
