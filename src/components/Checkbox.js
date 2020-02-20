import React from 'react'

const Checkbox = ({ type='checkbox', text, checked, onChange }) => (
    <label className="check-label">
        <input type={type} checked={checked} onChange={onChange}/>
        <span className="checkmark"></span>
        <span className="check-custom">{text}</span>
    </label>
)


export default Checkbox; 