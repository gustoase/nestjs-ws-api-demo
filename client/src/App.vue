<script setup lang="ts">
import webSocket from "@/transport/WebSocket";
import { ref } from "vue";
import type { Ref } from "vue"
import type { CreateUserDto, ResultDto, UserDto } from "../api/Api";
import type { TResponse } from "@/transport/domain";
import { useApi } from "@/composibles/api";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


const error = ref('');
const user: Ref<TResponse<UserDto> | UserDto | null> = ref(null);
const createUserData: Ref<CreateUserDto> = ref({
  id: 0,
  firstName: '',
  email: '',
});
const resultCreate: Ref<TResponse<ResultDto> | null> = ref(null);

async function fetchUser() {
  const t0 = performance.now();
  user.value = await webSocket.emit('app:getUser', getRandomInt(9999));
  const t1 = performance.now();
  console.log(`WS api ${t1 - t0} ms.`);
}

async function fetchUserHttp() {
  const t0 = performance.now();
  user.value = await useApi().appControllerGetUser(getRandomInt(9999)).then(response => response.data);
  const t1 = performance.now();
  console.log(`HTTP api ${t1 - t0} ms.`);
}

async function createUser() {
  try {
    resultCreate.value = await webSocket.emit<ResultDto>('business:createUser', createUserData.value);
    error.value = '';
  } catch (e: any) {
    error.value = e
    resultCreate.value = null;
  }
}

</script>

<template>
  <button @click="fetchUser">Get data with WS</button>
  <button @click="fetchUserHttp">Get data with HTTP</button>
  {{ user }}
  <hr>
  <form @submit.prevent>
    <label for="id">ID:</label><br>
    <input type="text" id="id" v-model="createUserData.id"><br>
    <label for="fname">First name:</label><br>
    <input type="text" id="fname"  v-model="createUserData.firstName"><br>
    <label for="email">email name:</label><br>
    <input type="text" id="email"  v-model="createUserData.email"><br><br>
    <button @click="createUser">Submit</button>
  </form>
  <hr>
  <h4 v-if="resultCreate" style="color: green">User Created: {{ resultCreate }}</h4>
  <pre v-if="error" style="color: red">
    {{ error }}
  </pre>
</template>
