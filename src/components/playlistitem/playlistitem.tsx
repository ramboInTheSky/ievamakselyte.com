import * as React from 'react'

import './index.css';

export interface PlaylistItemProps {
    playlistItem: any
    selectVideoHandler: Function
}

export class PlaylistItem extends React.PureComponent<PlaylistItemProps> {
    constructor(props: PlaylistItemProps) {
        super(props)
    }

    render() {
        const { playlistItem, selectVideoHandler } = this.props
        return (
            <div className={`playlistItem`} onClick={()=>selectVideoHandler(playlistItem.contentDetails.videoId)}>
                <h3 className="playlistItem--title" >{playlistItem.snippet.title}</h3>
                <img className="playlistItem--img" src={playlistItem.snippet.thumbnails.medium.url} />
            </div>
        )
    }
}