import { useState } from 'react'

/**
 * FaqItem – accordion-style FAQ entry
 *
 * Props:
 *  question  string
 *  answer    string
 *  id        string – unique id for aria
 */
function FaqItem({ question, answer, id }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button
        className="faq-question"
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        id={`faq-question-${id}`}
        onClick={() => setOpen(o => !o)}
      >
        {question}
        <span className="faq-chevron" aria-hidden="true">▼</span>
      </button>
      <div
        className="faq-answer"
        id={`faq-answer-${id}`}
        role="region"
        aria-labelledby={`faq-question-${id}`}
      >
        <p>{answer}</p>
      </div>
    </div>
  )
}

/**
 * FaqSection
 *
 * Props:
 *  items  Array<{ question: string, answer: string }>
 */
export default function FaqSection({ items }) {
  return (
    <div className="faq-list" role="list">
      {items.map((item, i) => (
        <FaqItem
          key={i}
          id={`item-${i}`}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  )
}
