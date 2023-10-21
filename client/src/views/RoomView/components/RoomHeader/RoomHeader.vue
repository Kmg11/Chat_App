<script setup lang="ts">
import { socketState, leaveRoom } from '@/socket';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UsersList from './UsersList/UsersList.vue';

const usersListDrawer = ref(false);
const openUsersListDrawer = () => (usersListDrawer.value = true);

const router = useRouter();

const handleLeaveRoom = () => {
  leaveRoom();
  router.push({ name: 'home' });
};
</script>

<template>
  <header
    :style="{
      width: '100%',
      backgroundColor: $vuetify.theme.current.colors.info,
      padding: '0.5rem 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem'
    }"
  >
    <v-btn
      color="white"
      :variant="'text'"
      :style="{ padding: 0, minWidth: 'auto' }"
      @click.stop="openUsersListDrawer"
    >
      <v-icon>mdi-account-multiple</v-icon>
      {{ socketState.joinedRoom.users.length }}
    </v-btn>

    <p>Room: {{ socketState.joinedRoom.name }}</p>

    <v-btn
      color="white"
      :variant="'text'"
      @click="handleLeaveRoom"
      :style="{ padding: 0, minWidth: 'auto' }"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </header>

  <v-layout>
    <v-navigation-drawer v-model="usersListDrawer" temporary>
      <UsersList />
    </v-navigation-drawer>
  </v-layout>
</template>
