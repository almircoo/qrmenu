import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { fetchPlaces } from '@/apis'
import { Dialog, DialogHeader, DialogTitle, DialogContent } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { MainLayout } from '@/layouts/MainLayout'
import { PlaceForm } from '@/containers/PlaceForm'

export const Places = () => {
  const [places, setPlaces] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  const onFetchPlaces = async () => {
    const json = await fetchPlaces(token)
    if (json) {
      setPlaces(json)
    }
  }

  const onDone = () => {
    onFetchPlaces()
    setShowDialog(false)
  }

  useEffect(() => {
    onFetchPlaces()
  }, [])

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-bold mb-6 text-center">My Places</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {places.map((place) => (
              <button
                key={place.id}
                onClick={() => navigate(`/places/${place.id}`)}
                className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg hover:scale-[1.02]"
              >
                <div
                  className="aspect-video w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${place.image})` }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors text-left truncate">
                    {place.name}
                  </h3>
                </div>
              </button>
            ))}

            <button
              onClick={() => setShowDialog(true)}
              className="aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted hover:border-muted-foreground/50 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            >
              {/* Note: Ensure 'Plus' component is imported */}
              <Plus className="h-8 w-8" />
              <span className="text-lg font-medium">Add New Place</span>
            </button>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new place </DialogTitle>
          </DialogHeader>
          <PlaceForm onDone={onDone} />
        </DialogContent>
      </Dialog>
      
    </MainLayout>
    
  )
}
