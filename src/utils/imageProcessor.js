export const MAX_DIMENSION = 1600
export const WATERMARK_TEXT = 'Script Marketplace'

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function drawWatermark(ctx, width, height) {
  const text = WATERMARK_TEXT
  const fontSize = Math.max(14, Math.round(width * 0.03))
  const padding = Math.round(fontSize * 0.7)

  ctx.save()
  ctx.globalAlpha = 0.9
  ctx.font = `600 ${fontSize}px Poppins, sans-serif`
  ctx.textBaseline = 'bottom'
  ctx.textAlign = 'right'

  const metrics = ctx.measureText(text)
  const boxW = metrics.width + padding * 2
  const boxH = fontSize + padding * 1.2

  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)'
  ctx.fillRect(width - boxW - padding, height - boxH - padding, boxW, boxH)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fillText(text, width - padding, height - padding - padding * 0.3)

  ctx.restore()
}

export async function processImage(
  file,
  { maxDimension = MAX_DIMENSION, watermark = true } = {}
) {
  const isGif = file.type === 'image/gif'
  if (isGif) {
    return {
      blob: file,
      dataUrl: await fileToDataUrl(file),
      resized: false,
      watermarked: false,
    }
  }

  const dataUrl = await fileToDataUrl(file)
  const img = await loadImage(dataUrl)

  const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
  const width = Math.round(img.width * scale)
  const height = Math.round(img.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)

  if (watermark) drawWatermark(ctx, width, height)

  const blob = await new Promise(resolve =>
    canvas.toBlob(resolve, 'image/webp', 0.85)
  )

  return {
    blob,
    dataUrl: canvas.toDataURL('image/webp', 0.85),
    resized: scale < 1,
    watermarked: watermark,
  }
}
