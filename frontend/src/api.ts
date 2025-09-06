export async function execute() {
  const res = await fetch('http://localhost:3000/api/execute', {
    method: 'POST',
  })

  if (!res.ok) throw new Error('Failed to execute')

  const data = await res.json()

  return data.users
}

export async function clear() {
  const res = await fetch('http://localhost:3000/api/clear', {
    method: 'POST',
  })

  if (!res.ok) throw new Error('Failed to clear')

  const data = await res.json()

  return data.users
}
