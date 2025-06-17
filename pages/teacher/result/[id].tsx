import BaseLayout from '@/src/components/BaseLayout'
import ExportToPDF from '@/src/components/ExportToPDF'
import { pollForCacheValue } from '@/src/utils/helpers/cachePoll'
import { LessonOutputData } from '@/src/utils/types/lessonOutputData'
import { useRouter } from 'next/router'
import { Card } from 'primereact/card'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useEffect, useState } from 'react'

export default function ResultById() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [lesson, setLesson] = useState<LessonOutputData | undefined>()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      pollForCacheValue(id as string)
        .then((value: any) => {
          setLoading(false)
          setLesson(value)
        })
        .catch(() => {
          router.push(`/404`)
        })
    }
  }, [id])

  const getLesson = () => {
    if (lesson) {
      return (
        <BaseLayout>
          <Card className="min-vh-100">
            <ExportToPDF />

            <div className="mx-5">
              <div className="mb-5">
                <h2>{`Grade ${lesson.grade} ${lesson.subject} Lesson on ${lesson.topic}`}</h2>
                {lesson.lesson.map((lessonItem, lessonIndex) => {
                  return (
                    <div key={`lessonItem-${lessonIndex}`} className="keep-together">
                      <h4 key={lessonIndex}>{lessonItem.slide}</h4>
                      {lessonItem.content.map((c, i) => {
                        return <p key={i}>{c}</p>
                      })}
                    </div>
                  )
                })}
              </div>
              <div className="page-break mb-5">
                <h2>Practice Exercises:</h2>
                {lesson.exercises.map((exerciseItem, exerciseIndex) => {
                  return (
                    <div key={`exerciseItem-${exerciseIndex}`} className="keep-together">
                      <h4 key={exerciseIndex}>{`${exerciseIndex + 1}) ${exerciseItem.question}`}</h4>
                      {exerciseItem.options?.map((c, i) => {
                        return <p key={i}>{`${String.fromCharCode(65 + i)}) ${c}`}</p>
                      })}
                      {exerciseItem.type == 'free_text' && <div className="p-5"></div>}
                    </div>
                  )
                })}
              </div>
              <div className="page-break mb-5">
                <h2>Answer Key:</h2>
                {lesson.exercises.map((answerItem, answerIndex) => {
                  return (
                    <div key={`answerItem-${answerIndex}`}>
                      <p key={answerIndex}>{`${answerIndex + 1}) ${answerItem.question}`}</p>
                      {`Answer: ${answerItem.answer?.reduce((acc, current) => {
                        return acc + '; ' + current
                      })}`}
                    </div>
                  )
                })}
                <h6 className="mt-5">&#128640; Created with the help of Teacher aiD digital slaves. &#128640;</h6>
              </div>
            </div>
          </Card>
        </BaseLayout>
      )
    } else {
      console.log('DM: inside the else')
      // TODO: display error?
    }
  }

  return (
    <>
      {loading ? (
        <BaseLayout>
          <Card className="min-vh-100">
            <div className="m-5 text-center">
              <h2>Hold tight! Our digital slaves are making your lesson plan:</h2>
              <p>{id}</p>
              <div>
                <ProgressSpinner />
              </div>
            </div>
          </Card>
        </BaseLayout>
      ) : (
        getLesson()
      )}
    </>
  )
}
