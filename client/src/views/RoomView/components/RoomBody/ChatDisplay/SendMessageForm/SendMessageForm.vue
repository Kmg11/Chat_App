<template>
  <v-form
    v-model="valid"
    @submit.prevent="handleSendMessage"
    :style="{ width: '100%', display: 'flex', gap: '0.5rem' }"
  >
    <v-text-field
      v-model="message"
      :rules="messageRules"
      variant="solo-filled"
      density="compact"
      placeholder="Type a message..."
      required
      hide-details
    ></v-text-field>

    <v-btn type="submit" color="blue" size="small" :style="{ height: '100%' }">
      <v-icon>mdi-send</v-icon>
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { sendMessage } from '@/socket';

const valid = ref(false);
const message = ref('');

const messageRules = [
  (value: string) => {
    if (value) return true;
    return 'Message is required.';
  }
];

const handleSendMessage = () => {
  if (valid.value) {
    sendMessage({ text: message.value });
    message.value = '';
  }
};
</script>
