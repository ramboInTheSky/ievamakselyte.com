import * as React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

import './lightbox.css';

export interface LightboxProps {
    className: string
    show: boolean
    onClick?: (f:any)=>void
}

export class Lightbox extends React.PureComponent<LightboxProps> {
    constructor(props: LightboxProps) {
        super(props)
    }

    render() {
        const { className, show, onClick } = this.props
        return (
            <CSSTransitionGroup
                className="transitionElement"
                transitionName={`animations-${'default'}`}
                transitionEnterTimeout={150}
                transitionLeaveTimeout={100}>
                {show ?
                    <div className={`lightbox ${className || ''}`} >
                        <div className="lightbox-header">
                            {/*<span className="pull-left"> Ieva Makselyte</span>*/}
                            <span onClick={onClick} className="closeBtn pull-right fa fa-times"></span>
                        </div>
                        <div className={`lightbox-body`}>
                            {this.props.children}
                        </div>
                    </div>
                    : null}
            </CSSTransitionGroup>
        )
    }
}