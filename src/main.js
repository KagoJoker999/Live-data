import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { 
  Tabbar, 
  TabbarItem,
  NavBar,
  Card,
  Cell,
  CellGroup,
  Tag,
  Icon,
  Loading,
  Empty
} from 'vant'
import 'vant/lib/index.css'
import './assets/main.css'

const app = createApp(App)

// 注册Vant组件
;[
  Tabbar, 
  TabbarItem,
  NavBar,
  Card,
  Cell,
  CellGroup,
  Tag,
  Icon,
  Loading,
  Empty
].forEach(component => app.use(component))

app.use(router)
app.mount('#app') 