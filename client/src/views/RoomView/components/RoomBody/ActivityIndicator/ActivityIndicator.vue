<template>
  <div
    v-if="!!socketState.joinedRoom.activity"
    :style="{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.8rem',
      color: '#eee',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem'
    }"
  >
    <v-icon>mdi-message-processing-outline</v-icon>

    <p>{{ socketState.joinedRoom.activity.user.name }} is typing...</p>
  </div>
</template>

<script setup lang="ts">
import { socketState } from '@/socket';
</script>
