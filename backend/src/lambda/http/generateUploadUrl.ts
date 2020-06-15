import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { getPresignedUrl } from '../../logic/main/storage'
import { getFileById } from '../../logic/main/files'

const logger = createLogger('generateUploadUrl')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const fileId = event.pathParameters.fileId
  const userId = getUserId(event)
  const result = await getFileById(userId, fileId)

  if (result.Count === 0) {
    logger.warn(`User ${userId} requesting presigned URL for non-existing file with ID: ${fileId}`)
    return {
      statusCode: 400,
      body: JSON.stringify(`File does not exist`)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      uploadUrl: getPresignedUrl(fileId)
    })
  }
}).use(
  cors({
    credentials: true
  })
)