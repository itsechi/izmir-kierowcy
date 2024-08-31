import React, { useEffect } from 'react';
import { Item } from '../types';

const useScrollToToday = (
  items: Item[],
  containerRef: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const todayDateString = new Date().toDateString();
    const todayItem = items.find((item) => item.date === todayDateString);
    if (todayItem) {
      const index = items.indexOf(todayItem);
      const itemElement = containerRef.current.children[
        index
      ] as HTMLDivElement;
      if (itemElement) {
        itemElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [items, containerRef]);
};

export default useScrollToToday;
