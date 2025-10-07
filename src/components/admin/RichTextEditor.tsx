'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Heading2,
  Heading3,
  Undo,
  Redo
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Write your description...',
  disabled = false 
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border border-[var(--color-gray-200)] rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-[var(--color-gray-200)] bg-[var(--color-gray-50)]">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-[var(--color-gray-200)] ${
            editor.isActive('bold') ? 'bg-[var(--color-gray-200)]' : ''
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-[var(--color-gray-200)] ${
            editor.isActive('italic') ? 'bg-[var(--color-gray-200)]' : ''
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[var(--color-gray-300)] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-[var(--color-gray-200)] ${
            editor.isActive('heading', { level: 2 }) ? 'bg-[var(--color-gray-200)]' : ''
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-[var(--color-gray-200)] ${
            editor.isActive('heading', { level: 3 }) ? 'bg-[var(--color-gray-200)]' : ''
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[var(--color-gray-300)] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-[var(--color-gray-200)] ${
            editor.isActive('bulletList') ? 'bg-[var(--color-gray-200)]' : ''
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          className={`p-2 rounded hover:bg-[var(--color-gray-200)] ${
            editor.isActive('orderedList') ? 'bg-[var(--color-gray-200)]' : ''
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[var(--color-gray-300)] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().undo()}
          className="p-2 rounded hover:bg-[var(--color-gray-200)] disabled:opacity-50"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().redo()}
          className="p-2 rounded hover:bg-[var(--color-gray-200)] disabled:opacity-50"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        className="prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  )
}
