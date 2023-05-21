<template>
  <div class="component-FaceitStatsSummary">
    <div class="container">
      <FaceitSearchPlayer @selectUser="selectUser" />
      <FaceitCsgoStats v-if="selectedUserCsgoStats" :stats="selectedUserCsgoStats" />
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
      console.log(r)
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
  },
}
</script>

<style lang="less" scoped>
.component-FaceitStatsSummary {
  max-width: 1200px;
  margin: auto;

  .container {
    display: flex;
  }
}
</style>
