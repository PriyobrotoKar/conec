export const fetchFromApi = async (
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body?: Record<any, string>
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/` + url, {
    method,
    body: JSON.stringify(body)
  })
  const result = await res.json()
  if (result.code === 500) {
    throw new Error(result.message)
  }
  return result
}
