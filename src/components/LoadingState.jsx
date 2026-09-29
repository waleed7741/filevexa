export default function LoadingState({ message = 'Converting your file…' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite" aria-label={message}>
      <div className="spinner" aria-hidden="true"></div>
      <p>{message}</p>
    </div>
  )
}
