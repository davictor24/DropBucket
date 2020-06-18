/**
 * Fields in a request to upload a single file.
 */
export interface UploadFileRequest {
  fileKey: string
  sizeBytes: number
  lastModified: number
}