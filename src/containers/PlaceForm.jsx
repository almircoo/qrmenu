import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { addPlace, uploadImage } from '@/apis'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImageDropzone } from './ImageDropzone'
import { LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'

export const PlaceForm = ({onDone}) => {
  const [name, setName] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) {
      toast.error("Please upload an image")
      return
    }

    setLoading(true)

    try {
      const uploadResponse = await uploadImage(image)
      const imageUrl = uploadResponse.secure_url

      const json = await addPlace({ name, image: imageUrl }, token)
      if (json) {
        toast.success("Place created successfully!")
        onDone()
      }
    } catch (error) {
      toast.error("Failed to create place")
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Place Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter place name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Place Image</Label>
        <ImageDropzone onDrop={setImage} />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <LoaderIcon  className="mr-2 h-4 w-4" />
            Creando...
          </>
        ) : (
          "Create Place"
        )}
      </Button>
    </form>
  )
}
