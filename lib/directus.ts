import { createDirectus, rest, authentication } from '@directus/sdk';
console.log('---process.env.BACKEND_URL:', process.env.BACKEND_URL);

const DIRECTUS_URL = process.env.BACKEND_URL || "http://122.51.12.238:8055"

const directus = createDirectus(DIRECTUS_URL)
  .with(authentication("cookie", {credentials: "include", autoRefresh: true}))
  .with(rest());

export default directus;