import { createContext, useState, type ReactNode } from "react";

export interface BookingData {
  checkin: string;
  checkout: string;
  guests: number;
}

interface BookingContextType {
  booking: BookingData;
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>;
}

export const BookingContext = createContext<BookingContextType | null>(null);

interface BookingProviderProps {
  children: ReactNode;
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [booking, setBooking] = useState<BookingData>({
    checkin: "",
    checkout: "",
    guests: 1,
  });

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
