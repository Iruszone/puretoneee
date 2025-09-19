import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, UserCheck, AlertTriangle, Download } from 'lucide-react';
import { voiceService } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

// Type for attendance record
interface AttendanceRecord {
  id: string;
  voice_profiles?: {
    name?: string;
    department?: string;
  };
  timestamp: string;
  location: string;
  confidence: number;
  verified: boolean;
}

const AttendanceTracker: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    loadAttendanceRecords();
    // eslint-disable-next-line
  }, [selectedDate]);

  const loadAttendanceRecords = async () => {
    setIsLoading(true);
    try {
      const startDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined;
      const endDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') + 'T23:59:59' : undefined;
      const { data, error } = await voiceService.getAttendanceRecords();
      if (error) throw error;
      setAttendanceRecords(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load attendance records",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const mockAttendance = async () => {
    try {
      const mockRecord = {
        voice_profile_id: 'demo-profile-1',
        timestamp: new Date().toISOString(),
        location: 'Main Office',
        confidence: 94,
        verified: true
      };
      const { error } = await voiceService.recordAttendance(mockRecord);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Mock attendance recorded successfully"
      });
      loadAttendanceRecords();
    } catch (error: any) {
      toast({
        title: "Error", 
        description: "Failed to record attendance",
        variant: "destructive"
      });
    }
  };

  const exportAttendance = () => {
    const headers = ['Name', 'Department', 'Time', 'Location', 'Confidence', 'Verified'];
    const csvContent = [
      headers.join(','),
      ...attendanceRecords.map(record => [
        record.voice_profiles?.name || 'Unknown',
        record.voice_profiles?.department || 'N/A',
        format(new Date(record.timestamp), 'yyyy-MM-dd HH:mm:ss'),
        record.location,
        `${record.confidence}%`,
        record.verified ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'all'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return <Badge className="bg-pt-success">High</Badge>;
    if (confidence >= 75) return <Badge variant="secondary">Medium</Badge>;
    return <Badge variant="destructive">Low</Badge>;
  };

  const getTodayStats = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayRecords = attendanceRecords.filter(record => 
      record.timestamp.startsWith(today)
    );
    return {
      total: todayRecords.length,
      verified: todayRecords.filter(r => r.verified).length,
      avgConfidence: todayRecords.length > 0 
        ? Math.round(todayRecords.reduce((sum, r) => sum + r.confidence, 0) / todayRecords.length)
        : 0
    };
  };

  const stats = getTodayStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Attendance Tracking</h2>
          <p className="text-muted-foreground">Voice-based attendance monitoring and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button onClick={exportAttendance} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={mockAttendance} className="bg-pt-purple hover:bg-pt-purple/90">
            <UserCheck className="h-4 w-4 mr-2" />
            Demo Record
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
            <UserCheck className="h-4 w-4 text-pt-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pt-purple">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.verified} verified entries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
            <AlertTriangle className="h-4 w-4 text-pt-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pt-teal">{stats.avgConfidence}%</div>
            <p className="text-xs text-muted-foreground">
              Voice recognition accuracy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Clock className="h-4 w-4 text-pt-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pt-blue">Online</div>
            <p className="text-xs text-muted-foreground">
              Real-time monitoring active
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>
            {selectedDate 
              ? `Showing records for ${format(selectedDate, "PPP")}`
              : "Showing all recent attendance records"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin h-8 w-8 border-b-2 border-pt-purple rounded-full"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.length > 0 ? attendanceRecords.map(record => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.voice_profiles?.name || 'Unknown User'}
                    </TableCell>
                    <TableCell>{record.voice_profiles?.department || 'N/A'}</TableCell>
                    <TableCell>
                      {format(new Date(record.timestamp), 'HH:mm:ss')}
                    </TableCell>
                    <TableCell>{record.location}</TableCell>
                    <TableCell>{getConfidenceBadge(record.confidence)}</TableCell>
                    <TableCell>
                      {record.verified ? (
                        <Badge className="bg-pt-success">Verified</Badge>
                      ) : (
                        <Badge variant="destructive">Failed</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No attendance records found
                      {selectedDate && (
                        <div className="mt-2">
                          <Button 
                            variant="link" 
                            onClick={() => setSelectedDate(undefined)}
                            className="text-pt-purple"
                          >
                            View all records
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceTracker;