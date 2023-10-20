<script setup lang="ts">
import { socketState, leaveRoom } from '@/socket';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLeaveRoom = () => {
  leaveRoom();
  router.push({ name: 'home' });
};
</script>

<template>
  <header
    :style="{
      width: '100%',
      backgroundColor: $vuetify.theme.current.colors.info,
      padding: '0.5rem 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem'
    }"
  >
    <p>Room: {{ socketState.joinedRoom.name }}</p>
    <p>Users count: {{ socketState.joinedRoom.users.length }}</p>
    <v-btn color="white" :variant="'text'" @click="handleLeaveRoom">Leave</v-btn>
  </header>
</template>
