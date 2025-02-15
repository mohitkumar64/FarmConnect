import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Booking {
  'farmerId' : string,
  'warehouseId' : string,
  'date' : string,
}
export interface _SERVICE {
  'addWarehouse' : ActorMethod<[string, string], string>,
  'bookWarehouse' : ActorMethod<[string, string, string], string>,
  'getBookings' : ActorMethod<[], Array<[string, Booking]>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
