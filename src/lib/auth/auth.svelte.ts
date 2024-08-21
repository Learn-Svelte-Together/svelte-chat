import type { User } from "./auth"
import { loginWithPassword } from "./auth"


let loggedInUser: User | null = $state(null)

$inspect(loggedInUser)

export const authStore = {
  async login(email: string, password: string) {
    const user = await loginWithPassword(email, password)
    loggedInUser = user;
  },
  isLoggedIn() {
    return loggedInUser != null
  },
  get currentUser() {
    return loggedInUser
  }
}
