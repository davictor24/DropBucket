import FileStorage from '../data/storage'

const fileStorage = new FileStorage()

export async function getDownloadUrl(fileKey: string): Promise<string | null> {
  return await fileStorage.getDownloadUrl(fileKey)
}

export function getUploadUrl(fileKey: string): string {
  return fileStorage.getUploadUrl(fileKey)
}

export async function deleteFromBucket(fileKey: string): Promise<void> {
  await fileStorage.deleteFromBucket(fileKey)
}