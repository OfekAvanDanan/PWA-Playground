import React, { useRef, useState } from 'react';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError('Cannot access camera directly. Falling back to file input.');
      fileInputRef.current?.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !videoRef.current) return;
    const url = URL.createObjectURL(file);
    videoRef.current.srcObject = null;
    videoRef.current.src = url;
    videoRef.current.play();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>React PWA-Playground</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: 400 }}
        playsInline
        muted
        controls={false}
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={openCamera}>Camera</button>
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
