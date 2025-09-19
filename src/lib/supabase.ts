let profiles: any[] = [];

export const voiceService = {
  getVoiceProfiles: async () => {
    return { data: profiles, error: null };
  },
  createVoiceProfile: async (profile: any) => {
    const newProfile = { ...profile, id: (profiles.length + 1).toString() };
    profiles.push(newProfile);
    return { data: newProfile, error: null };
  },
};