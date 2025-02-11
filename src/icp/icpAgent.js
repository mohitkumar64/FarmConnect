// src/icp/icpAgent.js

import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './booking_canister_backend/booking_canister_backend.did.js'; // Adjust the path if necessary

// Use the environment variable for the canister ID
const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID;

// Initialize the agent for the Internet Computer mainnet
const agent = new HttpAgent({ host: 'https://ic0.app' }); // or 'https://icp0.io'

// Do NOT include agent.fetchRootKey() in production

// Create an actor to interact with the canister
const icpActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export default icpActor;
