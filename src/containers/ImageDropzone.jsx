import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ImageDropzone = ({ onDrop }) => {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles[0])
      }
    },
    [onDrop],
  )

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50",
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        {acceptedFiles.length > 0 ? (
          <>
            <ImageIcon className="h-10 w-10 text-primary" />
            <p className="text-sm font-medium">{acceptedFiles[0].name}</p>
            <p className="text-xs text-muted-foreground">Click or drag to change</p>
          </>
        ) : (
          <>
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium">{isDragActive ? "Drop the image here" : "Drag & drop an image here"}</p>
            <p className="text-xs text-muted-foreground">or click to select</p>
          </>
        )}
      </div>
    </div>
  )
}
