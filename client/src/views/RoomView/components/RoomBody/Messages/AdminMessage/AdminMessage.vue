<template>
  <li
    :style="{
      color: '#ddd',
      fontSize: '0.8rem',
      textAlign: 'center'
    }"
  >
    {{ props.message.text }}
  </li>
</template>

<script lang="ts" setup>
import type { MessageType } from '@/types';

interface MessageProps {
  message: MessageType;
}

const props = defineProps<MessageProps>();
</script>
