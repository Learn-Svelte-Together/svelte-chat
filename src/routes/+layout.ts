import { authStore } from "$lib/auth/auth.svelte"


export function load({ params }) {
  return {
    authStore
  };
}


