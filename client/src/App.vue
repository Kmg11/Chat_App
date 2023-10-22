<script setup lang="ts">
import { RouterView } from 'vue-router';
import { socketState } from '@/socket';
</script>

<template>
  <div>
    <div
      v-if="!socketState.connected"
      :style="{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }"
    >
      <template v-if="socketState.connectionLoading">
        <v-progress-circular
          :size="40"
          :color="'blue'"
          indeterminate
        ></v-progress-circular>

        <p :style="{ fontSize: '0.875rem' }">Connecting to server</p>
      </template>

      <div v-if="socketState.connectionError">
        <v-alert type="error" :style="{ maxWidth: '400px' }" color="red">
          {{ socketState.connectionError }}
        </v-alert>
      </div>
    </div>

    <template v-if="socketState.connected">
      <RouterView />
    </template>
  </div>
</template>
