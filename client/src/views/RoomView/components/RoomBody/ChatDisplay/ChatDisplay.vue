<script setup lang="ts">
import SendMessageForm from './SendMessageForm//SendMessageForm.vue';
import Messages from './Messages/Messages.vue';
</script>

<template>
  <section
    :style="{
      height: '100%',
      minHeight: '500px',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      gap: '1rem'
    }"
  >
    <Messages />
    <SendMessageForm />
  </section>
</template>
