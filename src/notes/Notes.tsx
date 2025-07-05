import React from "react";

export function Notes() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <p className="text-lg">Team notes and important information will be displayed here.</p>
      </div>
    </div>
  );
}

export default Notes;