import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  eventUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ visible, onClose, eventUrl }) => {
  if (!visible) return null;

  const handleDownloadQR = () => {
    const canvas = document.getElementById('share-qr') as HTMLCanvasElement;
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'event-qr-code.png';
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-400 hover:text-red-500"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">🔗 Share Event</h2>
        <p className="text-sm text-gray-600 mb-4">
          Share the link or download the QR code to invite others.
        </p>

        <div className="flex justify-center">
          <QRCodeCanvas
            id="share-qr"
            value={eventUrl}
            size={160}
            bgColor="#FFFFFF"
            fgColor="#1F2937"
            includeMargin={true}
            level="Q"
          />
        </div>

        <p
          className="text-sm mt-4 break-all text-center text-blue-600 hover:underline cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(eventUrl);
            alert('Event link copied to clipboard!');
          }}
        >
          {eventUrl}
        </p>

        <button
          onClick={handleDownloadQR}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
