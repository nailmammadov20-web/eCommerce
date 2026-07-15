const FREE_SHIPPING_THRESHOLD = 50;
const BAKU_FLAT_FEE = 5;
const OTHER_REGION_FEE = 10;

function isBaku(city: string) {
  const normalized = city.trim().toLowerCase();
  return normalized.includes("bakı") || normalized.includes("baki");
}

export function calculateShipping(city: string, subtotal: number): number {
  if (isBaku(city)) {
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BAKU_FLAT_FEE;
  }
  return OTHER_REGION_FEE;
}
