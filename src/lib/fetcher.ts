export const fetchFromApi = async (url: string) => {
  const res = await fetch(`http://localhost:3000/api/` + url)
  const result = await res.json()
  if (result.code === 500) {
    throw new Error(result.message)
  }
  return result
}
