<script setup lang="ts">
import JoinRoomForm from './components/JoinRoomForm.vue';
</script>

<template>
  <main
    :style="{
      minHeight: '500px',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '0.5rem'
    }"
  >
    <h4 class="text-h4 text-blue">Join Room</h4>
    <JoinRoomForm />
  </main>
</template>
