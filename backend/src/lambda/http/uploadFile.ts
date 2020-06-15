import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { UploadFileRequest } from '../../requests/UploadFileRequest'
import { uploadFile } from '../../logic/main/files'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('uploadFile')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newFile: UploadFileRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  logger.info(`Uploading new file ${newFile} for user ${userId}`)
  const newFileItem = await uploadFile(userId, newFile)
  return {
    statusCode: 200,
    body: JSON.stringify({
      item: newFileItem
    })
  }
}).use(
  cors({
    credentials: true
  })
)