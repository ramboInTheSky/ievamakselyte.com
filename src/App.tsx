import * as React from 'react';
import { Header, Sidebar, Lightbox } from './components';
import { Fetch } from './stores/fetch'
import YouTube from 'react-youtube';
import './App.css';
import { bio, contacts } from './resources'

interface AppProps {

}

interface AppState {
  playlistsItems?: any[]
  playing: string
  showBio: boolean
  showContacts: boolean
  showSidebar: boolean
}

const initialVideo = 'fDNChTazvaM'

const availablePlaylists: any = {
  film: 'PLh3EflVEVjL-5juT7_ZjgF_mqwvMx57Qk',
  digital: 'PLh3EflVEVjL8pg9eB9SYKWoutjlvrQNnP',
  music: 'PLh3EflVEVjL8iclSgTdTgCX0Xf83djE8r'
}

class App extends React.Component<AppProps, AppState> {
  private videoApiControls: any
  constructor(props: AppProps) {
    super(props)
    this.state = {
      playlistsItems: [],
      playing: initialVideo,
      showBio: false,
      showSidebar: false,
      showContacts: false
    }
  }

  componentWillMount() {
    // Fetch.playlistItems(availablePlaylists.film).then( // TODO this should be coming from a list of items
    //   (data: any) => this.setState({ playlistsItems: data.items })
    // )
  }

  async selectPlaylist(category: string) {
    // this.closeSidebar()
    const playlistId = availablePlaylists[category]
    const data = await Fetch.playlistItems(playlistId)
    this.setState({ playlistsItems: data.items }, this.openSidebar)
  }

  onVideoReady(event: any) {
    // access to player in all event handlers via event.target
    this.videoApiControls = event.target
    // event.target.pauseVideo();
  }
  onVideoPaused(event: any) {

  }
  onVideoPlayed(event: any) {

  }

  selectVideoHandler(videoId: string) {
    this.closeSidebar()
    this.setState({ playing: videoId })
  }

  pauseVideo() {
    this.videoApiControls.pauseVideo()
  }
  playVideo() {
    this.videoApiControls.playVideo()
  }
  backVideo() {
    const current = this.videoApiControls.getCurrentTime()
    this.videoApiControls.seekTo(current - 15)
  }
  fwdVideo() {
    const current = this.videoApiControls.getCurrentTime()
    this.videoApiControls.seekTo(current + 15)
  }
  toggleMute() {
    const isMuted = this.videoApiControls.isMuted()
    if (isMuted) {
      this.videoApiControls.unMute()
    }
    else {
      this.videoApiControls.mute()
    }
  }

  toggleBio() {
    this.closeSidebar()
    this.setState({
      showBio: !this.state.showBio
    })
  }
  toggleContacts() {
    this.closeSidebar()
    this.setState({
      showContacts: !this.state.showContacts
    })
  }

  closeSidebar() {
    this.setState({
      showSidebar: false
    })
  }

  openSidebar() {
    this.setState({
      showSidebar: true
    })
  }

  onBlurHandler() {
    this.closeSidebar()
  }

  render() {

    const opts: any = {
      // height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        rel: 0,
        showinfo: 0,
        loop: 1,
        modestbranding: 1
      }
    };

    const { playlistsItems, playing, showBio, showSidebar, showContacts } = this.state

    const selectVideoHandler = this.selectVideoHandler.bind(this)
    const selectPlaylist = this.selectPlaylist.bind(this)
    const onVideoReady = this.onVideoReady.bind(this)
    const onVideoPaused = this.onVideoPaused.bind(this)
    const onVideoPlayed = this.onVideoPlayed.bind(this)
    const toggleBio = this.toggleBio.bind(this)
    const toggleContacts = this.toggleContacts.bind(this)
    const onBlurHandler = this.onBlurHandler.bind(this)
    const availabilityBanner = (
      <div className="availability_banner" onClick={toggleContacts}>
        <p>2018 - Available for Projects and Commissions</p>
      </div>
    )

    const controls = {
      pause: this.pauseVideo.bind(this),
      play: this.playVideo.bind(this),
      fwd: this.fwdVideo.bind(this),
      back: this.backVideo.bind(this),
      toggleMute: this.toggleMute.bind(this)
    }
    return (
      <div className="App">
        <Header show={false} selectPlaylistHandler={selectPlaylist} videoApiControls={controls} onTitleClick={toggleBio} />
        <Sidebar show={showSidebar} playlists={playlistsItems} selectVideoHandler={selectVideoHandler} onBlur={onBlurHandler} />
        <Lightbox text={bio} className="bioBox" show={showBio} onClick={toggleBio} />
        <Lightbox text={contacts} className="bioBox" show={showContacts} onClick={toggleContacts} />
        <YouTube
          videoId={playing}
          opts={opts}
          onReady={onVideoReady}
          className={'videoPlayer'}
          onPlay={onVideoPlayed}
          onPause={onVideoPaused}
        />
        {availabilityBanner}
      </div>
    );
  }
}

export default App;


