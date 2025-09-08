export function formatPhone(phone: string): string {
  if (!phone) return ''

  // Match: (first 3)(next 3)(last 4)
  const match = phone.match(/^(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    return `(${match[1]}) ${match[2]} ${match[3]}`
  }

  return phone
}
