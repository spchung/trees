//@flow
import * as React from 'react'

type Props = { 
    text:string,
    checked:boolean,
    onChange:boolean
}

const Checkbox = (props: Props) => (
    <label className="check-label">
        <input type='checkbox' checked={props.checked} onChange={props.onChange}/>
        <span className="checkmark"></span>
        <span className="check-custom">{props.text}</span>
    </label>
)


export default Checkbox; 