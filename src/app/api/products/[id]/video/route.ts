import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: video, error } = await supabase
      .from('product_videos')
      .select('id, video_url')
      .eq('product_id', id)
      .single()

    if (error) {
      // No video found is not an error
      if (error.code === 'PGRST116') {
        return NextResponse.json(null)
      }
      console.error('Error fetching video:', error)
      return NextResponse.json(
        { error: 'Failed to fetch video' },
        { status: 500 }
      )
    }

    return NextResponse.json(video)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
