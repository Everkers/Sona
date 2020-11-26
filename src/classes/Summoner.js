const axios = require("axios")

// riot endpoints
const endpoints = require("../../endpoints.json")

class Summoner {
  constructor(username, region) {
    this.username = username
    this.endpoint = Summoner.findEndPoint(region)
  }

  // getting the endpoint depend on region
  static findEndPoint(region) {
    return endpoints[region.toUpperCase()]
  }

  // Get basic data
  async getBasicData() {
    try {
      const url = `${this.endpoint}/summoner/v4/summoners/by-name/${this.username}?api_key=RGAPI-75d70aee-fb3a-48a9-8c86-ab017343beb8`
      const data = await axios.get(url)
      this.basicData = data.data
    } catch (e) {
      throw "summoner not found"
    }
  }

  // Get league entries in all queues for a given summoner ID.
  async getRank() {
    const url = `${this.endpoint}/league/v4/entries/by-summoner/${this.basicData.id}?api_key=RGAPI-75d70aee-fb3a-48a9-8c86-ab017343beb8`
    const data = await axios.get(url)
    const soloq = data.data[0]
    this.tier = soloq.tier // rank => bronze/silver/gold/...
    this.rank = soloq.rank // division => from I to V
    this.lp = soloq.leaguePoints
  }

  // print the shyt for the test
  //   async mamamia() {
  //     await this.getBasicData()
  //     // await this.getRank()
  //     // console.log(
  //     //   `user: ${this.username} is in ${this.tier} ${this.rank} with ${this.lp}`
  //     // )
  //   }
}

// const f = new Summoner("zainosssssklsjsksklsklsjskl02", "EUW")
// f.mamamia()
