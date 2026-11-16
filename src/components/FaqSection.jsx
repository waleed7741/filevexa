import { useLocation } from 'react-router-dom'
import { getToolFaqItems } from '../config/toolsSEOData'

export default function FaqSection({ items }) {
  const { pathname } = useLocation()
  const routeId = pathname.replace(/^\/+|\/+$/g, '')
  const routeItems = getToolFaqItems(routeId)
  const faqItems = routeItems.length ? routeItems : items

  return (
    <div className="faq-list">
      {faqItems.map((item) => (
        <details className="faq-item" key={item.question}>
          <summary className="faq-question">
            {item.question}
            <span className="faq-chevron" aria-hidden="true">▼</span>
          </summary>
          <div className="faq-answer"><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  )
}
