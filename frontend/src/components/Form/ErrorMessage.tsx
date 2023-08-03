import { useFormContext } from 'react-hook-form'

interface ErrorMessageProps {
  field: string
}

export function ErrorMessage({ field }: ErrorMessageProps) {
  const { formState: { errors } } = useFormContext()

  const fieldError = errors[field] ?? null

  if (!fieldError) {
    return null
  }

  return (
    <span className="text-xs text-red-600">{fieldError.message?.toString()}</span>
  )
}