import { useState } from 'react'
import { clear, execute } from './api'
import UsersTable from './components/UsersTable'
import type { User } from './types/User'

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleExecute() {
    try {
      setLoading(true)
      setError(null)
      const data = await execute()
      setUsers(data)
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  async function handleClear() {
    try {
      setLoading(true)
      setError(null)
      const data = await clear()
      setUsers(data)
    } catch (err) {
      setError('Failed to clear data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">User Manager</h1>

        <div className="mb-6 flex gap-4">
          <button
            onClick={handleExecute}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 disabled:opacity-50"
          >
            Execute
          </button>
          <button
            onClick={handleClear}
            disabled={loading}
            className="rounded-xl bg-red-600 px-4 py-2 text-white shadow hover:bg-red-700 disabled:opacity-50"
          >
            Clear
          </button>
        </div>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        {loading && <p className="mb-4 text-gray-600">Loading...</p>}

        <UsersTable users={users} />
      </div>
    </div>
  )
}
