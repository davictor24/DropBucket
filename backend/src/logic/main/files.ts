import FilesAccess from "../data/files"
import { FileItem } from "../../models/FileItem"

const filesAccess = new FilesAccess()

export async function getFiles(userId: string): Promise<FileItem[]> {
  const result = await filesAccess.getFiles(userId)
  return result
}

export async function getFileByIdQuery(userId: string, fileKey: string): Promise<AWS.DynamoDB.QueryOutput> {
  return await filesAccess.getFileByIdQuery(userId, fileKey)
}

// TODO: Delete?
export async function getFileById(userId: string, fileKey: string): Promise<FileItem[]> {
  return await filesAccess.getFileById(userId, fileKey)
}

export async function uploadFile(fileItem: FileItem): Promise<void> {
  return await filesAccess.uploadFile(fileItem)
}

export async function deleteFile(userId: string, fileKey: string): Promise<void> {
  return await filesAccess.deleteFile(userId, fileKey)
}