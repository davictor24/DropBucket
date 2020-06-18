import FilesAccess from "../data/files"
import { FileItem } from "../../models/FileItem"
import { UploadFileRequest } from "../../requests/UploadFileRequest"
// import { getFileUrl } from './storage'

const filesAccess = new FilesAccess()

export async function getFiles(userId: string): Promise<FileItem[]> {
  const result = await filesAccess.getFiles(userId)
  return result
}

export async function getFileByIdQuery(userId: string, fileKey: string): Promise<AWS.DynamoDB.QueryOutput> {
  return await filesAccess.getFileByIdQuery(userId, fileKey)
}

export async function getFileById(userId: string, fileKey: string): Promise<FileItem[]> {
  return await filesAccess.getFileById(userId, fileKey)
}

export async function uploadFile(userId: string, uploadFileRequest: UploadFileRequest): Promise<FileItem> {
  const fileItem: FileItem = {
    userId,
    ...uploadFileRequest
  }
  await filesAccess.uploadFile(fileItem)
  return fileItem
}

export async function deleteFile(userId: string, fileKey: string): Promise<void> {
  return await filesAccess.deleteFile(userId, fileKey)
}