import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getDocument, WorkplaceDocument } from '../../../utils/documents';
import { saveUserProgress, getUserProgress } from '../../../utils/userProgress';
import { initializeReview, updateReview } from '../../../utils/spacedRepetition';
import { useAuth } from '../../../components/AuthProvider';
import DocumentViewer from '../../../components/DocumentViewer';
import Timer from '../../../components/Timer';

export default function ChallengePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [document, setDocument] = useState<WorkplaceDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const [challengeComplete, setChallengeComplete] = useState(false);
  const maxTime = 300; // 5 minutes

  useEffect(() => {
    const fetchDocument = async () => {
      if (!id || typeof id !== 'string') return;
      try {
        const doc = await getDocument(id);
        setDocument(doc);
        
        if (user) {
          const progress = await getUserProgress(user.uid);
          if (progress && id in progress) {
            setChallengeComplete(true);
          } else {
            // Initialize review for new documents
            await initializeReview(user.uid, id);
          }
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [id, user]);

  const calculateScore = (timeSpent: number, maxTime: number): number => {
    // Calculate score based on time spent
    // Higher score for faster completion
    const baseScore = 1000;
    const timeRatio = 1 - (timeSpent / maxTime);
    return Math.round(baseScore * timeRatio);
  };

  const handleTimerEnd = async () => {
    if (user && document) {
      const score = calculateScore(timeSpent, maxTime);
      await saveUserProgress(user.uid, {
        documentId: document.id,
        timeSpent,
        score
      });
      
      // Update review based on performance
      const performance = Math.min(5, Math.max(0, Math.round(score / 200))); // Convert score to 0-5 scale
      await updateReview(user.uid, document.id, performance);
      
      setChallengeComplete(true);
    }
  };

  const handleTimerTick = (time: number) => {
    setTimeSpent(time);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{document.title}</h1>
      {!challengeComplete && (
        <Timer initialTime={maxTime} onEnd={handleTimerEnd} onTick={handleTimerTick} />
      )}
      <DocumentViewer document={document} />
      {challengeComplete && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <p className="font-bold">Challenge Complete!</p>
          <p>Time spent: {timeSpent} seconds</p>
          <p>Score: {calculateScore(timeSpent, maxTime)}</p>
        </div>
      )}
    </div>
  );
}