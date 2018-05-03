import * as React from 'react';
import { PlaylistItem } from '../playlistitem'
import { CSSTransitionGroup } from 'react-transition-group'

import './index.css';

interface SidebarProps {
    playlists?: any[]
    show: boolean
    onBlur: Function
    selectVideoHandler: (videoId: string) => void
}

interface SidebarState {
    show: boolean
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props)
        this.state = {
            show: props.show
        }
    }

    componentWillReceiveProps(nextProps: SidebarProps) {
        if (nextProps.playlists) {
            this.setState({ show: nextProps.show })
        }

    }

    render() {
        // const { playlists } = this.props
        const { show } = this.state
        const { playlists, onBlur } = this.props
        return (
            <CSSTransitionGroup
                className="transitionElement"
                transitionName={`animations-${'slide_left'}`}
                transitionEnterTimeout={400}
                transitionLeaveTimeout={400}>
                {show ?
                    <div className="leftSide" onMouseLeave={(e) => onBlur()}>
                        {playlists && playlists.length ?
                            playlists.map((playlistItem: any, index: number) => <PlaylistItem key={`playlistItem_${index}`} playlistItem={playlistItem} selectVideoHandler={this.props.selectVideoHandler} />)
                            :
                            null
                        }
                    </div>
                    : null}
            </CSSTransitionGroup>
        )
    }

}