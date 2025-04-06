export interface Route{
    id: string;
    name: string;
    departure_location: Location;  // Changed from originStop
    arrival_location: Location;    // Changed from terminalStop
    total_duration: number;         // Total duration of the route
    total_price: number;           // Total price of the route
  }
  
export interface Location {
    id: string;
    name: string;
    city: string;
    country: string;
  }
  
  export interface Car {
    id: string;
    car_no: string;
    immatriculation_no: string;
    brand: string;
    model: string;
    type: string;
  }
  
  export interface Driver {
    id: string;
    fullname: string;
    nationality: string;
    dob: string | null;
    gender: string;
    phone_number: string;
    emergency_contact_name: string;
    emergency_contact_email: string | null;
    emergency_contact_phone_number: string | null;
  }
  
  export interface Trip {
    id: string;
    departure_time: string;
    arrival_time: string;
    price: number;
    route: Route;
    operator: null; // Assuming operator can be null
    car: Car;
    driver: Driver;
    trip_frequency: string;
  }
  
  export interface Operator{
    id:string;
    name:string;
    fullname:string;
    representative_name:string;
    representative_phone:string;
    support_phone:string;
  
  }

export interface Traveller{
  id:string;
  fullname:string;
  phone_number:string;
  email:string;
}