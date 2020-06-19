import { apiEndpoint } from '../config'
import Moment from 'moment'

export async function loadFiles(token) {
  const data = await fetch(`${apiEndpoint}/files`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(r => r.json())

  let files = []
  for (let file of data.items) {
    files.push({
      key: file.fileKeyUser,
      modified: Moment().subtract(new Date() - file.lastModified),
      size: file.sizeBytes
    })
  }
  return files;
}

export async function uploadFile(token, element) {
  let fileKeyUser = element.value.split('\\').pop().split('/').pop()
  let fileKeyEncoded = encodeURIComponent(fileKeyUser)
  let payload = {fileKeyEncoded}
  let file = element.files[0]
  let mimeType = file.type

  const { uploadUrl } = await fetch(`${apiEndpoint}/files/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  }).then(r => r.json())
  console.log(uploadUrl)

  await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': mimeType,
    },
    body: file
  })
}

export async function downloadFile(token, fileKeyUser) {
  
}

export async function deleteFile(token, fileKeyUser) {
  
}