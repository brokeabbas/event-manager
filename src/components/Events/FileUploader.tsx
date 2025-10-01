import React, { useState } from 'react';

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="h-full w-full transition-all duration-300 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-lg hover:scale-[1.01] p-4 flex flex-col items-center text-center">
      <label className="text-lg font-bold text-gray-800 mb-3">Uploaded Documents</label>

      <input
        type="file"
        multiple
        onChange={handleUpload}
        className="mb-6 block w-full max-w-xs text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-600 cursor-pointer"
      />

      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside w-full max-w-sm mx-auto">
        {files.map((file, i) => (
          <li key={i}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploader;
