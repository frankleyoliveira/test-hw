import { useEffect, useState } from 'react'
import { clear, execute, getUsers } from './api'
import UsersTable from './components/UsersTable'
import type { User } from './types/User'
import Pagination from './components/Pagination'
import Spinner from './components/Spinner'

const PAGE_SIZE = 10

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      setError('Failed to fetch users')
    }
  }

  async function handleExecute() {
    try {
      setLoading(true)
      setError(null)
      await execute()
      await loadUsers()
      setPage(1)
    } catch (err) {
      setError('Failed to execute')
    } finally {
      setLoading(false)
    }
  }

  async function handleClear() {
    try {
      setLoading(true)
      setError(null)
      await clear()
      setUsers([])
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
              className="flex gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                ></path>
              </svg>
              Execute
            </button>
            <button
              onClick={handleClear}
              disabled={loading}
              className="flex gap-2 rounded-xl bg-red-600 px-4 py-2 text-white shadow hover:bg-red-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </svg>
              Clear
            </button>
          </div>
        </div>

        {loading && <Spinner />}

        {error && <p className="mb-4 text-red-600">{error}</p>}

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
