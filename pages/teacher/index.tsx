import BaseLayout from '@/src/components/BaseLayout'
import ErrorMessage from '@/src/components/ErrorMessage'
import { subjects } from '@/src/utils/constants/subjects'
import { getDropdownValue, getGradeDropdownValue } from '@/src/utils/helpers/dropdown'
import axios from 'axios'
import router from 'next/router'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

export default function Teacher() {
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: FieldValues) => {
    const requestId = uuidv4()
    data['requestId'] = requestId
    setDisabledSubmit(true)
    const timer = setTimeout(() => {
      setDisabledSubmit(false)
      // redirect if call takes more than 5 seconds
      router.push(`/teacher/result/${requestId}`)
    }, 15000)
    await axios
      .post('api/generate/teacher', data)
      .then((response) => {
        clearTimeout(timer)
        console.info('api response: ', JSON.stringify(response))
      })
      .catch((err) => {
        // TODO: display error message
      })
      .finally(() => {
        setDisabledSubmit(false)
        router.push(`/teacher/result/${requestId}`)
      })
  }

  return (
    <BaseLayout>
      <Card className="min-vh-100">
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-4" role="form">
          <div className="mb-3">
            {/* Subject Field */}
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <Controller
              name="subject"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  inputId="subject"
                  id="subject"
                  value={field.value}
                  options={getDropdownValue(subjects)}
                  onChange={(e) => field.onChange(e.value)}
                  onBlur={field.onBlur}
                  placeholder="Select a Subject"
                  optionLabel="name"
                  // TODO: maybe use class is-invalid instead?
                  className={` w-100 ${errors.subject ? 'p-invalid' : ''}`}
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  disabled={disabledSubmit}
                />
              )}
            />
            {errors.subject && ErrorMessage('subject-error', 'Subject is required!')}

            {/* Grade Field */}
            <label htmlFor="grade" className="form-label  mt-3">
              Grade
            </label>
            <Controller
              name="grade"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Dropdown
                  inputId="grade"
                  id="grade"
                  value={field.value}
                  options={getGradeDropdownValue()}
                  onChange={(e) => field.onChange(e.value)}
                  onBlur={field.onBlur}
                  placeholder="Select a Grade"
                  optionLabel="name"
                  // TODO: maybe use class is-invalid instead?
                  className={`w-100 ${errors.grade ? 'p-invalid' : ''}`}
                  aria-invalid={errors.grade ? 'true' : 'false'}
                  aria-describedby={errors.grade ? 'grade-error' : undefined}
                  disabled={disabledSubmit}
                />
              )}
            />
            {errors.subject && ErrorMessage('grade-error', 'Grade is required!')}

            {/* Topic Field */}
            <label htmlFor="topic" className="form-label  mt-3">
              Specific Topic
            </label>
            <Controller
              name="topic"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="topic"
                  itemID="topic"
                  value={field.value ?? ''}
                  onBlur={field.onBlur}
                  placeholder="Enter the specific topic"
                  // TODO: maybe use class is-invalid instead?
                  className={` w-100 ${errors.topic ? 'p-invalid' : ''}`}
                  aria-invalid={errors.topic ? 'true' : 'false'}
                  aria-describedby={errors.topic ? 'topic-error' : undefined}
                  disabled={disabledSubmit}
                />
              )}
            />
            {errors.topic && ErrorMessage('topic-error', 'Topic is required!')}

            <Button
              type="submit"
              label="Make my lesson plan"
              icon="pi pi-check"
              className="p-button-text  mt-3"
              loading={disabledSubmit}
              disabled={disabledSubmit}
            />
          </div>
        </form>
      </Card>
    </BaseLayout>
  )
}

// questions teacher
// What would you like to teach?
// 1. Age group or grade
// 2. Subject matter (math, language, geography, history, chemstry, biology, physics, social studies, religion, gym/physical education, music, art)
// 3. Specific subject
// 4. Practice activity (y/n)
// 5. Presentation (y/n)
// 6. Handout (y/n)
