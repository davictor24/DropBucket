import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult, } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { deleteFile, getFileById } from '../../logic/main/files'
import { getUserId } from '../utils'

const logger = createLogger('deleteFile')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const fileId = event.pathParameters.fileId
  const userId = getUserId(event)
  const result = await getFileById(userId, fileId)

  if (result.Count === 0) {
    logger.warn(`User ${userId} requesting DELETE for non-existing file with ID: ${fileId}`)
    return {
      statusCode: 400,
      body: JSON.stringify(`File does not exist`)
    }
  }

  logger.info(`Deleting file ${fileId} for user ${userId}`)
  await deleteFile(userId, fileId)
  return {
    statusCode: 200,
    body: ''
  }
}).use(
  cors({
    credentials: true
  })
)