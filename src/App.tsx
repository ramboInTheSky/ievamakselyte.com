import * as React from 'react';
import { Header, Sidebar, Lightbox } from './components';
import { Fetch } from './stores/fetch'
import YouTube from 'react-youtube';
import './App.css';
import { bio, contacts } from './resources'


//todo: implement caching in the requests -WONTDO
//todo: make use of HTTP caching -DONE
//todo: implement partial loading with loading gif -DONE

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
  private videoApiControls: { [key: string]: Function }
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

  selectPlaylist = async (category: string) => {
    const playlistId = availablePlaylists[category]
    try {
      const data = await Fetch.playlistItems(playlistId)
      this.setState({ playlistsItems: data.items }, this.openSidebar)
    }
    catch (e) {
      console.log(e)
      alert('It looks like you have no connection to the internet')
    }
  }

  onVideoReady = (event: any) => {
    // access to player in all event handlers via event.target
    this.videoApiControls = event.target
    //allow for the video to render first
    setTimeout(() => this.videoApiControls.pauseVideo(), 500);
  }
  onVideoPaused(event: any) {

  }
  onVideoPlayed(event: any) {

  }

  selectVideoHandler = (videoId: string) => {
    this.closeSidebar()
    this.setState({ playing: videoId })
  }

  pauseVideo = () => {
    this.videoApiControls.pauseVideo()
  }
  playVideo = () => {
    this.videoApiControls.playVideo()
  }
  backVideo = () => {
    const current = this.videoApiControls.getCurrentTime()
    this.videoApiControls.seekTo(current - 15)
  }
  fwdVideo = () => {
    const current = this.videoApiControls.getCurrentTime()
    this.videoApiControls.seekTo(current + 15)
  }
  toggleMute = () => {
    const isMuted = this.videoApiControls.isMuted()
    if (isMuted) {
      this.videoApiControls.unMute()
    }
    else {
      this.videoApiControls.mute()
    }
  }

  toggleBio = () => {
    this.closeSidebar()
    this.setState({
      showBio: !this.state.showBio
    })
  }
  toggleContacts = () => {
    this.closeSidebar()
    this.setState({
      showContacts: !this.state.showContacts
    })
  }

  closeSidebar = () => {
    this.setState({
      showSidebar: false
    })
  }

  openSidebar = () => {
    this.setState({
      showSidebar: true
    })
  }

  onBlurHandler = () => {
    this.closeSidebar()
  }


  render() {
   

    //TESTAREA

    // get a string, make it uppercase, select the third letter, make it a number and return it
    // const transform = (str: string) => {
    //   const upperString = str.toUpperCase()
    //   const thirdLetter = upperString.charAt(2)
    //   const number = thirdLetter.charCodeAt(0)
    //   return number
    // }

    const Box = (str: any) => ({
      map: (f: Function) => Box(f(str)),
      // toString: () => `Box(${str})`,
      fold: (f: Function) => f(str)
    })

    const transform2 = (str: string) =>
      Box(str)
        .map((str: string) => str.toUpperCase())
        .map((uStr: string) => uStr.charAt(2))
        .fold((c: string) => c.charCodeAt(0))

    const result = transform2('sticazzi')
    console.log(result)


    //END TESTAREA
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

    const selectVideoHandler = this.selectVideoHandler
    const availabilityBanner = (
      <div className="availability_banner" onClick={this.toggleContacts}>
        <p>2018 - Available for Projects and Commissions</p>
      </div>
    )

    const controls = {
      pause: this.pauseVideo,
      play: this.playVideo,
      fwd: this.fwdVideo,
      back: this.backVideo,
      toggleMute: this.toggleMute
    }

    return (
      <div className="App">
        <ErrorBoundary>
          <Header show={false} selectPlaylistHandler={this.selectPlaylist} videoApiControls={controls} onTitleClick={this.toggleBio} />
          <Sidebar show={showSidebar} playlists={playlistsItems} selectVideoHandler={selectVideoHandler} onBlur={this.onBlurHandler} />
          <Lightbox text={bio} className="bioBox" show={showBio} onClick={this.toggleBio} />
          <Lightbox text={contacts} className="bioBox" show={showContacts} onClick={this.toggleContacts} />
          <div style={{ display: 'flex' }}>
            <YouTube
              videoId={playing}
              opts={opts}
              onReady={this.onVideoReady}
              className={'videoPlayer'}
              onPlay={this.onVideoPlayed}
              onPause={this.onVideoPaused}
            />
            {availabilityBanner}
          </div>
        </ErrorBoundary>

      </div>
    );
  }
}

export default App;


class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log('Component Did Catch', error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}