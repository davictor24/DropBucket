import 'source-map-support/register'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { getFiles } from '../../logic/main/files'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getFiles')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  logger.info(`Retrieving files for user ${userId}`)
  const files = await getFiles(userId)
  return {
    statusCode: 200,
    body: JSON.stringify({
      items: files
    })
  }
}).use(
  cors({
    credentials: true
  })
)