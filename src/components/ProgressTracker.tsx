'use client';

import React from 'react';

interface ProgressTrackerProps {
  totalChallenges: number;
  completedChallenges: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ totalChallenges, completedChallenges }) => {
  const progress = (completedChallenges / totalChallenges) * 100;
  const widthClass = `w-[${progress}%]`;

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700 dark:text-white">Progress</span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">{completedChallenges}/{totalChallenges}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className={`bg-blue-600 h-2.5 rounded-full ${widthClass}`}></div>
      </div>
    </div>
  );
};

export default ProgressTracker;