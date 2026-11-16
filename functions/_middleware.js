export async function onRequest(context) {
  const { request } = context
  const url = new URL(request.url)

  if (
    (request.method === 'GET' || request.method === 'HEAD') &&
    url.pathname.length > 1 &&
    url.pathname.endsWith('/')
  ) {
    url.pathname = url.pathname.replace(/\/+$/, '') || '/'
    return Response.redirect(url.toString(), 301)
  }

  return context.next()
}
