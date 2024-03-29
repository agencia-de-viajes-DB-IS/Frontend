export interface tpResponse {
    success: boolean,
    error: unknown,
    data: unknown,
    dataType: string,
    errorMessage: string
}
export interface tpUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
export interface Login {
    $id: string,
    email: string,
    token: string,
}
export interface Register {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
export interface UsersGet {
    firstName: string,
    lastName: string,
    email: string,
    id: number
}

export interface AgencyGet {
    id: number,
    name: string,
    address: string,
    faxNumber: string,
    email: string
}
// cositas locas del backend
export interface RecivedExcursions {
    $id:string,
    $values:tpExcursion[]
}
export interface RecivedPackages {
    $id:string,
    $values:tpPackage[]
}

// ************ Entities *****************

export interface tpAgency {
    id: number,
    name: string,
    address: string,
    faxNumber: string,
    email: string
}
export interface tpFacility {
    id: number,
    name: string,
    description: string
}
export interface tpPackage {
    description: string
    price: number,
    arrivalDate: string,
    departureDate: string,
    facilityIds: tpFacility[],
    extendedExcursionIds: tpExcursion[]
}
export interface tpExcursion {
    id: string,
    location: string,
    price: number,
    arrivalDate: string,
    agency:tpAgency
}
export interface tpHotelDeals {
    id: string,
    hotelId: string,
    description: string,
    price: number,
    arrivalDate: string,
    departureDate: string
}

// ================ TURISTAS ==================

export interface tpTourist {
    firstname: string,
    lastname: string,
    nacionality: string,
    ci: string
}


export interface Main {
    $id:     string;
    $values: Value[];
}

export interface Value {
    $id:         string;
    location:    string;
    price:       number;
    arrivalDate: Date;
    agency:      Agency;
}

export interface Agency {
    $id:       string;
    name:      Name;
    address:   Address;
    faxNumber: number;
    email:     Email;
}

export enum Address {
    BaracoaGuantánamo = "Baracoa, Guantánamo",
    PlayaHabana = "Playa, Habana",
    VaraderoMatanzas = "Varadero, Matanzas",
    VedadoHabana = "Vedado, Habana",
    ViñalesPinarDelRío = "Viñales, Pinar del Río",
}

export enum Email {
    CaribeGmailCOM = "caribe@gmail.com",
    CubaWildGmailCOM = "cubaWild@gmail.com",
    EastHeightsGmailCOM = "eastHeights@gmail.com",
    LlaveGmailCOM = "llave@gmail.com",
    ParadiseGmailCOM = "paradise@gmail.com",
    VerdeCubaGmailCOM = "verdeCuba@gmail.com",
}

export enum Name {
    CaribeResorts = "Caribe Resorts",
    CubaVerde = "Cuba Verde",
    EastHeights = "East Heights",
    GreenParadise = "Green Paradise",
    LlaveDelGolfo = "Llave del Golfo",
    WildCuba = "Wild Cuba",
}
