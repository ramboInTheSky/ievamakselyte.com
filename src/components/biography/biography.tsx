import * as React from 'react'
import { bio } from '../../resources'
import { css } from 'emotion'

const style = css`
width: 100%;
& > div{
    clear: both;
}
p{
    display: inline-block;
    float: left;
    text-align: left;
}
& .nameStyle{
    font-weight: bold;
    color: #b25955;
}
& .typeStyle{
    width: 20%;
    font-weight: bold;
    color: #b25955;
}
& .titleStyle{
    width: 30%;
}
& .notesStyle{
    width: 50%;
    color: #b25955;
}
`

export const Biography = () => {
    return (
        <div className={style}>
            <p> <span className="nameStyle"> {bio.name} </span> {bio.summary} </p>
            <p>Filmography:</p>
            {bio.experiences.map((experience) =>
                <div key={experience.title}>
                    <p className="typeStyle">{experience.type}</p>
                    <p className="titleStyle">{experience.title}</p>
                    <p className="notesStyle">{experience.notes}</p>
                </div>
            )}
        </div>
    )
}