
/**
 * Mock data for PureTone demonstration
 */

export interface VoiceAnalysisResult {
  id: string;
  timestamp: string;
  speaker: {
    name: string;
    confidence: number;
    verified: boolean;
  };
  emotion: {
    primary: string;
    confidence: number;
    secondary?: string;
  };
  stress: {
    level: number; // 0-100
    indicators: string[];
  };
  metrics: {
    clarity: number; // 0-100
    noiseReduction: number; // 0-100
    voicePrint: number; // 0-100 (match with reference)
  };
}

export const mockAnalysisResults: VoiceAnalysisResult[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    speaker: {
      name: 'Suri Arul U',
      confidence: 0.92,
      verified: true,
    },
    emotion: {
      primary: 'Neutral',
      confidence: 0.78,
      secondary: 'Mild stress',
    },
    stress: {
      level: 32,
      indicators: ['Slight pitch variation', 'Minor voice trembling'],
    },
    metrics: {
      clarity: 89,
      noiseReduction: 94,
      voicePrint: 92,
    },
  }
];

export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    voiceId: 'voice-profile-001',
    department: 'Engineering',
    lastAuthenticated: '2025-05-02T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    voiceId: 'voice-profile-002',
    department: 'Marketing',
    lastAuthenticated: '2025-05-01T16:42:00Z',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    voiceId: 'voice-profile-003',
    department: 'Finance',
    lastAuthenticated: '2025-05-02T09:15:00Z',
  },
];

export const emotionColors = {
  'Neutral': 'bg-gray-200',
  'Happy': 'bg-green-200',
  'Sad': 'bg-blue-200',
  'Angry': 'bg-red-200',
  'Fear': 'bg-yellow-200',
  'Surprise': 'bg-purple-200',
  'Disgust': 'bg-orange-200',
  'Mild stress': 'bg-amber-100',
};
