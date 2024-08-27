import Alert from '@mui/material/Alert';

const SuccessMessage = ({text}) => {
  return (
    <div>
      <Alert className='alert-message' variant="filled" severity="success">
        {text}
      </Alert>
    </div>
  )
}

export default SuccessMessage
