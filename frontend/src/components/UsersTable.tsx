import type { User } from '../types/User'

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-50">
          <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
          <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
          <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
          <th className="border border-gray-200 px-4 py-2 text-left">Phone</th>
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
              <td className="border border-gray-200 px-4 py-2">{u.email}</td>
              <td className="border border-gray-200 px-4 py-2">{u.phone}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
