import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextInput from "../../components/TextInput/TextInput";
import PasswordInput from "../../components/TextInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { signupOpenPopup } from "../../store/signupPopupSlice";
import { loginClosePopup, loginOpenPopup } from "../../store/loginPopupSlice";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/loginSchema";
import { loginApi } from "../../api/internal";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/userSlice";
import { setErrorState } from "../../store/alertError";
import { setSuccessState } from "../../store/alertSuccess";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePopupOpen = () => {
    dispatch(signupOpenPopup());
    dispatch(loginClosePopup());
  };
  const handleClose = () => {
    onClose(selectedValue);
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        const response = await loginApi(values);
        if(response.status == 200){

          let user = {
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            auth: response.data.auth
          }
          dispatch(setUser(user));
          let data = {
            successState: true,
            message: 'Login Successfully'
          }
          let errordata = {
            errorState: false,
            message: ''
          }
          dispatch(setSuccessState(data));
          dispatch(setErrorState(errordata))
          onClose(selectedValue);
          navigate('/');
          action.resetForm()
        }else if(response.code == 'ERR_BAD_REQUEST'){
          let errorData = {
            errorState: true,
            message: 'Email or password is incorrect'
          }
          dispatch(setErrorState(errorData));
        }else if(response.message = 'Request failed with status code 500'){
          let errorData = {
            errorState: true,
            message: 'Something went wrong!'
          }
          dispatch(setErrorState(errorData));
        }

        console.log(response);
      },
    });


  return (
    <Dialog className="popup-designs" onClose={handleClose} open={open} >
     
      <h1>Login</h1>
      <List sx={{ pt: 0 }} >
        <TextInput
          label="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username && touched.username ? 1 : undefined}
          errorMessage={errors.username}
        />
        <PasswordInput
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password && touched.password ? 1 : undefined}
          errorMessage = {errors.password}
        />
        <Button
         onClick={handleSubmit}
          className="input-text-field"
          variant="contained"
          style={{ textTransform: "capitalize" }}
        >
          Login
        </Button>
        <div className="input-text-field" style={{ textAlign: "center" }}>
          <p>
            Don't have account?{" "}
            <button
              onClick={handlePopupOpen}
              style={{
                marginLeft: "5px",
                cursor: "pointer",
                fontSize: "15px",
                background: "none",
                border: "none",
                textDecoration: "underline",
              }}
            >
              Signup
            </button>
          </p>
        </div>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  let loginPopup = useSelector((state) => state.loginPopup);

  React.useEffect(() => {
    setOpen(loginPopup);
  }, [loginPopup]);
  const handleClickOpen = () => {
    setOpen(true);
    dispatch(loginOpenPopup());
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(loginClosePopup());
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={{ marginRight: "15px" }}
        onClick={handleClickOpen}
      >
        Login
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
