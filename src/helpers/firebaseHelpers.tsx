import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Item } from '../types';

export const addNewItem = async (
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
    throw new Error('Failed to add new driver.');
  }
};

export const updateItem = async (
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

export const deleteItem = async (documentId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'kierowcy', documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw new Error('Failed to delete document.');
  }
};

export const removeDriverNameFromItem = async (
  documentId: string,
  name: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'kierowcy', documentId);
    await updateDoc(docRef, {
      names: arrayRemove(name),
    });
  } catch (error) {
    console.error('Error removing name from document:', error);
    throw new Error('Failed to remove driver name.');
  }
};
