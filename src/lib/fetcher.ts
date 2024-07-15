export const fetchFromApi = async (url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/` + url)
  const result = await res.json()
  if (result.code === 500) {
    throw new Error(result.message)
  }
  return result
}
