import Breadcrumb from '../components/Breadcrumb'
import SEO from '../components/SEO'

export default function Contact() {
  return (
    <div className="container">
      <SEO
        title="Contact FileVexa: Tool Questions and Feedback"
        description="Email FileVexa about tool behavior, supported formats, accessibility, or site feedback. Your local files are not available to our team."
        canonical="https://filevexa.pages.dev/contact"
      />
      <div className="static-page">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <h1>Contact Us</h1>
        <p className="page-meta">
          Have a question about a tool, found a problem, or want to suggest an improvement? Email{' '}
          <a href="mailto:hello@filevexa.com">hello@filevexa.com</a>.
        </p>

        <h2>What to include</h2>
        <p>
          Tell us which tool and browser you were using, what you expected, and what happened. For a conversion problem,
          include the input format and approximate file size, but do not email private documents unless you are
          comfortable sharing them with your email provider and the recipient.
        </p>
        <h2>About local processing</h2>
        <p>
          FileVexa tools process selected files in your browser. Our team cannot view or retrieve a file from a
          conversion session, and support requests do not create an upload channel. Please describe the issue rather
          than sending sensitive content.
        </p>
        <h2>Tool limits and compatibility</h2>
        <p>
          Supported input formats and size limits vary by tool, and performance depends on your browser and device.
          Check the tool's format and limit information first. For policy questions, see our <a href="/privacy">Privacy Policy</a>{' '}
          and <a href="/terms">Terms of Use</a>.
        </p>
      </div>
    </div>
  )
}
