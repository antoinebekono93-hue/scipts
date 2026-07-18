const rateLimitMap = new Map()

export default function rateLimit(
  req,
  res,
  options = { windowMs: 60 * 1000, max: 100 }
) {
  const ip =
    req.headers['x-forwarded-for'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    '127.0.0.1'

  const now = Date.now()

  // Clean up expired IPs to prevent memory leaks (runs every time but only cleans old ones)
  // To avoid performance issues on every request, we could run cleanup periodically,
  // but for a small map, iterating occasionally or just letting it grow slightly is okay.
  // We'll clean up entries that are older than windowMs.
  if (Math.random() < 0.1) {
    // 10% chance to trigger cleanup to avoid doing it every request
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + options.windowMs })
  } else {
    const data = rateLimitMap.get(ip)
    if (now > data.resetTime) {
      data.count = 1
      data.resetTime = now + options.windowMs
    } else {
      data.count += 1
      if (data.count > options.max) {
        res.status(429).json({ error: 'Too many requests, please try again later.' })
        return true // Indicates rate limit reached
      }
    }
  }
  return false
}
