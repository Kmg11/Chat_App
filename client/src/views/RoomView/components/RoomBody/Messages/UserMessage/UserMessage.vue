<template>
  <li :class="`message message--${isUser ? 'right' : 'left'}`">
    <div class="message__header" v-if="!isUser">
      <span class="message__header--name">{{ props.message.user.name }}</span>
      <span class="message__header--time">{{ props.message.time }}</span>
    </div>

    <div :class="`message__text message__text--${isUser ? 'user' : 'reply'}`">
      {{ props.message.text }}
    </div>
  </li>
</template>

<script lang="ts" setup>
import { socketState } from '@/socket';
import type { MessageType } from '@/types';
import { computed } from 'vue';

interface MessageProps {
  message: MessageType;
}

const props = defineProps<MessageProps>();

const isUser = computed(() => {
  return props.message.user.id === socketState.joinedRoom.currentUser.id;
});
</script>

<style scoped>
.message {
  max-width: 60%;
  width: fit-content;
}

.message--left {
  align-self: flex-start;
}

.message--right {
  align-self: flex-end;
}

.message__header {
  color: #ddd;
  padding: 0.25rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.message__header--name {
  font-weight: bold;
  font-size: 0.8rem;
}

.message__header--time {
  font-size: 0.7rem;
}

.message__text {
  margin-top: 5px;
  color: #fff;
  padding: 0.5rem 0.5rem;
  background-color: #eee;
  border-radius: 10px;
  word-break: break-word;
}

.message__text--user {
  background-color: #007bff;
}

.message__text--reply {
  background-color: #6f42c1;
}
</style>
