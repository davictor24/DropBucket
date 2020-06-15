import FileStorage from '../data/storage'

const fileStorage = new FileStorage()

export async function getFileUrl(fileId: string): Promise<string> {
    return await fileStorage.getFileUrl(fileId)
}

export function getPresignedUrl(fileId: string): string | null {
    return fileStorage.getPresignedUrl(fileId)
}