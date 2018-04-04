export type FetchStatus = 'init' | 'loading' | 'success' | 'error';

const apiKeyP = 'key=AIzaSyCgi8NwGRL29R9IyxZD5ulOyRWVeS10cPs'
const channelIdP = 'channelId=UCYyapFMzeu5_pGeQv1hk2Og'
// const idP = 'id=ievamakselyte-197500'
const url = 'https://www.googleapis.com/youtube/v3/'

export class Fetch {

    static playlists(limit?: number) {
        return fetch(`${url}playlists?${apiKeyP}&${channelIdP}&part=snippet&maxResults=${limit || 10}`).then((data) => data.json())
    }

    static playlistItems(playlistId: string, limit?: number) {
        return fetch(`${url}playlistItems?${apiKeyP}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=${limit || 10}`).then((data) => data.json())
    }

}