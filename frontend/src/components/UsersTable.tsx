import type { User } from '../types/User'

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 md:border-b-0">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b border-gray-200 px-4 py-2 text-left">ID</th>
            <th className="border-b border-gray-200 px-4 py-2 text-left">
              Name
            </th>
            <th className="border-b border-gray-200 px-4 py-2 text-left">
              Email
            </th>
            <th className="border-b border-gray-200 px-4 py-2 text-left">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No users loaded
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id} className="even:bg-gray-50">
                <td className="border-b border-gray-200 px-4 py-2">{u.id}</td>
                <td className="border-b border-gray-200 px-4 py-2">{u.nome}</td>
                <td className="border-b border-gray-200 px-4 py-2">
                  {u.email}
                </td>
                <td className="border-b border-gray-200 px-4 py-2">
                  {u.phone}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
