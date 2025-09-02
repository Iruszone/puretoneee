
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, HelpCircle } from 'lucide-react';
import VoiceVisualizer, { VoiceWaveform } from './VoiceVisualizer';
import { startRecording, stopRecording, playRecording } from '../utils/audioUtils';
import { VoiceAnalysisResult, mockAnalysisResults } from '../utils/mockData';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const VoiceRecorder: React.FC<{
  onAnalysisComplete?: (result: VoiceAnalysisResult) => void;
}> = ({ onAnalysisComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [recordingData, setRecordingData] = useState<Blob | null>(null);
  const [audioData, setAudioData] = useState<number[]>(Array(50).fill(0));
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleStartRecording = async () => {
    mediaRecorderRef.current = await startRecording(
      setAudioStream,
      setIsRecording,
      setRecordingData,
      setAudioData
    );
  };

  const handleStopRecording = () => {
    stopRecording(mediaRecorderRef.current, audioStream, setIsRecording);
    simulateProcessing();
  };

  const handlePlayback = () => {
    playRecording(recordingData);
  };

  // Simulate voice processing with stages
  const simulateProcessing = () => {
    setIsProcessing(true);
    
    const stages = [
      'Isolating voice patterns',
      'Analyzing voice fingerprint',
      'Detecting emotional indicators',
      'Measuring stress levels',
      'Applying noise reduction',
      'Verifying identity',
      'Finalizing analysis'
    ];
    
    let currentStage = 0;
    
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProcessingStage(stages[currentStage]);
        currentStage++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setProcessingStage('');
        
        // Send mock analysis result
        if (onAnalysisComplete) {
          onAnalysisComplete({
            ...mockAnalysisResults[0],
            timestamp: new Date().toISOString()
          });
        }
      }
    }, 800);
  };

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-pt-dark">Voice Recognition</h2>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="w-80 text-sm">
              Record your voice for identity verification and voice analysis. 
              The system will detect voice patterns, emotional tone, and stress levels.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="glass-panel p-6 rounded-xl">
        <VoiceVisualizer audioData={audioData} isRecording={isRecording} />
        
        {isProcessing ? (
          <div className="my-6 text-center">
            <div className="inline-block relative">
              <div className="h-12 w-12 rounded-full bg-pt-teal bg-opacity-30 flex items-center justify-center mx-auto">
                <div className="h-10 w-10 rounded-full bg-pt-teal bg-opacity-50 animate-pulse"></div>
              </div>
              <div className="recording-ring animate-pulse-ring"></div>
            </div>
            <p className="mt-4 text-sm font-medium text-pt-dark">{processingStage}</p>
            <div className="mt-2 w-full max-w-xs mx-auto bg-gray-200 rounded-full h-1.5">
              <div className="bg-pt-blue h-1.5 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-4 my-6">
              {!isRecording ? (
                <Button 
                  className="bg-pt-purple hover:bg-pt-purple/90 text-white rounded-full h-16 w-16 flex items-center justify-center"
                  onClick={handleStartRecording}
                >
                  <Mic className="h-6 w-6" />
                </Button>
              ) : (
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full h-16 w-16 flex items-center justify-center"
                  onClick={handleStopRecording}
                >
                  <Square className="h-5 w-5" />
                </Button>
              )}
              {recordingData && !isRecording && (
                <Button 
                  className="bg-pt-teal hover:bg-pt-teal/90 text-white rounded-full h-16 w-16 flex items-center justify-center"
                  onClick={handlePlayback}
                >
                  <Play className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            <div className="text-center text-sm text-gray-500">
              {isRecording ? (
                "Speak clearly into your microphone..."
              ) : recordingData ? (
                "Recording complete. You can play back or record again."
              ) : (
                "Click the microphone button to start recording"
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
