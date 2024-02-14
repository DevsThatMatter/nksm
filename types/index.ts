export enum ConditionEnum {
  'Brand New',
  'Like New',
  'Used',
}

interface userDetails {
  First_Name: string;
  Last_Name: string;
  Phone_Number: string;
  id: string;
}

export interface chatDetails {
  productDetails: IProduct;
  sellerDetails: userDetails;
  buyerDetails: userDetails;
}

export interface MessageTypes {
  Sender: string;
  Message: string;
  Timestamp?: string;
}

export interface SellerBuyerChatType {
  Seller: string;
  Buyer: string;
  ProductId: string;
  Messages: Array<MessageTypes>;
}
