export const generateToken = (user: any) => {
  return btoa(
    JSON.stringify({
      userId: user.id,
      exp: Date.now() + 60 * 60 * 1000, // 1 hour
    })
  )
}

export const verifyToken = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token))

    if (decoded.exp < Date.now()) return null

    return decoded
  } catch {
    return null
  }
}