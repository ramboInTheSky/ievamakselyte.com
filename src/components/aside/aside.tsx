import * as React from 'react';
import { PlaylistItem } from '../playlistitem'
import { CSSTransitionGroup } from 'react-transition-group'

import './index.css';

interface SidebarProps {
    playlists?: any[]
    selectVideoHandler: (videoId: string)=>void
}

interface SidebarState {
    show: boolean
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props)
        this.state = {
            show: false
        }
    }

    onBlurHandler(e: any) {
        e.preventDefault()
        this.setState({ show: false })
    }

    componentWillReceiveProps(nextProps: SidebarProps) {
        if (nextProps.playlists) {
           this.setState({ show: true })
        }

    }

    render() {
        // const { playlists } = this.props
        const { show } = this.state
        const { playlists } = this.props
        const onBlurHandler = this.onBlurHandler.bind(this)
        return (
            <CSSTransitionGroup
                className="transitionElement"
                transitionName={`animations-${'slide_left'}`}
                transitionEnterTimeout={400}
                transitionLeaveTimeout={400}>
                {show ?
                    <div className="leftSide" onMouseLeave={(e) => onBlurHandler(e)}>
                        {playlists && playlists.length ?
                            playlists.map((playlistItem: any, index: number) => <PlaylistItem key={`playlistItem_${index}`} playlistItem={playlistItem} selectVideoHandler={this.props.selectVideoHandler}/>)
                            :
                            null
                        }
                    </div>
                    : null}
            </CSSTransitionGroup>
        )
    }

}