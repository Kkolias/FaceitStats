<template>
  <div class="component-SearchPlayer">
    <div class="input-wrapper">
      <input v-model="searchTerm" placeholder="Search"/>
      <FaceitUserList :userList="userList" @selectUser="selectUser"/>
    </div>
    <button @click="searchPlayer()">Etsi pelaaja</button>
  </div>
</template>

<script lang="ts">
import faceitApi  from '~/utils/faceit-api';

export default {
  data: () => ({
    searchTerm: '',
    userList: []
  }),
  methods: {
    async searchPlayer() {
      const r = await faceitApi.searchFaceitPlayer(this.searchTerm)
      console.log(r)
      this.setUserList(r)
    },
    setUserList(list) {
      this.userList = list.items
    },
    selectUser(user) {
      this.$emit("selectUser", user)
    }
    
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
  }
}
</style>
