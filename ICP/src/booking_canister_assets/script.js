import { Actor, HttpAgent } from "@dfinity/agent";

// Initialize agent with CORS fix
// In your HTML/JS code
const agent = new HttpAgent({ 
  host: "https://ic0.app" // Change this for mainnet
});

// Replace with YOUR_CANISTER_ID (bkyz2-fmaaa-aaaaa-qaaaq-cai)
const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

// Actor setup
const bookingCanister = Actor.createActor(
  ({ IDL }) => ({
    bookWarehouse: IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    getBookings: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Record({
      farmerId: IDL.Text,
      warehouseId: IDL.Text,
      date: IDL.Text
    })))], ['query']),
  }),
  { agent, canisterId }
);

// Attach functions to window for HTML buttons
window.bookWarehouse = async () => {
  try {
    const farmerId = document.getElementById("farmerId").value;
    const warehouseId = document.getElementById("warehouseId").value;
    const date = document.getElementById("date").value;
    
    const result = await bookingCanister.bookWarehouse(farmerId, warehouseId, date);
    alert("ICP Transaction: " + result);
    console.log("Booking successful:", result);
  } catch (error) {
    console.error("Booking failed:", error);
    alert("Error! Check console.");
  }
};

window.fetchBookings = async () => {
  try {
    const bookings = await bookingCanister.getBookings();
    document.getElementById("bookings").innerHTML = 
      `<pre>${JSON.stringify(bookings, null, 2)}</pre>`;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
};