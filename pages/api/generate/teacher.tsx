import cache from '@/src/utils/helpers/cache'
import { env } from '@/src/utils/helpers/env'
import { apiResponse, apiStatusCode } from '@/utils/constants/apiResponses'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const generateHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  switch (req.method) {
    case 'POST':
      const requestData = req.body
      console.info('requestData: ', requestData)

      if (requestData.grade == undefined || requestData.subject == undefined || requestData.topic == undefined) {
        // validate the data before continuing
        res.status(apiStatusCode.BAD_REQUEST).send({
          message: apiResponse.invalid_request,
        })
      }
      const requestPromptTeacher = env('AI_PROMPT_TEACHER')
        .replace('{{grade}}', requestData.grade)
        .replace('{{subject}}', requestData.subject)
        .replace('{{specific}}', requestData.topic)
      const requestHeaders = {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${env('AI_CLIENT_KEY')}`,
      }

      // TODO: make a preliminary call to validate if the combination of the grade/ subject and specific are appropriate

      await axios
        .post(
          env('AI_URL'),
          JSON.stringify({
            model: env('AI_MODEL'),
            messages: [
              {
                role: 'user',
                content: requestPromptTeacher,
              },
            ],
          }),
          { headers: requestHeaders }
        )
        .then((response) => {
          const lessonContent = JSON.parse(response.data.choices[0].message.content)
          lessonContent['grade'] = requestData.grade
          lessonContent['subject'] = requestData.subject
          lessonContent['topic'] = requestData.topic
          console.info('lessonContent: ', JSON.stringify(lessonContent))
          cache.set(requestData.requestId, JSON.stringify(lessonContent))
          res.status(apiStatusCode.OK).send({
            message: apiResponse.success,
          })
          return
        })
        .catch((err) => {
          console.error('Post error:')
          console.error(err)
          res.status(apiStatusCode.INTERNAL_SERVER_ERROR).send({
            message: apiResponse.invalid_request,
          })
          // TODO: TBD
          return
        })
      break

    default:
      // Request is not recognized
      res.status(apiStatusCode.BAD_REQUEST).send({
        message: apiResponse.invalid_request,
      })
  }
}

export default generateHandler
