import * as React from 'react';
import './index.css';
// const logo = require('../../resources/penis.svg')

interface HeaderProps {
    show: boolean
    selectPlaylistHandler: (category: string) => void
    videoApiControls: {[key:string]:Function}
    onTitleClick: (f:any)=>void
}

interface HeaderState {
    show: boolean
    isMute: boolean
    currentLink: string
}

export class Header extends React.Component<HeaderProps, HeaderState> {

    constructor(props: HeaderProps) {
        super(props)
        const { show } = props
        this.state = {
            show,
            isMute: false,
            currentLink: ''
        }
    }

    componentWillMount() {
        setTimeout(() => this.setState({ show: true }), 3000)
    }

    toggleMute() {
        this.props.videoApiControls.toggleMute()
        this.setState({ isMute: !this.state.isMute })
    }

    selectLink(link: string) {
        const { selectPlaylistHandler, show } = this.props
        const { currentLink } = this.state
        if (link != currentLink || !show) {
            if (selectPlaylistHandler || link) {
                selectPlaylistHandler(link)
            }
            this.setState({currentLink: link})
        }
    }

    render() {
        const { onTitleClick } = this.props
        const { show, isMute } = this.state
        const controls = this.props.videoApiControls
        const toggleMute = this.toggleMute.bind(this)
        const selectLink = this.selectLink.bind(this)

        return (
            <header className={`header ${show ? 'show_inner' : ''} `}>
                <ul className="nav_container">
                    <li><a onClick={() => selectLink('film')} >Film</a></li>
                    <li><a onClick={() => selectLink('digital')} >Digital</a></li>
                    <li><a onClick={() => selectLink('music')} >Music</a></li>
                    <li>
                        <a><i onClick={() => controls.back()} className="fa fa-backward" title="Back 15 seconds" /></a>
                        <a><i onClick={() => controls.play()} className="fa fa-play" title="Play" /></a>
                        <a><i onClick={() => controls.pause()} className="fa fa-pause" title="Pause" /></a>
                        <a><i onClick={() => controls.fwd()} className="fa fa-forward" title="Forward 15 seconds" /></a>
                        {isMute ?
                            <a><i onClick={() => toggleMute()} className="fa fa-volume-off" title="Volume On" /></a>
                            :
                            <a><i onClick={() => toggleMute()} className="fa fa-volume-up" title="Volume Off" /></a>
                        }
                    </li>
                </ul>
                <div className="logo_title_container" onClick={onTitleClick}>
                    {/*<img src={logo} className="logo" alt="logo" />*/}
                    <span className="title">Ieva Makselyte</span>
                </div>
            </header>
        );
    }
}