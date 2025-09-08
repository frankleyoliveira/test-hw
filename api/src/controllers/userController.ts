import { Request, Response } from 'express'
import { decryptData } from '../services/decryptService'
import {
  sendDataToN8N,
  clearUsersInN8N,
  getDataFromN8N,
} from '../services/n8nService'
import axios from 'axios'
import { SecureEndpointResponse } from '../types'

const SECURE_ENDPOINT =
  'https://n8n-apps.nlabshealth.com/webhook/data-5dYbrVSlMVJxfmco'

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await getDataFromN8N()

    res.json({
      success: true,
      users,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error getting users' })
  }
}

export async function executeHandler(req: Request, res: Response) {
  try {
    const response = await axios.get<SecureEndpointResponse>(SECURE_ENDPOINT)

    const { success, data } = response.data

    if (!success) {
      throw new Error('Error on secure endpoint response: success = false')
    }

    const { encrypted, secretKey } = data

    const decrypted = decryptData(encrypted, secretKey)

    const result = await sendDataToN8N(decrypted.users)

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error executing' })
  }
}

export async function clearHandler(req: Request, res: Response) {
  try {
    const result = await clearUsersInN8N()

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error cleaning users table' })
  }
}
