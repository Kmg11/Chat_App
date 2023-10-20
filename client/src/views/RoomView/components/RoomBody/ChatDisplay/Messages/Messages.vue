<template>
  <ul
    :style="{
      listStyleType: 'none',
      width: '100%',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'left',
      gap: '1rem',
      overflow: 'auto'
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
import { socketState } from '@/socket';
import AdminMessage from './AdminMessage/AdminMessage.vue';
import UserMessage from './UserMessage/UserMessage.vue';
</script>
