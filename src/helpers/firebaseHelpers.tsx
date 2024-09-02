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
  id: string,
  date: string,
  driverName: string,
  towar: boolean
): Promise<Item> => {
  try {
    const newDocRef = doc(collection(db, 'kierowcy'));
    const newDriver = {
      id,
      name: driverName,
      towar,
    };
    const newItem: Item = {
      id: newDocRef.id,
      drivers: [newDriver],
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
  id: string,
  documentId: string,
  driverName: string,
  towar: boolean
): Promise<void> => {
  try {
    const docRef = doc(db, 'kierowcy', documentId);
    const newDriver = {
      id,
      name: driverName,
      towar,
    };
    await updateDoc(docRef, {
      drivers: arrayUnion(newDriver),
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
  driverId: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'kierowcy', documentId);
    await updateDoc(docRef, {
      drivers: arrayRemove(driverId),
    });
  } catch (error) {
    console.error('Error removing name from document:', error);
    throw new Error('Failed to remove driver name.');
  }
};
