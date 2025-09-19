import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Users, Clock, Shield } from 'lucide-react';
import { voiceService } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

// Define type for a voice profile
interface VoiceProfile {
  id: string;
  name: string;
  department: string;
  user_id: string;
  voice_signature?: string;
  last_authenticated: string;
  is_active: boolean;
}

// Define type for new profile being created
interface NewProfile {
  name: string;
  department: string;
  user_id: string;
}

const VoiceProfileManager: React.FC = () => {
  const [profiles, setProfiles] = useState<VoiceProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newProfile, setNewProfile] = useState<NewProfile>({
    name: '',
    department: '',
    user_id: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const { data, error } = await voiceService.getVoiceProfiles();
      if (error) throw error;
      setProfiles((data as VoiceProfile[]) || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load voice profiles',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    if (!newProfile.name || !newProfile.department || !newProfile.user_id) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    setIsCreating(true);
    try {
      const profileData: Omit<VoiceProfile, 'id'> = {
        ...newProfile,
        voice_signature: JSON.stringify({}), // Placeholder
        last_authenticated: new Date().toISOString(),
        is_active: true
      };

      const { data, error } = await voiceService.createVoiceProfile(profileData);
      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Voice profile created successfully'
      });

      setNewProfile({ name: '', department: '', user_id: '' });
      loadProfiles();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create voice profile',
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const departments: string[] = [
    'Engineering',
    'Marketing',
    'Finance',
    'Human Resources',
    'Operations',
    'Sales',
    'Customer Support'
  ];

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-b-2 border-pt-purple rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading voice profiles...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // return (
  //   <div className="space-y-6">
  //     {/* Header with Add Profile button */}
  //     <div className="flex items-center justify-between">
  //       <div>
  //         <h2 className="text-2xl font-bold text-foreground">Voice Profile Management</h2>
  //         <p className="text-muted-foreground">Manage user voice profiles and authentication data</p>
  //       </div>

  //       <Dialog>
  //         <DialogTrigger asChild>
  //           <Button className="bg-pt-purple hover:bg-pt-purple/90">
  //             <UserPlus className="h-4 w-4 mr-2" />
  //             Add Profile
  //           </Button>
  //         </DialogTrigger>
  //         <DialogContent>
  //           <DialogHeader>
  //             <DialogTitle>Create New Voice Profile</DialogTitle>
  //             <DialogDescription>
  //               Add a new user voice profile for authentication and analysis
  //             </DialogDescription>
  //           </DialogHeader>
  //           <div className="space-y-4">
  //             <div>
  //               <Label htmlFor="name">Full Name</Label>
  //               <Input
  //                 id="name"
  //                 value={newProfile.name}
  //                 onChange={(e) => setNewProfile((prev) => ({ ...prev, name: e.target.value }))}
  //                 placeholder="John Doe"
  //               />
  //             </div>
  //             <div>
  //               <Label htmlFor="userId">User ID</Label>
  //               <Input
  //                 id="userId"
  //                 value={newProfile.user_id}
  //                 onChange={(e) => setNewProfile((prev) => ({ ...prev, user_id: e.target.value }))}
  //                 placeholder="john.doe@company.com"
  //               />
  //             </div>
  //             <div>
  //               <Label htmlFor="department">Department</Label>
  //               <Select
  //                 onValueChange={(value) =>
  //                   setNewProfile((prev) => ({ ...prev, department: value }))
  //                 }
  //               >
  //                 <SelectTrigger>
  //                   <SelectValue placeholder="Select department" />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   {departments.map((dept) => (
  //                     <SelectItem key={dept} value={dept}>
  //                       {dept}
  //                     </SelectItem>
  //                   ))}
  //                 </SelectContent>
  //               </Select>
  //             </div>
  //             <Button
  //               onClick={handleCreateProfile}
  //               disabled={isCreating}
  //               className="w-full bg-pt-purple hover:bg-pt-purple/90"
  //             >
  //               {isCreating ? 'Creating...' : 'Create Profile'}
  //             </Button>
  //           </div>
  //         </DialogContent>
  //       </Dialog>
  //     </div>

  //     {/* Profiles Grid */}
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //       {profiles.map((profile) => (
  //         <Card key={profile.id} className="hover:shadow-lg transition-shadow">
  //           <CardHeader>
  //             <CardTitle className="flex items-center justify-between">
  //               <span className="text-lg">{profile.name}</span>
  //               <Badge
  //                 variant={profile.is_active ? 'default' : 'secondary'}
  //                 className={profile.is_active ? 'bg-pt-success' : ''}
  //               >
  //                 {profile.is_active ? 'Active' : 'Inactive'}
  //               </Badge>
  //             </CardTitle>
  //             <CardDescription className="flex items-center">
  //               <Users className="h-4 w-4 mr-1" />
  //               {profile.department}
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <div className="space-y-2 text-sm">
  //               <div className="flex items-center text-muted-foreground">
  //                 <Shield className="h-4 w-4 mr-2" />
  //                 Voice ID: {profile.id.slice(0, 8)}...
  //               </div>
  //               <div className="flex items-center text-muted-foreground">
  //                 <Clock className="h-4 w-4 mr-2" />
  //                 Last: {new Date(profile.last_authenticated).toLocaleDateString()}
  //               </div>
  //             </div>
  //           </CardContent>
  //         </Card>
  //       ))}
  //     </div>

  //     {/* Empty state */}
  //     {profiles.length === 0 && (
  //       <Card>
  //         <CardContent className="flex flex-col items-center justify-center p-8">
  //           <Users className="h-12 w-12 text-muted-foreground mb-4" />
  //           <h3 className="text-lg font-semibold mb-2">No Voice Profiles</h3>
  //           <p className="text-muted-foreground text-center mb-4">
  //             Create your first voice profile to start using PureTone authentication
  //           </p>
  //         </CardContent>
  //       </Card>
  //     )}
  //   </div>
  // );
return (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-[800px] h-[550px] bg-white rounded-2xl shadow-lg p-6 overflow-y-auto space-y-6">
      {/* Header with Add Profile button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Voice Profile Management</h2>
          <p className="text-muted-foreground">Manage user voice profiles and authentication data</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-pt-purple hover:bg-pt-purple/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Profile
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Voice Profile</DialogTitle>
              <DialogDescription>
                Add a new user voice profile for authentication and analysis
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  value={newProfile.user_id}
                  onChange={(e) => setNewProfile((prev) => ({ ...prev, user_id: e.target.value }))}
                  placeholder="john.doe@company.com"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  onValueChange={(value) =>
                    setNewProfile((prev) => ({ ...prev, department: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCreateProfile}
                disabled={isCreating}
                className="w-full bg-pt-purple hover:bg-pt-purple/90"
              >
                {isCreating ? 'Creating...' : 'Create Profile'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 gap-6">
        {profiles.map((profile) => (
          <Card key={profile.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{profile.name}</span>
                <Badge
                  variant={profile.is_active ? 'default' : 'secondary'}
                  className={profile.is_active ? 'bg-pt-success' : ''}
                >
                  {profile.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </CardTitle>
              <CardDescription className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {profile.department}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Shield className="h-4 w-4 mr-2" />
                  Voice ID: {profile.id.slice(0, 8)}...
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  Last: {new Date(profile.last_authenticated).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {profiles.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Voice Profiles</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first voice profile to start using PureTone authentication
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  </div>
);


};

export default VoiceProfileManager;
