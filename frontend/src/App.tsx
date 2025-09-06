import { useState } from 'react'
import { clear, execute } from './api'

interface User {
  id: number
  nome: string
  email: string
  phone: string
}

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

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No users loaded
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td className="border border-gray-200 px-4 py-2">{u.id}</td>
                  <td className="border border-gray-200 px-4 py-2">{u.nome}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {u.email}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {u.phone}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
