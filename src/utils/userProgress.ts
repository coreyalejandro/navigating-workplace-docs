import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserProgress {
  completedChallenges: number;
  totalChallenges: number;
}

export const saveUserProgress = async (userId: string, progress: UserProgress): Promise<void> => {
  try {
    await setDoc(doc(db, 'userProgress', userId), progress);
    console.log('Progress saved successfully');
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const getUserProgress = async (userId: string): Promise<UserProgress | null> => {
  try {
    const docRef = doc(db, 'userProgress', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (isUserProgress(data)) {
        return data;
      } else {
        console.log('Invalid progress data structure');
        return null;
      }
    } else {
      console.log('No progress found for user');
      return null;
    }
  } catch (error) {
    console.error('Error getting progress:', error);
    return null;
  }
};

function isUserProgress(data: unknown): data is UserProgress {
  return (
    typeof data === 'object' &&
    data !== null &&
    'completedChallenges' in data &&
    'totalChallenges' in data &&
    typeof (data as UserProgress).completedChallenges === 'number' &&
    typeof (data as UserProgress).totalChallenges === 'number'
  );
}