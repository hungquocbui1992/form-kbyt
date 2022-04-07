import React from 'react'
import {TextField} from '@mui/material'

const InputField = ({label, value, handleChange,name,error,handleBlur}) => {
  return (
    <div className="mt-3">
    <TextField
      fullWidth
      id="outlined-basic"
      name={name}
      label={label}
      color={error ? 'error' : 'success'}
      value={value}
    inputProps={{style:{border:`${error ? '1px solid red' : '1px solid #9ca3af'}`}}}
      onChange={handleChange}
      onBlur={handleBlur && handleBlur}
      variant="outlined"
    />
    {error && <p className='text-red-500 text-lg'>{error}</p>}
  </div>
  )
}

export default InputField