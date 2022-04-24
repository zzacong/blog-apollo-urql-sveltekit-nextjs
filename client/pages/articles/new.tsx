import type { SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import clsx from 'clsx'

import { AddArticleDocument } from '$lib/generated/graphql'

export default function NewArticlePage() {
  const router = useRouter()
  const [_, addArticle] = useMutation(AddArticleDocument)

  const { handleSubmit, register, formState, reset } =
    useForm<FormFieldValues>()
  const { errors, isSubmitting, isValid, isSubmitted } = formState

  const onSubmit: SubmitHandler<FormFieldValues> = useCallback(
    async data => {
      console.log('data', data)
      const result = await addArticle(data)
      console.log('mutation result', result)
      reset()
      router.push('/')
    },
    [addArticle, reset, router]
  )

  const onError: SubmitErrorHandler<FormFieldValues> = useCallback(data => {
    console.error(data)
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-10">
        <div className="grid grid-cols-6 gap-6">
          <label htmlFor="title" className="text-2xl mt-2 font-bold col-span-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={clsx(
              'border border-gray-600 rounded-lg text-2xl col-span-5 p-4 text-gray-700',
              errors.title && 'border-red-500 border-2'
            )}
            {...register('title', { required: true })}
          />

          <label
            htmlFor="content"
            className="text-2xl mt-2 font-bold col-span-1"
          >
            Content
          </label>
          <textarea
            id="content"
            className={clsx(
              'border border-gray-600 rounded-lg text-2xl col-span-5 p-4 text-gray-700',
              errors.content && 'border-red-500 border-2'
            )}
            {...register('content', { required: true })}
          />

          <label
            htmlFor="author"
            className="text-2xl mt-2 font-bold col-span-1"
          >
            Author
          </label>
          <input
            id="author"
            type="text"
            className={clsx(
              'border border-gray-600 rounded-lg text-2xl col-span-5 p-4 text-gray-700',
              errors.author && 'border-red-500 border-2'
            )}
            {...register('author', { required: true })}
          />
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="submit"
            disabled={isSubmitting || (isSubmitted && !isValid)}
            className="px-12 py-2 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-80"
          >
            Add
          </button>
        </div>
      </form>
    </>
  )
}

type FormFieldValues = {
  title: string
  content: string
  author: string
}
