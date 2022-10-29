import { createApp } from "vue";
import App from "./App.vue";

import webSocket from "@/transport/WebSocket";
import { ETransportStatus } from "@/transport/domain";
webSocket.create("https://localhost:3000/ws-api");
webSocket.connect();

// тут ваша логика по нотификациям пользоватя о состоянии приложения
webSocket.subject$.subscribe(async (status: ETransportStatus) => {
  if (status === ETransportStatus.CONNECTED) {
    console.log("[server config]", webSocket.serverConfig);
    console.log("[app loaded]");
  } else {
    console.log("[app not loaded]");
    console.log("[net status]", status);
  }
});

createApp(App).mount("#app");
