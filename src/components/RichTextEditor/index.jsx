import { useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'

const QuillNoSSR = dynamic(() => import('react-quill'), { ssr: false })

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'blockquote', 'code-block',
  'link', 'image',
]

export default function RichTextEditor({ value, onChange }) {
  const quillRef = useRef(null)

  const imageHandler = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) {
          const quill = quillRef.current?.getEditor()
          if (quill) {
            const range = quill.getSelection(true)
            quill.insertEmbed(range.index, 'image', data.url)
            quill.setSelection(range.index + 1)
          }
        }
      } catch {
        // upload failed silently
      }
    }
  }, [])

  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: { image: imageHandler },
    },
  }

  return (
    <QuillNoSSR
      ref={quillRef}
      theme="snow"
      value={value || ''}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder="Description du produit..."
    />
  )
}
