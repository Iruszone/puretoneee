
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VoiceRecorder from '@/components/VoiceRecorder';
import AnalysisResults from '@/components/AnalysisResults';
import { VoiceAnalysisResult } from '@/utils/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Lock, HeadphonesIcon, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<VoiceAnalysisResult | null>(null);

  const handleAnalysisComplete = (result: VoiceAnalysisResult) => {
    setAnalysisResult(result);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-pt-dark mb-2">
            PureTone Voice Analysis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced voice recognition system with deep learning for secure, 
            accurate voice identification and analysis
          </p>
        </div>
        
        <Tabs defaultValue="record" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="record">Record Voice</TabsTrigger>
            {/* <TabsTrigger value="use-cases" disabled={!analysisResult}>Use Cases</TabsTrigger> */}
            <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
          </TabsList>
          <TabsContent value="record" className="space-y-8 pt-6">
            <VoiceRecorder onAnalysisComplete={handleAnalysisComplete} />
            
            {analysisResult && (
              <AnalysisResults result={analysisResult} />
            )}
          </TabsContent>
          
          <TabsContent value="use-cases" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/attendance-tracker" className="block">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2 text-pt-purple" />
                    Attendance Tracking
                  </CardTitle>
                  <CardDescription>
                    Voice-based attendance system for secure identification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Replace traditional check-in systems with voice recognition. 
                    The system's 92% match confidence would confirm identity in seconds
                    without physical contact or cards.
                  </p>
                </CardContent>
              </Card>
              </Link>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-pt-blue" />
                    Security Verification
                  </CardTitle>
                  <CardDescription>
                    Secure access control for sensitive areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Voice biometrics provides an additional layer of security. 
                    The system's anti-spoofing technology can detect voice recordings 
                    or synthesized voice attempts.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mic className="h-5 w-5 mr-2 text-pt-teal" />
                    Mental Health Monitoring
                  </CardTitle>
                  <CardDescription>
                    Detect stress and emotional indicators in speech
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Regular voice analysis can track stress levels and emotional patterns over time.
                    Early detection of increased stress can prompt timely interventions
                    and support.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HeadphonesIcon className="h-5 w-5 mr-2 text-orange-500" />
                    Enhanced Communications
                  </CardTitle>
                  <CardDescription>
                    Improve clarity in virtual meetings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    The system's noise reduction and voice clarity enhancement
                    make virtual meetings more productive by filtering out background
                    noise and improving speech intelligibility.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
