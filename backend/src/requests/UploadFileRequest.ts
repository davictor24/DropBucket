/**
 * Fields in a request to upload a single file.
 */
export interface UploadFileRequest {
  name: string
  sizeBytes: number
  lastModified: number
  fileKey: string
}