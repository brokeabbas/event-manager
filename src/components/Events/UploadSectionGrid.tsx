import React from 'react';
import MediaGallery from './MediaGallery';
import FileUploader from './FileUploader';
import VenueMapUploader from './VenueMapUploader';

const UploadSectionGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <MediaGallery />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <FileUploader />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <VenueMapUploader />
      </div>
    </div>
  );
};

export default UploadSectionGrid;
