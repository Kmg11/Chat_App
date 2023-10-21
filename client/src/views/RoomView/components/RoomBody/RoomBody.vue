<script setup lang="ts">
import ChatDisplay from './ChatDisplay/ChatDisplay.vue';
import UsersList from './UsersList/UsersList.vue';
</script>

<template>
  <v-row>
    <v-col cols="9">
      <ChatDisplay />
    </v-col>

    <v-col cols="3">
      <UsersList />
    </v-col>
  </v-row>
</template>
