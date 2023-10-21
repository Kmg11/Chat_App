<template>
  <section
    :style="{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      height: '100%',
      padding: '1rem',
      backgroundColor: '#222'
    }"
  >
    <h2
      :style="{
        color: $vuetify.theme.current.colors.info,
        fontSize: '1.2rem',
        fontWeight: 'bold'
      }"
    >
      Users
    </h2>

    <ul
      :style="{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }"
    >
      <li v-for="(user, i) in socketState.joinedRoom.users" :key="user.id">
        {{ i + 1 }}. {{ user.name }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { socketState } from '@/socket';
</script>
