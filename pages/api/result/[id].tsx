import cache from '@/src/utils/helpers/cache'
// import { sample } from '@/src/utils/sample_ai_response'
import { apiResponse, apiStatusCode } from '@/utils/constants/apiResponses'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { id } = req.query
  switch (req.method) {
    case 'GET':
      if (typeof id === 'string' && cache.has(id)) {
        res.status(apiStatusCode.OK).send({
          message: apiResponse.success,
          data: cache.get(id),
          code: apiStatusCode.OK,
        })
        return
      } else {
        res.status(apiStatusCode.NOT_FOUND).send({
          message: apiResponse.not_found,
          code: apiStatusCode.NOT_FOUND,
        })
        return
      }

    default:
      // Request is not recognized
      res.status(apiStatusCode.BAD_REQUEST).send({
        message: apiResponse.invalid_request,
      })
      return
  }
}

export default handler
