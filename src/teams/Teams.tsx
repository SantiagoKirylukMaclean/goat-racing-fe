import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface Team {
  id: number;
  name: string;
  motor: string;
  imagePath?: string;
  // Add other team properties as needed
}

interface TeamRequest {
  name: string;
  motor: string;
  imagePath?: string;
}

export function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getAccessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<TeamRequest>({ name: "", motor: "", imagePath: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    // Use AbortController to handle cancellation of fetch requests
    const abortController = new AbortController();

    // Create a function that uses the abort signal
    const fetchTeamsWithAbort = async () => {
      try {
        setLoading(true);
        const accessToken = getAccessToken();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        // Add Authorization header if token exists
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/teams`, {
          method: 'GET',
          headers,
          credentials: 'include',
          signal: abortController.signal, // Add the abort signal
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch teams: ${response.status}`);
        }

        const data = await response.json();
        setTeams(data);
      } catch (err) {
        // Only set error if it's not an abort error
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'An unknown error occurred');
          console.error('Error fetching teams:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchTeamsWithAbort();

    // Cleanup function to abort any in-flight requests when the component unmounts
    // or when the effect runs again
    return () => {
      abortController.abort();
    };
  }, []);

  // This function is now only used in handleSubmit
  async function fetchTeams() {
    try {
      setLoading(true);
      const accessToken = getAccessToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add Authorization header if token exists
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/teams`, {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch teams: ${response.status}`);
      }

      const data = await response.json();
      setTeams(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching teams:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpen = () => {
    setForm({ name: "", motor: "", imagePath: "" });
    setImageFile(null);
    setImagePreview("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ name: "", motor: "", imagePath: "" });
    setImageFile(null);
    setImagePreview("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const accessToken = getAccessToken();

      // Create FormData for multipart request
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('motor', form.motor);

      // Add image file if one was selected
      if (imageFile) {
        formData.append('image', imageFile);
      }

      // Set headers for multipart request
      const headers: Record<string, string> = {};

      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      // Send multipart request to backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/teams`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to create team: ${response.status}`);
      }

      // Refresh teams list
      await fetchTeams();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error creating team:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Teams</h2>
        <Button onClick={handleOpen}>
          <Plus className="mr-2 h-4 w-4" /> New Team
        </Button>
      </div>
      <div className="bg-card p-6 rounded-lg shadow-sm">
        {loading ? (
          <p className="text-lg">Loading teams...</p>
        ) : error ? (
          <p className="text-lg text-red-500">Error: {error}</p>
        ) : teams.length === 0 ? (
          <p className="text-lg">No teams found.</p>
        ) : (
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="p-4 border rounded-md flex items-center">
                {team.imagePath && (
                  <img 
                    src={team.imagePath} 
                    alt={team.name} 
                    className="h-12 w-20 object-contain mr-4" 
                  />
                )}
                <div>
                  <h3 className="text-xl font-medium">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">Motor: {team.motor}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Team</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Team Name
              </label>
              <Input 
                id="name"
                name="name" 
                placeholder="Team Name" 
                value={form.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="motor" className="text-sm font-medium">
                Motor
              </label>
              <Input 
                id="motor"
                name="motor" 
                placeholder="Motor" 
                value={form.motor} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Team Image
              </label>
              <Input 
                id="image"
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
              {imagePreview && (
                <div className="mt-2">
                  <p className="text-sm mb-1">Preview:</p>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-16 w-28 object-contain border rounded-md p-1" 
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Create Team
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Teams;
