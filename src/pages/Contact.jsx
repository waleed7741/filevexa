import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import SEO from '../components/SEO'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // UI-only form (no backend) – show a friendly confirmation message
    setSubmitted(true)
  }

  return (
    <div className="container">
      <SEO
        title="Contact | FileVexa"
        description="Get in touch with the FileVexa team. Send us a message with your questions or feedback."
        canonical="https://filevexa.pages.dev/contact"
      />
      <div className="static-page">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <h1>Contact Us</h1>
        <p className="page-meta">Have a question, suggestion, or found a bug? We'd love to hear from you.</p>

        {submitted ? (
          <div className="result-card" style={{ maxWidth: '560px' }}>
            <div className="result-icon" aria-hidden="true">✓</div>
            <div className="result-info">
              <h3>Message received!</h3>
              <p>Thanks for reaching out. We'll get back to you as soon as possible.</p>
            </div>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                type="text"
                className="form-input"
                placeholder="Jane Smith"
                autoComplete="name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                type="email"
                className="form-input"
                placeholder="jane@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                className="form-input"
                placeholder="Question about a tool"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="form-textarea"
                placeholder="Describe your question or feedback…"
                required
              ></textarea>
            </div>
            <button id="contact-submit" type="submit" className="btn btn-primary btn-lg">
              Send Message
            </button>
            <p className="text-muted mt-4">
              Note: This form is a UI demonstration. To contact us directly, email{' '}
              <a href="mailto:hello@filevexa.com">hello@filevexa.com</a>.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
