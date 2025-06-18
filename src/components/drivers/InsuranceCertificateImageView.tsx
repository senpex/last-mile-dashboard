
import React from "react"
import { Button } from "@/components/ui/button"
import { Eye, Upload } from "lucide-react"

interface InsuranceCertificateImageViewProps {
  imageUrl?: string
  isEditing: boolean
}

export const InsuranceCertificateImageView: React.FC<InsuranceCertificateImageViewProps> = ({
  imageUrl,
  isEditing
}) => {
  return (
    <div className="space-y-2">
      {/* Image Display Area */}
      {imageUrl && (
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt="Insurance Certificate"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
      
      {/* Action Buttons */}
      {isEditing ? (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Upload className="h-4 w-4 mr-2" />
            Upload New Image
          </Button>
          {imageUrl && (
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        imageUrl && (
          <div className="flex justify-end">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </div>
        )
      )}
    </div>
  )
}
