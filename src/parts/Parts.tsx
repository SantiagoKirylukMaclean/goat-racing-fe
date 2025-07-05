import React from "react";

export function Parts() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Parts List</h1>
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <p className="text-lg">Inventory of parts and components will be displayed here.</p>
      </div>
    </div>
  );
}

export default Parts;