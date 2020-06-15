import * as uuid from 'uuid'
import FilesAccess from "../data/files"
import { FileItem } from "../../models/FileItem"
import { UploadFileRequest } from "../../requests/UploadFileRequest"
// import { getFileUrl } from './storage'

const filesAccess = new FilesAccess()

export async function getFiles(userId: string): Promise<FileItem[]> {
    const result = await filesAccess.getFiles(userId)
    return result
}

export async function uploadFile(userId: string, uploadFileRequest: UploadFileRequest): Promise<FileItem> {
    const fileId = uuid.v4()
    const uploadedAt = new Date().toISOString()
    const fileItem: FileItem = {
        userId,
        fileId,
        uploadedAt,
        ...uploadFileRequest,
        fileUrl: 'dummy-file-url'
    }
    await filesAccess.uploadFile(fileItem)
    return fileItem
}

export async function deleteFile(userId: string, fileId: string): Promise<void> {
    return await filesAccess.deleteFile(userId, fileId)
}

export async function getFileById(userId: string, fileId: string): Promise<AWS.DynamoDB.QueryOutput> {
    return await filesAccess.getFileById(userId, fileId)
}