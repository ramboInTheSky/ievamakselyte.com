import * as React from 'react'

export interface ColProps extends React.Props<JSX.Element> {
    className?: string
    flex?: any
}

export const Col: React.StatelessComponent<ColProps> = (props: ColProps): JSX.Element => {
    return (
        <div className={`flex-box__column ${props.className || ''}`} style={{ flex: props.flex || 1 }}>
            {props.children}
        </div>
    )
}

export interface RowProps extends React.Props<JSX.Element> {
    className?: string
    flex?: any
}

export const Row: React.StatelessComponent<RowProps> = (props: RowProps): JSX.Element => {
    return (
        <div className={`flex-box__row ${props.className || ''}`} style={{ flex: props.flex || 1 }}>
            {props.children}
        </div>
    )
}