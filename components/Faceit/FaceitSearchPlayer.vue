<template>
  <div class="component-SearchPlayer">
    <div class="input-wrapper">
      <input :class="{ open : loading || showUserList}" v-model="searchTerm" placeholder="Search" />
      <FaceitUserList
        class="user-list"
        v-if="showUserList"
        :userList="userList"
        @selectUser="selectUser"
      />
      <div v-if="loading" class="loading-wrapper">
        <LoadingIcon/>
      </div>
    </div>
    <button @click="searchPlayer()">Etsi pelaaja</button>
  </div>
</template>

<script lang="ts">
import faceitApi from '~/utils/faceit-api'

export default {
  data: () => ({
    searchTerm: '',
    userList: [],

    showUserList: false,

    loading: false
  }),
  methods: {
    test() {
      console.log('halo')
    },
    async searchPlayer() {
      this.setLoading(true)
      const r = await faceitApi.searchFaceitPlayer(this.searchTerm)
      // console.log(r)
      this.setUserList(r)
    },
    setUserList(list) {
      this.userList = list.items
      this.setShowUserList(true)
    },
    setShowUserList(value: boolean) {
      if(!!value) this.setLoading(false)
      this.showUserList = value
    },
    setLoading(value: boolean): void {
      this.loading = value
    },
    selectUser(user) {
      this.$emit('selectUser', user)
      this.setShowUserList(false)
    },
  },
}
</script>

<style lang="less" scoped>
.component-SearchPlayer {
  margin: 20px;
  display: flex;
  flex-direction: row;
  gap: 12px;

  input {
    width: 300px;

    &.open {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }

  

  .input-wrapper {
    position: relative;
  }

  .loading-wrapper {
    background: var(--background-light-2);
    padding: 10px 0;
    border-radius: 0 0 5px 5px;
  }
}
</style>
