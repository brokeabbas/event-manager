// components/Events/CoverPhotoUploader.tsx
import React, { useState } from 'react';

interface CoverPhotoUploaderProps {
  eventId: number;
}

const CoverPhotoUploader: React.FC<CoverPhotoUploaderProps> = ({ eventId }) => {
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (coverPhoto) {
      // Implement upload logic here
      console.log(`Uploading cover photo for event ${eventId}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Cover Photo</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Cover Preview" className="w-full h-64 object-cover rounded" />
        </div>
      )}
      <button
        onClick={handleUpload}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Upload Cover Photo
      </button>
    </div>
  );
};

export default CoverPhotoUploader;
