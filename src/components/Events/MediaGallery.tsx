import React, { useState } from 'react';

const MediaGallery = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="h-full w-full transition-all duration-300 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-100 hover:shadow-lg hover:scale-[1.01] p-4 flex flex-col items-center text-center">
      <label className="text-lg font-bold text-gray-800 mb-3">Media Gallery</label>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="mb-6 block w-full max-w-xs text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
      />

      <div className="grid grid-cols-3 gap-3 w-full">
        {images.map((file, i) => (
          <img
            key={i}
            src={URL.createObjectURL(file)}
            alt="event media"
            className="rounded-xl h-32 object-cover border border-gray-200 shadow-sm transition-transform hover:scale-105"
          />
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
