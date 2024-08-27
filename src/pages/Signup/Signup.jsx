import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import TextInput from "../../components/TextInput/TextInput";
import PasswordInput from "../../components/TextInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import {
  signupClosePopup,
  signupOpenPopup,
} from "../../store/signupPopupSlice";
import { loginOpenPopup } from "../../store/loginPopupSlice";
import { useFormik } from "formik";
import { signupSchema } from "../../schemas/signupSchema";
import { signupApi } from "../../api/internal";
import { setErrorState } from "../../store/alertError";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const dispatch = useDispatch();

  const handlePopupOpen = () => {
    dispatch(signupClosePopup());
    dispatch(loginOpenPopup());
  };
  const handleClose = () => {
    onClose(selectedValue);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signupSchema,
      onSubmit: async (values, state) => {
        let data = {
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword
        }
        const response = await signupApi(data);
        console.log(response, 'testing duplicate email verification');
        
        if(response.status == 201){
          state.resetForm();
          dispatch(signupClosePopup());
          dispatch(loginOpenPopup());
        }else if(response.status == 'ERR_BAD_REQUEST'){
          
        }else if(response.message = 'Request failed with status code 500'){
          let errorData = {
            errorState: true,
            message: 'Something went wrong!'
          }
          dispatch(setErrorState(errorData));
        }
        if(response.response.data.message = 'Email already exist!'){
          let errorData = {
            errorState: true,
            message: 'Email already exist!'
          }
          dispatch(setErrorState(errorData));
        }
      }
    });
  return (
    <Dialog className="popup-designs" onClose={handleClose} open={open}>
      <h1>Signup</h1>
      <List sx={{ pt: 0 }}>
        <TextInput
          label="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username && touched.username ? 1 : undefined}
          errorMessage={errors.username}
        />
        <TextInput
          label="Email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.email && touched.email ? 1 : undefined}
          errorMessage={errors.email}
        />
        <PasswordInput
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password && touched.password ? 1 : undefined}
          errorMessage={errors.password}
        />
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
          errorMessage={errors.confirmPassword}
        />
        <Button
          onClick={handleSubmit}
          className="input-text-field"
          color="success"
          variant="contained"
          style={{ textTransform: "capitalize" }}
        >
          Create Account
        </Button>
        <div className="input-text-field" style={{ textAlign: "center" }}>
          <p>
            Already have an account?
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
              Login
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

export default function Signup() {
  const [open, setOpen] = React.useState(false);
  let dispatch = useDispatch();
  let signupPop = useSelector((state) => state.signupPopup);
  React.useEffect(() => {
    setOpen(signupPop);
  }, [signupPop]);
  const handleClickOpen = () => {
    setOpen(true);
    dispatch(signupOpenPopup());
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(signupClosePopup());
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="success"
        onClick={handleClickOpen}
      >
        Signup
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
