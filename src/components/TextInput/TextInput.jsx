import { TextField } from "@mui/material"


const TextInput = (props) => {
  return (
    <div>
      <TextField className="input-text-field" size="small" variant="outlined" {...props}/>
      {props.error ? <p className="errorMessage">{props.errorMessage}</p> : ''}
    </div>
  )
}

export default TextInput
