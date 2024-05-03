// EducationRow.tsx
import React from "react";

interface EducationRowProps {
  school: string;
  degree: string;
  city: string;
  onDelete: () => void;
}

const EducationRow: React.FC<EducationRowProps> = ({
  school,
  degree,
  city,
  onDelete,
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div>
        <p>{school}</p>
        <p>{degree}</p>
        <p>{city}</p>
      </div>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        Delete
      </button>
    </div>
  );
};

export default EducationRow;
