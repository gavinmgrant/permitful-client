import React from 'react'

export function Hyph() {
    return <span className='hyph'>{' - '}</span>
}
  
export function Button({ className, ...props }) {
    return <button className='button' {...props} />
}

export function Input({ className, ...props }) {
    return (
    <input className='input' {...props} />
    )
}

export function Required({ className, ...props }) {
    return (
    <span className='required' {...props}>
        &#42;
    </span>
    )
}