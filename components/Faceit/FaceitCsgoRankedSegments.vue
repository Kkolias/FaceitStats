<template>
  <div class="component-FaceitCsgoRankedSegments">
    <ul>
      <li v-for="(segment, i) in parsedSegmentList" :key="i">
        <div class="img-wrapper">
          <img :src="segment.img_regular" class="segment-img" />
        </div>
        <div class="map-name">
          <h3>{{ mapName(segment) }}</h3>
        </div>
        <div class="stats-wrapper">
          <div class="top">
            <div class="container">
              <p class="header">Win %</p>
              <p>{{ winPercentage(segment) }}</p>
            </div>
            <div class="container">
              <p class="header">Wins</p>
              <p>{{ wins(segment) }}</p>
            </div>
            <div class="container">
              <p class="header">Avg. Kills</p>
              <p>{{ avgKills(segment) }}</p>
            </div>
          </div>
          <div class="bottom">
            <div class="container">
              <p class="header">Avg. K/D</p>
              <p>{{ avgKdRatio(segment) }}</p>
            </div>
            <div class="container">
              <p class="header">Avg. K/R</p>
              <p>{{ avgKrRatio(segment) }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    segments: { type: Array, default: () => [] },
  },
  computed: {
    parsedSegmentList() {
      return (
        this.segments?.filter((s) => s?.type === 'Map' && s?.mode === '5v5') ||
        []
      )
    },
  },
  methods: {
    winPercentage(segment) {
      const r = segment?.stats?.['Win Rate %'] || 0
      return `${r} %`
    },
    wins(segment) {
      return segment?.stats?.['Wins'] || '0'
    },
    avgKills(segment) {
      return segment?.stats?.['Average Kills'] || '0'
    },
    avgKdRatio(segment) {
      return segment?.stats?.['Average K/D Ratio'] || '0'
    },
    avgKrRatio(segment) {
      return segment?.stats?.['Average K/R Ratio'] || '0'
    },
    mapName(segment) {
      return segment?.label || ''
    }
  },
})
</script>

<style lang="less" scoped>
.component-FaceitCsgoRankedSegments {
  margin-top: 24px;
  ul {
    margin: auto;
    list-style: none;
    margin: 0;
    padding: 0;
    display: inline-block;
    // width: 100%;

    li {
      display: inline-block;
      margin: 0;
      padding: 0;
      width: 200px;
      background: var(--background-light-2);
      margin: 12px;
      font-size: 14px;

      .map-name {
        h3 {
          margin: 0;
          padding: 0;
          margin: 4px 0;
          font-size: 18px;
          text-align: center;
        }
      }

      .img-wrapper {
        width: 200px;
        height: 125px;
      }

      .stats-wrapper {
        display: flex;
        flex-direction: column;

        .top,
        .bottom {
          margin-top: 8px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          .container {
            p {
              text-align: center;
              margin: 0;

              &.header {
                font-weight: 700;
                color: var(--orange-1);
              }
            }
          }
        }
      }
    }
  }
}
</style>
