
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
    departure_location: Location;
    arrival_location: Location;
    operator: null; 
    number_of_seats:number;
    car: Car;
    driver: Driver;
  }
  