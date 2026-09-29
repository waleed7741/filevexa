/**
 * ErrorMessage – displays a friendly, accessible error banner
 *
 * Props:
 *  message  string  – The user-facing error message
 */
export default function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div className="error-message" role="alert" aria-live="assertive">
      <span className="error-icon" aria-hidden="true">⚠️</span>
      <span>{message}</span>
    </div>
  )
}
