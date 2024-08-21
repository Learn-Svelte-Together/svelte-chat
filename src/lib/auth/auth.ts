type Optional<T> = T | null;

export type User = {
  username: string

}

const baseUrl = "https://evidence-if.pockethost.io"

export async function refresh(token: string): Promise<Optional<User>> {
  const url = `${baseUrl}/api/collections/users/auth-with-password`

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    },
  }).then(v => v.json())

  console.log(result)

  return null
}

export async function loginWithPassword(email: string, password: string): Promise<Optional<User>> {

  const url = `${baseUrl}/api/collections/users/auth-with-password`

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      identity: email,
      password
    })
  }).then(v => v.json())

  console.log(result)

  return {
    username: result.record.username,
  }
}
