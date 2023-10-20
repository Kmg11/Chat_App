import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi' },
  theme: { defaultTheme: 'dark' }
});
const app = createApp(App);

app.use(router);
app.use(vuetify);
app.mount('#app');
