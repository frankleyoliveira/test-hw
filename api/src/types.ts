export interface User {
  id: number
  nome: string
  email: string
  phone: string
}

export interface EncryptedData {
  iv: string
  authTag: string
  encrypted: string
}

export interface SecureEndpointResponse {
  success: boolean
  data: {
    encrypted: EncryptedData
  }
}

export interface ResultUsers {
  success: boolean
  users: User[]
}
