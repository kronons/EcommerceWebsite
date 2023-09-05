import React from 'react'

export const CustomInput = (props) => {
    const {type, name, placeholder, className, value, onChange, onBlur} = props

  return (
    <div>
        <input 
            type = {type}
            name = {name}
            placeholder = {placeholder}
            className = {`form-control ${className}`}
            value = {value}
            onChange = {onChange}
            onBlur = {onBlur}
        />
    </div>
  )
}
