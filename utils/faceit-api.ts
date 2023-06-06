import axios from 'axios'

const API_KEY = 'b15f83a8-ed22-4906-8f1b-eceaf17fab5e'

export class FaceitApi {
  async get({ url }) {
    const r = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + API_KEY,
      },
    })
    return r?.data
  }

  async searchFaceitPlayer(name) {
    return await this.get({
      url: `https://open.faceit.com/data/v4/search/players?nickname=${name}&offset=0&limit=20`,
    })
  }

  async fetchPlayerById(id: string) {
    return await this.get({
      url: `https://open.faceit.com/data/v4/players/${id}`,
    })
  }

  async fetchPlayerCsgoStats(id: string) {
    return await this.get({
      url: `https://open.faceit.com/data/v4/players/${id}/stats/csgo`,
    })
  }

  async fetchMatchHistoryOfPlayerId(id: string, limit: number = 20) {
    return await this.get({
      url: `https://open.faceit.com/data/v4/players/${id}/history?game=csgo&offset=0&limit=${limit}`,
    })
  }

  async fetchMatchStats(matchId: string) {
    return await this.get({
      url: `https://open.faceit.com/data/v4/matches/${matchId}/stats`,
    })
  }
}

export default new FaceitApi()
