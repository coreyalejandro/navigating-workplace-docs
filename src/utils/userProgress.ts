import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const saveUserProgress = async (userId: string, progress: any) => {
  try {
    await setDoc(doc(db, 'userProgress', userId), progress);
    console.log('Progress saved successfully');
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const getUserProgress = async (userId: string) => {
  try {
    const docRef = doc(db, 'userProgress', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No progress found for user');
      return null;
    }
  } catch (error) {
    console.error('Error getting progress:', error);
    return null;
  }
};