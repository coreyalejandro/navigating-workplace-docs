import { auth, db } from '../utils/firebase';
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
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Authentication Tests
async function testAuthentication() {
  const testEmail = 'test@example.com';
  const testPassword = 'testPassword123';

  try {
    // Test Sign Up
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    console.log('Sign up successful:', userCredential.user.uid);

    // Test Sign In
    await signOut(auth); // Sign out first to test sign in
    const signInCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
    console.log('Sign in successful:', signInCredential.user.uid);

    // Test Sign Out
    await signOut(auth);
    console.log('Sign out successful');
  } catch (error) {
    console.error('Authentication test error:', error);
  }
}

// Firestore Tests
async function testFirestore() {
  try {
    // Test Adding a Document
    const docRef = await addDoc(collection(db, 'tests'), {
      name: 'Test User',
      email: 'test@example.com'
    });
    console.log('Document added with ID:', docRef.id);

    // Test Reading a Document
    const docSnap = await getDoc(doc(db, 'tests', docRef.id));
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      console.log('No such document!');
    }

    // Test Updating a Document
    await updateDoc(doc(db, 'tests', docRef.id), {
      name: 'Updated Test User'
    });
    console.log('Document updated successfully');

    // Test Deleting a Document
    await deleteDoc(doc(db, 'tests', docRef.id));
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Firestore test error:', error);
  }
}

// Storage Tests
async function testStorage() {
  const fileName = 'test.txt';
  const fileContent = 'This is a test file';

  try {
    // Test File Upload
    const storageRef = ref(getStorage(), fileName);
    const snapshot = await uploadBytes(storageRef, new Blob([fileContent]));
    console.log('File uploaded successfully');

    // Test File Download
    const url = await getDownloadURL(snapshot.ref);
    console.log('File download URL:', url);

    // Test File Deletion
    await deleteObject(snapshot.ref);
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Storage test error:', error);
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting Firebase Integration Tests');
  await testAuthentication();
  await testFirestore();
  await testStorage();
  console.log('All tests completed');
}

runAllTests();