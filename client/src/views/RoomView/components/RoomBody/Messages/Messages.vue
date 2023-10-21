<template>
  <ul
    ref="messagesListRef"
    :style="{
      flexGrow: 1,
      listStyleType: 'none',
      width: '100%',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'left',
      gap: '1rem',
      overflow: 'auto',
      padding: '0 0.7rem'
    }"
  >
    <template v-for="(message, i) in socketState.joinedRoom.messages" :key="i">
      <template v-if="message.type === 'admin'">
        <AdminMessage :message="message" />
      </template>

      <template v-else-if="message.type === 'user'">
        <UserMessage :message="message" />
      </template>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';
import { socketState } from '@/socket';
import AdminMessage from './AdminMessage/AdminMessage.vue';
import UserMessage from './UserMessage/UserMessage.vue';

const messagesListRef = ref<HTMLUListElement | null>(null);

watch(socketState, async () => {
  await nextTick(() => {
    messagesListRef.value.scrollTop = messagesListRef.value.scrollHeight;
  });
});
</script>
