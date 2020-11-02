import React from 'react';
import { Email, Github } from '../../utils/Icons';
import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <section className='contact'>
                <span className='contact-icon'>
                    <a href='mailto: gavingrant@gmail.com' target='_blank' rel='noopener noreferrer'>
                        {Email}
                    </a>
                </span>
                <span className='contact-icon'>
                    <a href='https://github.com/gavinmgrant/permitful-client' target='_blank' rel='noopener noreferrer'>
                        {Github}
                    </a>
                </span>
            </section>
            <section className='copyright'>
                Copyright © 2020 <a href='https://gavingrant.dev/' target='_blank' rel='noopener noreferrer' style={{color: '#000000'}}>Gavin Grant</a>
            </section>
        </footer>
    )
}