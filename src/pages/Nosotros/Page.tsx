// src/pages/Nosotros/Page.tsx
import React from 'react';

const NosotrosPage: React.FC = () => {
  return (
    <div>
      <h1>Nosotros</h1>
      <table>
        <tbody>
          {[...Array(39)].map((_, index) => (
            <tr key={index}>
              <td>Fila {index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NosotrosPage;
