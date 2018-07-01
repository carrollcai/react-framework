import { fetch } from './http/index.js';

const development = 'http://localhost:3618';
const API = (url, method) => params => fetch(development + url, params, method || 'post');

export default {
  getDemo: API('/demo')
}
