<template>
  <v-form v-model="valid" @submit.prevent="handleJoinRoom" :style="{ width: '100%' }">
    <v-container
      :style="{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }"
    >
      <v-text-field
        v-model="userName"
        :rules="userNameRules"
        label="Username"
        required
        hide-details
      ></v-text-field>

      <v-combobox
        v-model="roomName"
        label="Room name"
        :items="socketState.rooms"
        required
        hide-details
        :rules="roomNameRules"
      ></v-combobox>

      <v-btn type="submit" color="blue" size="large" :disabled="!valid" :style="{ width: '100%' }">
        Join room
      </v-btn>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { socketState, enterRoom } from '@/socket';

const valid = ref(false);
const userName = ref('');
const roomName = ref('');

const userNameRules = [
  (value: string) => {
    if (value) return true;
    return 'Username is required.';
  }
];

const roomNameRules = [
  (value: string) => {
    if (value) return true;
    return 'Room name is required.';
  }
];

const handleJoinRoom = () => {
  enterRoom({ name: userName.value, room: roomName.value });
};
</script>
