<script setup lang="ts">
import { socketState } from '@/socket';
import ChatDisplay from './ChatDisplay/ChatDisplay.vue';
</script>

<template>
  <v-row>
    <v-col cols="10">
      <ChatDisplay />
    </v-col>

    <v-col cols="2">
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
        <p v-for="(user, i) in socketState.joinedRoom.users" :key="user.id">
          {{ i + 1 }}. {{ user.name }}
        </p>
      </section>
    </v-col>
  </v-row>
</template>
