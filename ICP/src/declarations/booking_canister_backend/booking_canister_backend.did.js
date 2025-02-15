export const idlFactory = ({ IDL }) => {
  const Booking = IDL.Record({
    'farmerId' : IDL.Text,
    'warehouseId' : IDL.Text,
    'date' : IDL.Text,
  });
  return IDL.Service({
    'addWarehouse' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'bookWarehouse' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    'getBookings' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Booking))],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
