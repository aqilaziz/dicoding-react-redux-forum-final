export default function HtmlContent({ html }) {
  return (
    <div
      className="html-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
