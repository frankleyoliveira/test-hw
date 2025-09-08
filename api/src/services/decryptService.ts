import crypto from 'node:crypto'
import { EncryptedData, User } from '../types'

export function decryptData(encryptedData: EncryptedData, key: string): User[] {
  try {
    const { iv, authTag, encrypted } = encryptedData

    const ivBuffer = Buffer.from(iv, 'hex')
    const authTagBuffer = Buffer.from(authTag, 'hex')
    const encryptedBuffer = Buffer.from(encrypted, 'hex')
    const keyBuffer = Buffer.from(key, 'hex')

    const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, ivBuffer)
    decipher.setAuthTag(authTagBuffer)

    const decrypted = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ])

    const parsedData = JSON.parse(decrypted.toString('utf-8'))

    return parsedData.map((user) => ({
      id: user.id,
      nome: user.nome,
      email: user.email,
      phone: user.telefone,
    }))
  } catch (error) {
    console.error('Decryption failed:', error)
    throw new Error('Failed to decrypt data')
  }
}
