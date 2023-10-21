<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { enterRoom, leaveRoom } from '@/socket';
import { useRoute } from 'vue-router';
import RoomHeader from './components/RoomHeader/RoomHeader.vue';
import RoomBody from './components/RoomBody/RoomBody.vue';

const route = useRoute();
const params = route.params as { userName: string; roomName: string };

onMounted(() => {
  if (params.userName && params.roomName) {
    enterRoom({ name: params.userName, room: params.roomName });
  }
});

onUnmounted(() => {
  leaveRoom();
});
</script>

<template>
  <main
    :style="{
      height: '100vh',
      minHeight: '500px',
      maxWidth: '700px',
      margin: 'auto',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.7rem'
    }"
  >
    <RoomHeader />
    <RoomBody />
  </main>
</template>
