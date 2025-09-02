
/**
 * Audio utility functions for PureTone
 */

export const startRecording = async (setAudioStream: React.Dispatch<React.SetStateAction<MediaStream | null>>, 
                                   setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
                                   setRecordingData: React.Dispatch<React.SetStateAction<Blob | null>>,
                                   setAudioData: React.Dispatch<React.SetStateAction<number[]>>) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setAudioStream(stream);
    setIsRecording(true);
    
    // Set up audio context and analyzer for visualization
    const audioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    
    const audioSource = audioContext.createMediaStreamSource(stream);
    audioSource.connect(analyzer);
    
    // Create a media recorder
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];
    
    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };
    
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      setRecordingData(audioBlob);
    };
    
    mediaRecorder.start();
    
    // Update visualization data
    const dataArray = new Uint8Array(analyzer.frequencyBinCount);
    
    const updateVisualization = () => {
      if (!setIsRecording) return;
      
      analyzer.getByteFrequencyData(dataArray);
      
      // Convert to normalized array for visualization
      const normalizedData = Array.from(dataArray).map(
        value => value / 255
      );
      
      setAudioData(normalizedData);
      
      if (setIsRecording) {
        requestAnimationFrame(updateVisualization);
      }
    };
    
    updateVisualization();
    
    return mediaRecorder;
  } catch (error) {
    console.error("Error accessing microphone:", error);
    return null;
  }
};

export const stopRecording = (
  mediaRecorder: MediaRecorder | null,
  audioStream: MediaStream | null,
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
  
  if (audioStream) {
    audioStream.getTracks().forEach(track => track.stop());
  }
  
  setIsRecording(false);
};

export const playRecording = (recordingData: Blob | null) => {
  if (!recordingData) return;
  
  const audioUrl = URL.createObjectURL(recordingData);
  const audio = new Audio(audioUrl);
  audio.play();
};
