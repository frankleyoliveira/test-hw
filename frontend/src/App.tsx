import { useState } from 'react'
import { clear, execute } from './api'
import UsersTable from './components/UsersTable'
import type { User } from './types/User'
import Pagination from './components/Pagination'

const PAGE_SIZE = 10

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleExecute() {
    try {
      setLoading(true)
      setError(null)
      const data = await execute()
      setUsers(data)
      setPage(1)
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
      setPage(1)
    } catch (err) {
      setError('Failed to clear data')
    } finally {
      setLoading(false)
    }
  }

  const start = (page - 1) * PAGE_SIZE
  const paginated = users.slice(start, start + PAGE_SIZE)

  return (
    <div className="min-h-screen md:bg-gray-100 md:p-6">
      <div className="mx-auto max-w-5xl md:rounded-2xl bg-white p-6 md:shadow">
        <div className="flex max-sm:flex-col gap-4 justify-center sm:justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Test H&W</h1>

          <div className="flex gap-4">
            <button
              onClick={handleExecute}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Execute
            </button>
            <button
              onClick={handleClear}
              disabled={loading}
              className="rounded-xl bg-red-600 px-4 py-2 text-white shadow hover:bg-red-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </div>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        {loading && <p className="mb-4 text-gray-600">Loading...</p>}

        <UsersTable users={paginated} />

        {users.length > PAGE_SIZE && (
          <Pagination
            page={page}
            total={users.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  )
}
