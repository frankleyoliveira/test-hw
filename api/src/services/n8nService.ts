// import axios from 'axios'
import { ResultUsers, User } from '../types'

// const N8N_WEBHOOK_URL = 'n8n_url_here'

export async function sendDataToN8N(data: User[]): Promise<ResultUsers> {
  try {
    // TODO implement n8n webhook
    // const response = await axios.post(N8N_WEBHOOK_URL, data, {
    //   headers: { 'Content-Type': 'application/json' },
    // })

    return {
      success: true,
      users: data,
    }
  } catch (error) {
    throw new Error(`Failed to send data to N8N: ${error}`)
  }
}

export async function clearUsersInN8N(): Promise<ResultUsers> {
  // TODO create logic to call TRUNCATE webhook

  return {
    success: true,
    users: [],
  }
}
