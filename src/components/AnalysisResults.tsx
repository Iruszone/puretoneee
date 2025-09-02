
import React from 'react';
import { VoiceAnalysisResult, emotionColors } from '../utils/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, Volume2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisResultsProps {
  result: VoiceAnalysisResult | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-pt-dark">Voice Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Speaker verification card */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="h-4 w-4 mr-2 text-pt-purple" />
              Speaker Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold">{result.speaker.name}</span>
              {result.speaker.verified ? (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>
              ) : (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Unverified</span>
              )}
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Match confidence</span>
                <span>{Math.round(result.speaker.confidence * 100)}%</span>
              </div>
              <Progress value={result.speaker.confidence * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Emotion analysis card */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-pt-blue" />
              Emotional State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 items-center">
              <span className={cn("w-3 h-3 rounded-full", emotionColors[result.emotion.primary as keyof typeof emotionColors] || "bg-gray-200")}></span>
              <span className="text-base font-semibold">{result.emotion.primary}</span>
            </div>
            {result.emotion.secondary && (
              <div className="flex gap-2 items-center mt-1">
                <span className={cn("w-2 h-2 rounded-full", emotionColors[result.emotion.secondary as keyof typeof emotionColors] || "bg-gray-200")}></span>
                <span className="text-xs text-gray-600">{result.emotion.secondary}</span>
              </div>
            )}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Confidence</span>
                <span>{Math.round(result.emotion.confidence * 100)}%</span>
              </div>
              <Progress value={result.emotion.confidence * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Stress level card */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Volume2 className="h-4 w-4 mr-2 text-pt-teal" />
              Stress Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-base font-semibold">
                {result.stress.level < 30 ? 'Low' : result.stress.level < 70 ? 'Moderate' : 'High'}
              </span>
              <span className="text-xs text-gray-500">({result.stress.level}%)</span>
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">Stress level</div>
              <Progress 
                value={result.stress.level} 
                className="h-2"
                indicatorClassName={cn(
                  result.stress.level < 30 ? "bg-green-500" : 
                  result.stress.level < 70 ? "bg-yellow-500" : 
                  "bg-red-500"
                )}
              />
            </div>
            {result.stress.indicators.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-1">Indicators</div>
                <div className="text-xs">
                  {result.stress.indicators.map((indicator, i) => (
                    <span key={i} className="inline-block bg-gray-100 rounded-full px-2 py-1 mr-1 mb-1">
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Voice metrics */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Voice Quality Metrics</CardTitle>
          <CardDescription>Technical measurements of voice processing quality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Clarity metric */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Voice Clarity</span>
                <span>{result.metrics.clarity}%</span>
              </div>
              <Progress value={result.metrics.clarity} className="h-2" />
              <p className="text-xs mt-1 text-gray-500">How clear the voice is after processing</p>
            </div>

            {/* Noise reduction metric */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Noise Reduction</span>
                <span>{result.metrics.noiseReduction}%</span>
              </div>
              <Progress value={result.metrics.noiseReduction} className="h-2" />
              <p className="text-xs mt-1 text-gray-500">Effectiveness of background noise removal</p>
            </div>

            {/* Voice print metric */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Voice Print Match</span>
                <span>{result.metrics.voicePrint}%</span>
              </div>
              <Progress value={result.metrics.voicePrint} className="h-2" />
              <p className="text-xs mt-1 text-gray-500">Match with stored voice profile</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
