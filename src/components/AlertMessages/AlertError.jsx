import Alert from '@mui/material/Alert';

const AlertError = ({text}) => {
  return (
    <div>
      <Alert className='alert-message' variant="filled" severity="error">
        {text}
      </Alert>
    </div>
  )
}

export default AlertError
