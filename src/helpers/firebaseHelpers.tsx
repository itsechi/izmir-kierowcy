import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Item } from '../types';

export const updateDriverName = async (
  documentId: string,
  driverName: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'kierowcy', documentId);
    await updateDoc(docRef, {
      names: arrayUnion(driverName),
    });
  } catch (error) {
    console.error('Error updating document:', error);
    throw new Error('Failed to update driver name.');
  }
};

export const addNewDriverEntry = async (
  date: string,
  driverName: string
): Promise<Item> => {
  try {
    const newDocRef = doc(collection(db, 'kierowcy'));
    const newItem: Item = {
      id: newDocRef.id,
      names: [driverName],
      date,
    };
    await setDoc(newDocRef, newItem);
    return newItem;
  } catch (error) {
    console.error('Error creating new document:', error);
    throw new Error('Failed to add new driver entry.');
  }
};
