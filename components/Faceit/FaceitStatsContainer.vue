<template>
  <div class="component-FaceitStatsSummary">
    <div class="container">
      <FaceitSearchPlayer @selectUser="selectUser" />

      <div>
        <FaceitCsgoStats v-if="selectedUserCsgoStats" :stats="selectedUserCsgoStats" :csgoElo="csgoElo"/>
        <FaceitCsgoRankedSegments v-if="selectedUserCsgoStats" :segments="selectedUserCsgoStats.segments"/>
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
    csgoElo: 0
  }),
  watch: {
    selectedUserId() {
      this.fetchUserById()
      this.fetchUserCsgoStats()
    },
  },
  methods: {
    selectUser(user) {
      this.selectedUserId = user.player_id
    },
    async fetchUserById() {
      const r = await faceitApi.fetchPlayerById(this.selectedUserId)
      // console.log(r)
      this.setCsgoElo(r)
      this.setSelectedUser(r)
    },
    async fetchUserCsgoStats() {
      const r = await faceitApi.fetchPlayerCsgoStats(this.selectedUserId)
      console.log(r)
      this.setSelectedUserCsgoStats(r)
    },
    setSelectedUser(user) {
      this.selectedUser = user
    },
    setSelectedUserCsgoStats(stats) {
      this.selectedUserCsgoStats = stats
    },
    setCsgoElo(user): void {
      this.csgoElo = user?.games?.csgo?.faceit_elo || 0
    }
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
