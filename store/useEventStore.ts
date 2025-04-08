// store/useEventStore.ts
import { create } from "zustand";

type Event = {
  id: string;
  title: string;
  description: string;
  image: string; // URI string
};

type EventState = {
  events: Event[];
  addEvent: (event: Event) => void;
};

export const useEventStore = create<EventState>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),
}));
