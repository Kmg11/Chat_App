<template>
  <v-form
    v-model="valid"
    @submit.prevent="handleSendMessage"
    :style="{ display: 'flex', gap: '0.5rem' }"
  >
    <v-text-field
      ref="messageInput"
      v-model="message"
      :rules="messageRules"
      variant="solo-filled"
      density="compact"
      placeholder="Type a message..."
      required
      hide-details
      @keypress="sendActivity"
    ></v-text-field>

    <v-btn type="submit" color="blue" size="small" :style="{ height: '100%' }">
      <v-icon>mdi-send</v-icon>
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { sendMessage, sendActivity } from '@/socket';

const valid = ref(false);
const message = ref('');
const messageInput = ref(null);

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

onMounted(() => {
  messageInput.value.focus();
});
</script>
