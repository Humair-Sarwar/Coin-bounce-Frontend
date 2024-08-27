import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginOpenPopup } from "../../store/loginPopupSlice";


const Protected = ({isAuth, children}) => {
  if(isAuth){
    return children;
  }else{
    let dispatch = useDispatch();
    dispatch(loginOpenPopup());
    return <Navigate to='/'/>
  }
}

export default Protected
