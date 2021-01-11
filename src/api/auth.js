import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  invalidate: async (cfg, req) => {
    const method = req.method.toLowerCase()
    if (method !== 'get') {
      await cfg.store.removeItem(cfg.uuid)
    }
    if (req.clearCacheEntry) {
      await cfg.store.removeItem(cfg.uuid)
    }
  }
})

export default axios.create({
  adapter: cache.adapter,
  baseURL: 'https://datadruid.herokuapp.com' //'http://localhost:3000' //  
});