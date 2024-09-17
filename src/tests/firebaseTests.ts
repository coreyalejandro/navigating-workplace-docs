import { auth, db, storage } from '../utils/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

async function testAuthentication() {
  const testEmail = 'test@example.com';
  const testPassword = 'testPassword123';

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    console.log('Sign up successful:', userCredential.user.uid);

    await signOut(auth);
    const signInCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
    console.log('Sign in successful:', signInCredential.user.uid);

    await signOut(auth);
    console.log('Sign out successful');
  } catch (error) {
    console.error('Authentication test error:', error);
  }
}

async function testFirestore() {
  try {
    const docRef = await addDoc(collection(db, 'tests'), {
      name: 'Test User',
      email: 'test@example.com'
    });
    console.log('Document added with ID:', docRef.id);

    const docSnap = await getDoc(doc(db, 'tests', docRef.id));
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      console.log('No such document!');
    }

    await updateDoc(doc(db, 'tests', docRef.id), {
      name: 'Updated Test User'
    });
    console.log('Document updated successfully');

    await deleteDoc(doc(db, 'tests', docRef.id));
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Firestore test error:', error);
  }
}

async function testStorage() {
  const fileName = 'test.txt';
  const fileContent = 'This is a test file';

  try {
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, new Blob([fileContent]));
    console.log('File uploaded successfully');

    const url = await getDownloadURL(snapshot.ref);
    console.log('File download URL:', url);

    await deleteObject(snapshot.ref);
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Storage test error:', error);
  }
}

async function runAllTests() {
  console.log('Starting Firebase Integration Tests');
  await testAuthentication();
  await testFirestore();
  await testStorage();
  console.log('All tests completed');
}

runAllTests();