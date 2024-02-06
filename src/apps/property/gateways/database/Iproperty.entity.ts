interface IProperty {
  _id?: string;
  property: PropertyInformations;
  checkIn: Date;
  checkOut: Date;
  residents: Resident[];
}

interface PropertyInformations {
  _id: string;
  name: string;
}

interface Resident {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

export { IProperty, PropertyInformations, Resident };
