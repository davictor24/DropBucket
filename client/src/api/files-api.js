import { apiEndpoint } from '../config'
import Axios from 'axios'

export async function getFiles(idToken) {
  console.log('Fetching files')

  const response = await Axios.get(`${apiEndpoint}/files`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Files:', response.data)
  return response.data.items
}

export async function uploadFile(idToken,newFile) {
  const response = await Axios.post(`${apiEndpoint}/files`,  JSON.stringify(newFile), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function deleteFile(idToken, fileId) {
  await Axios.delete(`${apiEndpoint}/files/${fileId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(idToken, fileId) {
  const response = await Axios.post(`${apiEndpoint}/files/${fileId}/upload`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile_(uploadUrl, file) {
  await Axios.put(uploadUrl, file)
}
