import axios from 'axios'
import { User } from '../types'
import {
  N8N_CLEAR_USERS_WEBHOOK_URL,
  N8N_EXECUTE_WEBHOOK_URL,
  N8N_GET_USERS_WEBHOOK_URL,
} from '../config/constants'

export async function getDataFromN8N(): Promise<User[]> {
  const response = await axios.get<User[]>(N8N_GET_USERS_WEBHOOK_URL)

  const users = response.data

  if (Object.keys(users[0]).length === 0) {
    return []
  }

  return users
}

export async function sendDataToN8N(
  data: User[]
): Promise<{ success: boolean }> {
  try {
    await axios.post(N8N_EXECUTE_WEBHOOK_URL, data, {
      headers: { 'Content-Type': 'application/json' },
    })

    return { success: true }
  } catch (error) {
    throw new Error(`Failed to send data to N8N: ${error}`)
  }
}

export async function clearUsersInN8N(): Promise<{ success: boolean }> {
  try {
    await axios.post(N8N_CLEAR_USERS_WEBHOOK_URL)

    return { success: true }
  } catch (error) {
    throw new Error(`Failed to clear data in N8N: ${error}`)
  }
}
