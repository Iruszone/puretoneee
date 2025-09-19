let profiles: any[] = [];
let attendanceRecords: any[] = [];

export const voiceService = {
  getVoiceProfiles: async () => {
    return { data: profiles, error: null };
  },
  createVoiceProfile: async (profile: any) => {
    const newProfile = { ...profile, id: (profiles.length + 1).toString() };
    profiles.push(newProfile);
    return { data: newProfile, error: null };
  },
  getAttendanceRecords: async () => {
    return { data: attendanceRecords, error: null };
  },
  recordAttendance: async (record: any) => {
    const newRecord = { ...record, id: (attendanceRecords.length + 1).toString() };
    attendanceRecords.push(newRecord);
    return { error: null };
  }
};