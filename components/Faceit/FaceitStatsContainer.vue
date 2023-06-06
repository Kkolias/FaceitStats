<template>
  <div class="component-FaceitStatsSummary">
    <div class="container">
      <FaceitSearchPlayer @selectUser="selectUser" />
      <LoadingIcon v-if="loading"/>
      <div>
        <FaceitCsgoStats
          v-if="selectedUserCsgoStats"
          :stats="selectedUserCsgoStats"
          :csgoElo="csgoElo"
        />
        <FaceitCsgoRankedSegments
          v-if="selectedUserCsgoStats"
          :segments="selectedUserCsgoStats.segments"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import faceitApi from '~/utils/faceit-api'
export default {
  name: 'FaceitStatsSummary',
  data: () => ({
    selectedUserId: '',
    selectedUser: null,
    selectedUserCsgoStats: null,
    csgoElo: 0,

    loading: false
  }),
  watch: {
    selectedUserId() {
      this.fetchUserById()
      this.fetchUserCsgoStats()
      this.fetchLastMatches()
    },
  },
  methods: {
    selectUser(user) {
      this.selectedUserId = user.player_id
    },
    async fetchUserById() {
      this.setLoading(true)
      const r = await faceitApi.fetchPlayerById(this.selectedUserId)
      // console.log(r)
      this.setCsgoElo(r)
      this.setSelectedUser(r)
      this.setLoading(false)
    },
    async fetchUserCsgoStats() {
      this.setLoading(true)
      const r = await faceitApi.fetchPlayerCsgoStats(this.selectedUserId)
      // console.log(r)
      this.setSelectedUserCsgoStats(r)
      this.setLoading(false)
    },

    async fetchLastMatches() {
      this.setLoading(true)
      const matches = await faceitApi.fetchMatchHistoryOfPlayerId(
        this.selectedUserId
      )
      const betterInfoMatches = await matches?.items?.map(async m => {

        const matchId = m?.match_id
        const details = await faceitApi.fetchMatchStats(matchId)

        return {
          ...m,
          details
        }
      })
      await Promise.all(betterInfoMatches)
      console.log(betterInfoMatches)
      this.setLoading(false)
    },

    setLoading(value: boolean): void {
      this.loading = value
    },
    setSelectedUser(user) {
      this.selectedUser = user
    },
    setSelectedUserCsgoStats(stats) {
      this.selectedUserCsgoStats = stats
    },
    setCsgoElo(user): void {
      this.csgoElo = user?.games?.csgo?.faceit_elo || 0
    },
  },
}
</script>

<style lang="less" scoped>
.component-FaceitStatsSummary {
  max-width: 1200px;
  margin: auto;

  .container {
    // display: flex;
  }
}
</style>
