export interface ScoreInput {
  phoneMaxWattage: number;
  phoneConnector: string;
  productWattage: number;
  productConnector: string;
  batteryCapacityMah?: number;
}

export interface ChargeEstimate {
  to80Minutes: number;
  fullMinutes: number;
}

export interface ScoreResult extends ChargeEstimate {
  score: number;
}

/**
 * Approximates how well a charger suits a phone: connector mismatch is the
 * dominant penalty (cable physically won't fit / needs an adapter), wattage
 * shortfall is penalized proportionally since GaN chargers cap output safely
 * rather than overcharging, so exceeding the phone's max draw is never punished.
 */
export function scoreCompatibility({
  phoneMaxWattage,
  phoneConnector,
  productWattage,
  productConnector,
  batteryCapacityMah,
}: ScoreInput): ScoreResult {
  let score = 100;

  const connectorMatches = phoneConnector.toLowerCase() === productConnector.toLowerCase();
  if (!connectorMatches) score -= 45;

  if (productWattage < phoneMaxWattage) {
    const shortfall = (phoneMaxWattage - productWattage) / phoneMaxWattage;
    score -= Math.round(shortfall * 40);
  }

  score = Math.max(5, Math.min(100, score));

  const effectiveWattage = Math.min(productWattage, phoneMaxWattage);
  const estimate = estimateChargeTime(effectiveWattage, batteryCapacityMah ?? 4500);

  return { score, ...estimate };
}

/**
 * 0-80% charges near the rated wattage; 80-100% trickles down to protect the
 * cell, so it takes disproportionately longer per percentage point.
 */
export function estimateChargeTime(effectiveWattage: number, batteryCapacityMah: number): ChargeEstimate {
  const nominalVoltage = 3.85;
  const capacityWh = (batteryCapacityMah / 1000) * nominalVoltage;
  const chargeEfficiency = 0.82;

  const hoursTo80 = (capacityWh * 0.8) / (effectiveWattage * chargeEfficiency);
  const hoursTrickle = (capacityWh * 0.2) / (effectiveWattage * chargeEfficiency * 0.35);

  return {
    to80Minutes: Math.round(hoursTo80 * 60),
    fullMinutes: Math.round((hoursTo80 + hoursTrickle) * 60),
  };
}
