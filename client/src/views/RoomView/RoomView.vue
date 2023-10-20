<script setup lang="ts">
import { onMounted } from 'vue';
import { enterRoom } from '@/socket';
import { useRoute } from 'vue-router';
import RoomHeader from './components/RoomHeader.vue';
import RoomBody from './components/RoomBody.vue';

const route = useRoute();
const params = route.params as { userName: string; roomName: string };

onMounted(() => {
  if (params.userName && params.roomName) {
    enterRoom({ name: params.userName, room: params.roomName });
  }
});
</script>

<template>
  <main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <RoomHeader />
        </v-col>

        <v-col cols="12">
          <RoomBody />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
