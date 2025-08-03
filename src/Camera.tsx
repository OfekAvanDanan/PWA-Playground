import { useRef, useState } from 'react';
import { Bill } from './bill';
import type { BillItem } from './bill';

// Minimal declaration for the global Tesseract object loaded via CDN
declare const Tesseract: {
  recognize: (image: string | Blob, lang: string) => Promise<{ data: { text: string } }>;
};

interface CameraProps {
  onScanComplete: (bill: Bill) => void;
}

export default function Camera({ onScanComplete }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera API error:', err);
      setError('Cannot access camera directly. Select an image instead.');
      fileInputRef.current?.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !videoRef.current) return;
    const url = URL.createObjectURL(file);
    videoRef.current.srcObject = null;
    videoRef.current.src = url;
    void videoRef.current.play();
  };

  const scan = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setLoading(true);
    try {
      const { data } = await Tesseract.recognize(dataUrl, 'eng');
      const items: BillItem[] = [];
      data.text.split('\n').forEach((line) => {
        const match = line.match(/(.+)\s+(\d+\.\d{2})$/);
        if (match) {
          items.push({ name: match[1].trim(), price: parseFloat(match[2]) });
        }
      });
      onScanComplete(new Bill(items));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Bill Scanner</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: 400 }}
        playsInline
        muted
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div style={{ marginTop: 16 }}>
        <button onClick={openCamera}>Open Camera</button>
        <button onClick={scan} disabled={loading} style={{ marginLeft: 8 }}>
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </div>
  );
}
