// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Calendar } from '@/components/ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { CalendarIcon, Clock, UserCheck, AlertTriangle, Download } from 'lucide-react';
// import { voiceService } from '@/lib/supabase';
// import { useToast } from '@/components/ui/use-toast';
// import { format } from 'date-fns';

// // Define the type for a single attendance record
// interface AttendanceRecord {
//   id?: string;
//   voice_profile_id: string;
//   timestamp: string;
//   location: string;
//   confidence: number;
//   verified: boolean;
//   voice_profiles?: {
//     name?: string;
//     department?: string;
//   };
// }

// const AttendanceTracker: React.FC = () => {
//   const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>();
//   const { toast } = useToast();

//   useEffect(() => {
//     loadAttendanceRecords();
//   }, [selectedDate]);

//   const loadAttendanceRecords = async () => {
//     setIsLoading(true);
//     try {
//       const startDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined;
//       const endDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') + 'T23:59:59' : undefined;
      
//       const { data, error } = await voiceService.getAttendanceRecords(startDate, endDate);
//       if (error) throw error;
//       setAttendanceRecords(data || []);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to load attendance records",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const mockAttendance = async () => {
//     try {
//       const mockRecord: AttendanceRecord = {
//         voice_profile_id: 'demo-profile-1',
//         timestamp: new Date().toISOString(),
//         location: 'Main Office',
//         confidence: 94,
//         verified: true
//       };

//       const { error } = await voiceService.recordAttendance(mockRecord);
//       if (error) throw error;

//       toast({
//         title: "Success",
//         description: "Mock attendance recorded successfully"
//       });
      
//       loadAttendanceRecords();
//     } catch (error) {
//       toast({
//         title: "Error", 
//         description: "Failed to record attendance",
//         variant: "destructive"
//       });
//     }
//   };

//   const exportAttendance = () => {
//     const headers = ['Name', 'Department', 'Time', 'Location', 'Confidence', 'Verified'];
//     const csvContent = [
//       headers.join(','),
//       ...attendanceRecords.map(record => [
//         record.voice_profiles?.name || 'Unknown',
//         record.voice_profiles?.department || 'N/A',
//         format(new Date(record.timestamp), 'yyyy-MM-dd HH:mm:ss'),
//         record.location,
//         `${record.confidence}%`,
//         record.verified ? 'Yes' : 'No'
//       ].join(','))
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `attendance_${selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'all'}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const getConfidenceBadge = (confidence: number) => {
//     if (confidence >= 90) return <Badge className="bg-pt-success">High</Badge>;
//     if (confidence >= 75) return <Badge variant="secondary">Medium</Badge>;
//     return <Badge variant="destructive">Low</Badge>;
//   };

//   const getTodayStats = () => {
//     const today = format(new Date(), 'yyyy-MM-dd');
//     const todayRecords = attendanceRecords.filter(record => 
//       record.timestamp.startsWith(today)
//     );

//     return {
//       total: todayRecords.length,
//       verified: todayRecords.filter(r => r.verified).length,
//       avgConfidence: todayRecords.length > 0 
//         ? Math.round(todayRecords.reduce((sum, r) => sum + r.confidence, 0) / todayRecords.length)
//         : 0
//     };
//   };

//   const stats = getTodayStats();

//   return (
//     <div className="space-y-6">
//       {/* Your UI code remains same */}
//       {/* (Keeping the JSX exactly as you wrote it) */}
//     </div>
//   );
// };

// export default AttendanceTracker;