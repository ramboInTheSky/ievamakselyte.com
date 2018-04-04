import * as React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

import './lightbox.css';

export interface LightboxProps {
    text: string[][]
    className: string
    show: boolean
    onClick?: () => {}
}

export class Lightbox extends React.PureComponent<LightboxProps> {
    constructor(props: LightboxProps) {
        super(props)
    }

    render() {
        const { text, className, show, onClick } = this.props
        return (
            <CSSTransitionGroup
                className="transitionElement"
                transitionName={`animations-${'default'}`}
                transitionEnterTimeout={400}
                transitionLeaveTimeout={400}>
                {show ?
                    <div className={`lightbox ${className || ''}`} onClick={onClick}>
                        <div className="lightbox-header">
                            <span className="pull-left"> Ieva Makselyte</span>
                            <span className="closeBtn pull-right fa fa-times"></span>
                        </div>
                        <div className={`lightbox-body`}>
                            {text.map(item =>
                                <p>{item}</p>
                            )}
                        </div>
                    </div>
                    : null}
            </CSSTransitionGroup>
        )
    }
}