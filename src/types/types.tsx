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