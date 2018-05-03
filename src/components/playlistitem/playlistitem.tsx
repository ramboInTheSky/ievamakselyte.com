import * as React from 'react'
import Loader  from 'react-loader'

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
            <Loader loaded={!!playlistItem} width={2} lines={12} length={8} color={'#fff'} opacity={0.2} className={'loading'}>
                <div className={`playlistItem`} onClick={() => selectVideoHandler(playlistItem.contentDetails.videoId)}>
                    <h3 className="playlistItem--title" >{playlistItem.snippet.title}</h3>
                    <img className="playlistItem--img" src={playlistItem.snippet.thumbnails.medium.url} />
                </div>
            </Loader>
        )
    }
}