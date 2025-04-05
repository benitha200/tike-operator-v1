export interface Location {
  id: string;
  name: string;
  city: string;
  country: string;
}

export interface RouteStop {
  id: string;
  routeId: string;       // Route ID should be a string (UUID)
  stopName: string;      // Stop name instead of stop object
  stopOrder: number;
  duration: number;      // Duration from the previous stop
  price: number;         // Price of the stop
}

export interface Route {
  id: string;
  name: string;
  departure_location: Location;  // Changed from originStop
  arrival_location: Location;    // Changed from terminalStop
  routeStops: RouteStop[];       // RouteStops remain unchanged
  total_duration: number;         // Total duration of the route
  total_price: number;           // Total price of the route
}
