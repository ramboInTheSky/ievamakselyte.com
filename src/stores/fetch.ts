export type FetchStatus = 'init' | 'loading' | 'success' | 'error';

const apiKeyP = 'key=AIzaSyCgi8NwGRL29R9IyxZD5ulOyRWVeS10cPs'
const channelIdP = 'channelId=UCYyapFMzeu5_pGeQv1hk2Og'
// const idP = 'id=ievamakselyte-197500'
const url = 'https://www.googleapis.com/youtube/v3/'

export class Fetch {

    static options = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            cache: "no-cache", //force HTTP caching validation
        },
        method: 'GET'

    }

    static playlists(limit?: number) {
        return fetch(`${url}playlists?${apiKeyP}&${channelIdP}&part=snippet&maxResults=${limit && limit < 51? limit : 50}`, this.options).then((data) => data.json())
    }

    static async playlistItems(playlistId: string, limit?: number): Promise<any> {
        const playlistUrl = `${url}playlistItems?${apiKeyP}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=${limit && limit < 51? limit : 50}`
        const data = await fetch(playlistUrl, this.options)
        return data.json()
    }

}