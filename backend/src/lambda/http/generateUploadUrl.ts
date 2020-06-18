import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { getUploadUrl } from '../../logic/main/storage'
import { UploadFileRequest } from '../../requests/UploadFileRequest'

const logger = createLogger('generateUploadUrl')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const request: UploadFileRequest = JSON.parse(event.body)
  const fileKeyEncoded = request.fileKeyEncoded
  const fileKey = userId + "/" + decodeURIComponent(fileKeyEncoded)

  logger.info(`User ${userId} generating upload URL for file ${fileKey}`)
  return {
    statusCode: 200,
    body: JSON.stringify({
      uploadUrl: getUploadUrl(fileKey)
    })
  }
}).use(
  cors({
    credentials: true
  })
)