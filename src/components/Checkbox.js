import React from 'react'

const Checkbox = ({ type='checkbox', text, checked, onChange }) => (
    <>
        <input type={type} checked={checked} onChange={onChange} />
        <span>{text}</span>
    </>
)

export default Checkbox