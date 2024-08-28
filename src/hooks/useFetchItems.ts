import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Item } from '../types';

const useFetchItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems: Item[] = [];
        const querySnapshot = await getDocs(collection(db, 'kierowcy'));
        querySnapshot.forEach((doc) => {
          const item = doc.data() as Item;
          fetchedItems.push(item);
        });
        const sortedItems = fetchedItems.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        setItems(sortedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return { items, setItems };
};

export default useFetchItems;
