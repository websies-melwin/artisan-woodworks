'use client'

import { useState } from 'react'
import { uploadProductVideo, deleteProductVideo } from '@/lib/actions/storage-actions'
import { X, Upload, Loader2, Video } from 'lucide-react'
import Button from '@/components/ui/Button'

interface ProductVideo {
  id: string
  video_url: string
}

interface VideoUploadProps {
  productId: string
  existingVideo: ProductVideo | null
  onVideoChange: (video: ProductVideo | null) => void
  disabled?: boolean
}

export default function VideoUpload({
  productId,
  existingVideo,
  onVideoChange,
  disabled = false,
}: VideoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (existingVideo) {
      setError('Please delete the existing video before uploading a new one')
      return
    }

    const file = files[0]
    
    // Validate file type
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime']
    if (!allowedTypes.includes(file.type)) {
      setError('Only MP4, WebM, and MOV videos are allowed')
      return
    }

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('Video must be less than 50MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      const result = await uploadProductVideo(productId, file)

      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        onVideoChange(result.data)
      }
    } catch (err) {
      setError('Failed to upload video')
      console.error(err)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function handleDelete() {
    if (!existingVideo) return
    if (!confirm('Are you sure you want to delete this video?')) return

    setDeleting(true)
    setError('')

    try {
      const result = await deleteProductVideo(existingVideo.id)

      if (result.error) {
        setError(result.error)
      } else {
        onVideoChange(null)
      }
    } catch (err) {
      setError('Failed to delete video')
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Existing Video */}
      {existingVideo && (
        <div className="mb-6">
          <div className="relative group bg-[var(--color-gray-50)] rounded-lg border border-[var(--color-gray-200)] p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-[var(--color-gray-200)] rounded-lg flex items-center justify-center">
                <Video className="w-8 h-8 text-[var(--color-gray-600)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black truncate">Product Video</p>
                <p className="text-xs text-[var(--color-gray-500)] mt-1">
                  Video uploaded successfully
                </p>
              </div>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting || disabled}
                className="flex-shrink-0 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </button>
            </div>
            <video
              src={existingVideo.video_url}
              controls
              className="w-full mt-4 rounded-md"
            />
          </div>
        </div>
      )}

      {/* Upload Button */}
      {!existingVideo && (
        <div>
          <input
            type="file"
            id={`video-upload-${productId}`}
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleFileSelect}
            disabled={uploading || disabled}
            className="hidden"
          />
          <label htmlFor={`video-upload-${productId}`}>
            <Button
              type="button"
              variant="outline"
              disabled={uploading || disabled}
              onClick={() => document.getElementById(`video-upload-${productId}`)?.click()}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video (Optional)
                </>
              )}
            </Button>
          </label>
          <p className="mt-2 text-xs text-[var(--color-gray-500)]">
            MP4, WebM, or MOV • Max 50MB • 1 video per product
          </p>
        </div>
      )}
    </div>
  )
}
