import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { getDownloadUrl } from '../../logic/main/storage'
import { getFileByIdQuery } from '../../logic/main/files'

const logger = createLogger('generateDownloadUrl')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const fileKeyEncoded = event.pathParameters.fileKeyEncoded
  const fileKey = userId + "/" + decodeURIComponent(fileKeyEncoded)
  const result = await getFileByIdQuery(userId, fileKey)

  if (result.Count === 0) {
    logger.warn(`User ${userId} requesting download URL for non-existing file ${fileKey}`)
    return {
      statusCode: 400,
      body: JSON.stringify(`File does not exist`)
    }
  }

  logger.info(`User ${userId} generating download URL for file ${fileKey}`)
  const downloadUrl = await getDownloadUrl(fileKey)
  return {
    statusCode: 200,
    body: JSON.stringify({
      downloadUrl
    })
  }
}).use(
  cors({
    credentials: true
  })
)