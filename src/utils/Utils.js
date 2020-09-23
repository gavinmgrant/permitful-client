import React from 'react'
import { format as formatDate } from 'date-fns'
import './Utils.css'

export function NiceDate({ date, format='Do MMMM YYYY' }) {
    return formatDate(date, format)
}

export function Hyph() {
    return <span className='hyph'>{' - '}</span>
  }
  
export function Button({ className, ...props }) {
    return <button className={['button', className].join(' ')} {...props} />
}

export function Textarea({ className, ...props }) {
    return (
    <textarea className={['textarea', className].join(' ')} {...props} />
    )
}

export function Input({ className, ...props }) {
    return (
    <input className={['input', className].join(' ')} {...props} />
    )
}

export function Required({ className, ...props }) {
    return (
    <span className={['required', className].join(' ')} {...props}>
        &#42;
    </span>
    )
}