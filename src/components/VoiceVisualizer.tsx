
import React, { useRef, useEffect } from 'react';

interface VoiceVisualizerProps {
  audioData: number[];
  isRecording: boolean;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ audioData, isRecording }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (!isRecording || audioData.length === 0) {
      // Draw flat line when not recording
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 2;
      ctx.stroke();
      return;
    }
    
    // Draw waveform
    const sliceWidth = width / audioData.length;
    let x = 0;
    
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    
    for (let i = 0; i < audioData.length; i++) {
      const y = (audioData[i] * height) / 2 + height / 4;
      
      ctx.lineTo(x, y);
      x += sliceWidth;
    }
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#4A31B9');
    gradient.addColorStop(1, '#6DB1FF');
    
    ctx.lineTo(width, height / 2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.stroke();
    
  }, [audioData, isRecording]);

  return (
    <div className="w-full h-32 relative glass-panel p-2">
      <canvas 
        ref={canvasRef}
        width={800}
        height={128}
        className="w-full h-full"
      />
      {isRecording && (
        <div className="absolute bottom-2 right-2 flex items-center">
          <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse mr-2"></span>
          <span className="text-xs font-medium text-gray-500">Recording...</span>
        </div>
      )}
    </div>
  );
};

// Alternative visualization style with bars
export const VoiceWaveform: React.FC<VoiceVisualizerProps> = ({ audioData, isRecording }) => {
  // Choose a subset of data points to display as bars
  const displayBars = 40;
  const step = Math.max(1, Math.floor(audioData.length / displayBars));
  const barsData = isRecording 
    ? audioData.filter((_, i) => i % step === 0).slice(0, displayBars)
    : Array(displayBars).fill(0.1);
  
  return (
    <div className="voice-wave h-20 w-full flex items-center justify-center">
      {barsData.map((value, index) => (
        <div
          key={index}
          className="voice-wave-bar"
          style={{
            height: `${Math.max(5, value * 60)}px`,
            transform: `scaleY(${isRecording ? 1 : 0.5})`,
            animationDelay: `${index * 0.05}s`
          }}
        />
      ))}
    </div>
  );
};

export default VoiceVisualizer;
