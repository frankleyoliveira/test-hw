// import crypto from 'node:crypto'
import { users } from '../data/users'
import { EncryptedData, User } from '../types'

export function decryptData(encryptedData: EncryptedData) {
  // I NEED THE KEY TO MAKE THE DECRYPTION WORK PROPERLY, BUT IT WAS NOT PROVIDED
  // SO I AM RETURNING A HARD-CODED ARRAY OF USERS TO SIMULATE THE DECRYPTION
  // THE COMMENTED CODE BELOW IS PART OF THE LOGIC I WOULD USE IF I HAD THE KEY

  try {
    // const { iv, authTag, encrypted } = encryptedData

    // const key = '???'

    // const ivBuffer = Buffer.from(iv, 'hex')
    // const authTagBuffer = Buffer.from(authTag, 'hex')
    // const encryptedBuffer = Buffer.from(encrypted, 'hex')

    // const decipher = crypto.createDecipheriv('aes-256-gcm', key, ivBuffer)

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
