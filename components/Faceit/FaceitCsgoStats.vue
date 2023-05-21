<template>
  <div class="component-FaceitCsgoStats">
    <div class="lifetime-stats-container">
      <h3>{{ gameName }}</h3>
      <div class="stats-top">
        <div class="stat-wrapper">
          <p class="bold">Longest Win Streak</p>
          <p>{{ longestWinStreak }}</p>
        </div>
        <div class="stat-wrapper">
          <p class="bold">Matches</p>
          <p>{{ matches }}</p>
        </div>
        <div class="stat-wrapper">
          <p class="bold">Wins</p>
          <p>{{ wins }}</p>
        </div>
        <div class="stat-wrapper">
          <p class="bold">Recent Results</p>
          <p>
            <span
              class="result"
              v-for="(result, i) in recentResults"
              :key="i"
              :class="{ green: isWin(result) }"
            >
              {{ formatResult(result) }}
            </span>
          </p>
        </div>
        <div class="stat-wrapper">
          <p class="bold">K/D Ratio</p>
          <p>{{ kdRatio }}</p>
        </div>
      </div>
      <div class="stats-bottom">
        <div class="stat-wrapper">
          <p class="bold">Average K/D Ratio</p>
          <p>{{ averageKdRatio }}</p>
        </div>
        <div class="stat-wrapper">
          <p class="bold">Average Headshots %</p>
          <p>{{ averageHeadshot }}</p>
        </div>
        <div class="stat-wrapper">
          <p class="bold">Current Win Streak</p>
          <p>{{ currWinStreak }}</p>
        </div>
        <div class="stat-wrapper">
          <p class="bold">Win Rate %</p>
          <p>{{ winRate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    stats: { type: Object, default: () => {} },
  },
  computed: {
    gameName() {
      return this.stats?.game_id || ''
    },
    longestWinStreak() {
      return this.stats?.lifetime?.['Longest Win Streak'] || 0
    },
    matches() {
      return this.stats?.lifetime?.['Matches'] || 0
    },
    wins() {
      return this.stats?.lifetime?.['Wins'] || 0
    },
    recentResults() {
      return this.stats?.lifetime?.['Recent Results'] || []
    },
    kdRatio() {
        return this.stats?.lifetime?.['K/D Ratio'] || 0
    },
    averageKdRatio() {
        return this.stats?.lifetime?.['Average K/D Ratio'] || 0
    },
    averageHeadshot() {
        return this.stats?.lifetime?.['Average Headshots %'] || 0
    },
    currWinStreak() {
        return this.stats?.lifetime?.['Current Win Streak'] || 0
    },
    winRate() {
        return this.stats?.lifetime?.['Win Rate %'] || 0
    },
  },
  methods: {
    isWin(result): boolean {
      return result === '1'
    },
    formatResult(result): string {
      return this.isWin(result) ? 'W' : 'L'
    },
  },
})
</script>

<style lang="less" scoped>
.component-FaceitCsgoStats {
  margin-top: 24px;
  .lifetime-stats-container {
    padding: 24px;
    background: var(--background-light-2);
    display: flex;
    flex-direction: column;
    h3,
    p {
      padding: 0;
      margin: 0;
    }

    .stats-top,
    .stats-bottom {
      display: flex;
      flex-direction: row;
      gap: 12px;

      .stat-wrapper {
        margin: 8px;

        p {
          white-space: nowrap;

          &.bold {
            font-weight: 700;
          }
        }

        .result {
          color: red;
          &.green {
            color: green;
          }
        }
      }
    }
  }
}
</style>
