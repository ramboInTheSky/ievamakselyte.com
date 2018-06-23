import * as React from 'react'
import { contacts } from '../../resources'
import { css } from 'emotion'

const style = css`
width: 100%;
p{
    display: block;
    clear: both;
}
`

export const Contacts = () => {
    return (
        <div className={style}>
            <p>{contacts.email}</p>
            <p><a href={contacts.imdb} target="_blank" className="notesStyle">IMDB</a></p>
        </div>
    )
}