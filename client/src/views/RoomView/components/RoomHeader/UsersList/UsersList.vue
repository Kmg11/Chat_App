<template>
  <ul
    :style="{
      listStyle: 'none',
      padding: '1.5rem 1rem',
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }"
  >
    <li
      v-for="user in socketState.joinedRoom.users"
      :key="user.id"
      :style="{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }"
    >
      <v-avatar color="info">
        <span>
          {{ user.name[0].toUpperCase() }}
        </span>
      </v-avatar>

      <strong v-html="user.name"></strong>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { socketState } from '@/socket';
</script>
