import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";

interface Team {
  id: number;
  name: string;
  // Add other team properties as needed
}

export function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getAccessToken } = useAuth();

  useEffect(() => {
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

    fetchTeams();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teams</h2>
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
              <div key={team.id} className="p-4 border rounded-md">
                <h3 className="text-xl font-medium">{team.name}</h3>
                {/* Add more team details here as needed */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
