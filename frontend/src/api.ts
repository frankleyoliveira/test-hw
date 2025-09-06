const BASE_API_URL = 'https://test-hw-api.vercel.app'

export async function execute() {
  const res = await fetch(`${BASE_API_URL}/api/execute`, {
    method: 'POST',
  })

  if (!res.ok) throw new Error('Failed to execute')

  const data = await res.json()

  return data.users
}

export async function clear() {
  const res = await fetch(`${BASE_API_URL}/api/clear`, {
    method: 'POST',
  })

  if (!res.ok) throw new Error('Failed to clear')

  const data = await res.json()

  return data.users
}
