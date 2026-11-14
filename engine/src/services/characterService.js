import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  getDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export async function saveCharacter(userId, characterData, characterId = null) {
  if (!userId) throw new Error("Must be logged in to save character");
  
  const charCollection = collection(db, 'users', userId, 'characters');
  const docRef = characterId ? doc(charCollection, characterId) : doc(charCollection);
  
  const payload = {
    ...characterData,
    id: docRef.id,
    updatedAt: serverTimestamp(),
  };

  if (!characterId) {
    payload.createdAt = serverTimestamp();
  }

  // Add timeout protection so calls don't hang indefinitely if Firestore is not created or network is blocked
  const savePromise = setDoc(docRef, payload, { merge: true });
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Database operation timed out. Please ensure Cloud Firestore is enabled in your Firebase Console.")), 10000)
  );

  await Promise.race([savePromise, timeoutPromise]);
  return docRef.id;
}

export async function getCharacters(userId) {
  if (!userId) return [];
  const charCollection = collection(db, 'users', userId, 'characters');
  const q = query(charCollection, orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function deleteCharacter(userId, characterId) {
  if (!userId || !characterId) return;
  const docRef = doc(db, 'users', userId, 'characters', characterId);
  await deleteDoc(docRef);
}

