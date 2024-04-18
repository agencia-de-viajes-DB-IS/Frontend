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
    password: string,
    id: string
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

// ************ Entities *****************

export interface tpAgency {
    id: string,
    name: string,
    address: string,
    faxNumber: number,
    email: string
}
export interface tpFacility {
    id: number,
    name: string,
    description: string
}
export interface tpPackage {
    code:string,
    description: string
    name:string,
    price: number,
    arrivalDate: string,
    departureDate: string,
    facilityIds: tpFacility[],
    extendedExcursionIds: tpExtendedExcursionGet[]
}
export interface tpExcursionGet {
    id: string,
    name: string,
    description: string,
    location: string,
    price: number,
    arrivalDate: string,
    agency:tpAgency,
    capacity:number
}
export interface tpExcursionPost {
    name: string,
    description: string,
    location: string,
    price: number,
    arrivalDate: string,
    agencyId:string,
    capacity:number
}
export interface tpExtendedExcursionGet {
    id:string,
    name: string,
    description: string,
    location: string,
    price: number,
    arrivalDate: string,
    departureDate: string,
    hotelDeals:tpHotelDealsShow[],
    agency:tpAgency,
    capacity:number
}
export interface tpExtendedExcursionPost {
    name: string,
    description: string,
    location: string,
    price: number,
    arrivalDate: string,
    departureDate: string,
    hotelDealsIDs:tpHotelDeals[],
    agencyId:string,
    capacity:number
}
export interface tpHotelDeals {
    name:string,
    id: string,
    hotelId: string,
    description: string,
    price: number,
    arrivalDate: string,
    departureDate: string,
    agencyRelatedHotelDeals:tpAgency[],
    capacity:number
}
export interface tpHotelDealsShow {
    name:string,
    id: string
}
export interface tpHotels {
    id:string,
    name:string,
    address: string,
    category: number,
    description: string
}
export interface tpAirlines {
    id: string,
    name:string
}

// ================ TURISTAS ==================

export interface tpTourist {
    userId: string,
    touristID: string,
    ci: string,
    firstName: string,
    lastName: string,
    nationality: string
}