import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor BookingCanister {
  type Booking = {
    farmerId: Text;
    warehouseId: Text;
    date: Text;
  };

  // Store warehouse details (ID -> details)
  let warehouses = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);

  // Store bookings (Booking ID -> Booking)
  var bookings = HashMap.HashMap<Text, Booking>(0, Text.equal, Text.hash);

  // Add warehouse (callable by warehouse owners)
  public shared func addWarehouse(id: Text, details: Text) : async Text {
    warehouses.put(id, details);
    "Warehouse added!";
  };

  // Book a warehouse slot (callable by farmers)
  public shared func bookWarehouse(farmerId: Text, warehouseId: Text, date: Text) : async Text {
    let bookingId = Text.concat(farmerId, "-" # warehouseId # "-" # date);
    bookings.put(bookingId, { farmerId; warehouseId; date });
    "Booking confirmed!";
  };

  // Get all bookings (for demo)
  public query func getBookings() : async [(Text, Booking)] {
    Iter.toArray(bookings.entries());
  };
};
