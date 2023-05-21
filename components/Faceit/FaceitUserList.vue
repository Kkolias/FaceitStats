<template>
  <div class="component-FaceitUserList">
    <ul>
      <li v-for="(user, i) in userList" :key="i">
        <button @click="selectUser(user)" class="blank">
          <div class="user-img-wrapper">
            <img :src="user.avatar" alt="avatar" />
          </div>
          <div class="user-name-wrapper">
            <p>{{ user.nickname }}</p>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    userList: { type: Array, default: () => [] },
  },
  methods: {
    selectUser(user) {
      this.$emit('selectUser', user)
    },
  },
})
</script>

<style lang="less" scoped>
.component-FaceitUserList {
  position: absolute;
  top: 30px;
  left: 0;
  width: 300px;
  ul {
    max-height: 60vh;
    overflow-y: auto;
    list-style: none;
    margin: 0;
    padding: 0;
    background: var(--background-light-2);

    li,
    button {
      cursor: pointer;
      margin: 0;
      display: flex;
      flex-direction: row;
      width: 100%;
      margin-bottom: 12px;

      .user-img-wrapper {
        img {
          width: 50px;
          height: 50px;
        }
      }
      .user-name-wrapper {
        margin-left: 12px;
        font-size: 18px;
        line-height: 50px;

        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
