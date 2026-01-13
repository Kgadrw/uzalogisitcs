export interface ShipmentCosts {
  transportFee: number;
  storageFee: number;
  handlingFee: number;
  total: number;
}

export function calculateShipmentCost(
  weight: number,
  volume: number,
  pricePerCBM: number
): ShipmentCosts {
  // Transport fee: $0.5 per kg
  const transportFee = weight * 0.5;
  
  // Storage fee: volume * price per CBM
  const storageFee = volume * pricePerCBM;
  
  // Fixed handling fee
  const handlingFee = 50;
  
  const total = transportFee + storageFee + handlingFee;
  
  return {
    transportFee,
    storageFee,
    handlingFee,
    total,
  };
}

export function calculateFinalCost(
  actualWeight: number,
  actualVolume: number,
  pricePerCBM: number
): ShipmentCosts {
  return calculateShipmentCost(actualWeight, actualVolume, pricePerCBM);
}
