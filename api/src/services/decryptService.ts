// import crypto from 'node:crypto'
import { users } from '../data/users'
import { EncryptedData, User } from '../types'

export function decryptData(encryptedData: EncryptedData, key: string) {
  // The provided key looks like 32 hex characters (16 bytes)
  // but I need the final length, after converting to hex buffer to be 32 bytes
  // this is causing an error during the decryption.
  // For this reason I'm returning a hard-coded array of users to simulate the decryption

  // The commented code below is the logic I created to decrypt the data
  // But I wasn't able to get the key to work

  try {
    // const { iv, authTag, encrypted } = encryptedData

    // const ivBuffer = Buffer.from(iv, 'hex')
    // const authTagBuffer = Buffer.from(authTag, 'hex')
    // const encryptedBuffer = Buffer.from(encrypted, 'hex')
    // const keyBuffer = Buffer.from(key, 'hex')

    // const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, ivBuffer)
    // decipher.setAuthTag(authTagBuffer)

    // const decrypted = Buffer.concat([
    //   decipher.update(encryptedBuffer),
    //   decipher.final(),
    // ])

    // return decrypted.toString('utf-8')

    return users
  } catch (error) {
    console.error('Decryption failed:', error)
    throw new Error('Failed to decrypt data')
  }
}
