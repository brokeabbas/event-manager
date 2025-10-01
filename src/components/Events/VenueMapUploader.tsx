import React, { useState } from 'react';

const VenueMapUploader = () => {
  const [map, setMap] = useState<string | null>(null);

  const handleMapUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setMap(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="h-full w-full transition-all duration-300 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-100 hover:shadow-lg hover:scale-[1.01] p-4 flex flex-col items-center text-center">
      <label className="text-lg font-bold text-gray-800 mb-3">Venue Floor Map</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleMapUpload}
        className="mb-6 block w-full max-w-xs text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-500 file:text-white hover:file:bg-yellow-600 cursor-pointer"
      />

      {map && (
        <img
          src={map}
          alt="Venue Map"
          className="rounded-xl w-full max-h-64 object-contain border border-gray-200 shadow-sm transition-transform hover:scale-105"
        />
      )}
    </div>
  );
};

export default VenueMapUploader;
