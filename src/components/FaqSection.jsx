export default function FaqSection({ items }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
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
