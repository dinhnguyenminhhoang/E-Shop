export interface supplierType {
    name: string;
    email: string;
    phoneNumber: string;
    address: {
        specificAddress: string;
        wards: string;
        districts: string;
        province: string;
    };
}
