export type Connector = "USB-C" | "Lightning";

export interface PhoneModelSeed {
  name: string;
  slug: string;
  releaseYear: number;
  batteryCapacityMah: number;
  maxWattage: number;
  connector: Connector;
}

export interface PhoneBrandSeed {
  name: string;
  slug: string;
  order: number;
  models: PhoneModelSeed[];
}

export const phoneBrands: PhoneBrandSeed[] = [
  {
    name: "Apple",
    slug: "apple",
    order: 1,
    models: [
      { name: "iPhone 15 Pro", slug: "iphone-15-pro", releaseYear: 2023, batteryCapacityMah: 3274, maxWattage: 27, connector: "USB-C" },
      { name: "iPhone 15", slug: "iphone-15", releaseYear: 2023, batteryCapacityMah: 3349, maxWattage: 25, connector: "USB-C" },
      { name: "iPhone 14", slug: "iphone-14", releaseYear: 2022, batteryCapacityMah: 3279, maxWattage: 20, connector: "Lightning" },
      { name: "iPhone 13", slug: "iphone-13", releaseYear: 2021, batteryCapacityMah: 3227, maxWattage: 20, connector: "Lightning" },
      { name: "iPhone SE (2022)", slug: "iphone-se-2022", releaseYear: 2022, batteryCapacityMah: 2018, maxWattage: 20, connector: "Lightning" },
    ],
  },
  {
    name: "Samsung",
    slug: "samsung",
    order: 2,
    models: [
      { name: "Galaxy S24 Ultra", slug: "galaxy-s24-ultra", releaseYear: 2024, batteryCapacityMah: 5000, maxWattage: 45, connector: "USB-C" },
      { name: "Galaxy S24+", slug: "galaxy-s24-plus", releaseYear: 2024, batteryCapacityMah: 4900, maxWattage: 45, connector: "USB-C" },
      { name: "Galaxy S24", slug: "galaxy-s24", releaseYear: 2024, batteryCapacityMah: 4000, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy S23 Ultra", slug: "galaxy-s23-ultra", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 45, connector: "USB-C" },
      { name: "Galaxy S23+", slug: "galaxy-s23-plus", releaseYear: 2023, batteryCapacityMah: 4700, maxWattage: 45, connector: "USB-C" },
      { name: "Galaxy S23", slug: "galaxy-s23", releaseYear: 2023, batteryCapacityMah: 3900, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy S22 Ultra", slug: "galaxy-s22-ultra", releaseYear: 2022, batteryCapacityMah: 5000, maxWattage: 45, connector: "USB-C" },
      { name: "Galaxy S22", slug: "galaxy-s22", releaseYear: 2022, batteryCapacityMah: 3700, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy S21", slug: "galaxy-s21", releaseYear: 2021, batteryCapacityMah: 4000, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy Z Fold5", slug: "galaxy-z-fold5", releaseYear: 2023, batteryCapacityMah: 4400, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy Z Flip5", slug: "galaxy-z-flip5", releaseYear: 2023, batteryCapacityMah: 3700, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy A55", slug: "galaxy-a55", releaseYear: 2024, batteryCapacityMah: 5000, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy A35", slug: "galaxy-a35", releaseYear: 2024, batteryCapacityMah: 5000, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy A54", slug: "galaxy-a54", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy A25", slug: "galaxy-a25", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy A15", slug: "galaxy-a15", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy M34", slug: "galaxy-m34", releaseYear: 2023, batteryCapacityMah: 6000, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy A34", slug: "galaxy-a34", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy Note 20", slug: "galaxy-note-20", releaseYear: 2020, batteryCapacityMah: 4300, maxWattage: 25, connector: "USB-C" },
      { name: "Galaxy Note 10", slug: "galaxy-note-10", releaseYear: 2019, batteryCapacityMah: 3500, maxWattage: 25, connector: "USB-C" },
    ],
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    order: 3,
    models: [
      { name: "Xiaomi 14", slug: "xiaomi-14", releaseYear: 2023, batteryCapacityMah: 4610, maxWattage: 90, connector: "USB-C" },
      { name: "Xiaomi 13T", slug: "xiaomi-13t", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 67, connector: "USB-C" },
      { name: "Redmi Note 13", slug: "redmi-note-13", releaseYear: 2024, batteryCapacityMah: 5000, maxWattage: 33, connector: "USB-C" },
      { name: "Redmi Note 12", slug: "redmi-note-12", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 33, connector: "USB-C" },
      { name: "Poco X6", slug: "poco-x6", releaseYear: 2024, batteryCapacityMah: 5000, maxWattage: 67, connector: "USB-C" },
    ],
  },
  {
    name: "Huawei",
    slug: "huawei",
    order: 4,
    models: [
      { name: "Huawei P60", slug: "huawei-p60", releaseYear: 2023, batteryCapacityMah: 4815, maxWattage: 66, connector: "USB-C" },
      { name: "Mate 50", slug: "mate-50", releaseYear: 2022, batteryCapacityMah: 4700, maxWattage: 66, connector: "USB-C" },
      { name: "Nova 11", slug: "nova-11", releaseYear: 2023, batteryCapacityMah: 4500, maxWattage: 66, connector: "USB-C" },
      { name: "Huawei P50", slug: "huawei-p50", releaseYear: 2021, batteryCapacityMah: 4100, maxWattage: 66, connector: "USB-C" },
      { name: "Nova 9", slug: "nova-9", releaseYear: 2021, batteryCapacityMah: 4300, maxWattage: 66, connector: "USB-C" },
    ],
  },
  {
    name: "Honor",
    slug: "honor",
    order: 5,
    models: [
      { name: "Honor Magic 6", slug: "honor-magic-6", releaseYear: 2024, batteryCapacityMah: 5450, maxWattage: 66, connector: "USB-C" },
      { name: "Honor 90", slug: "honor-90", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 66, connector: "USB-C" },
      { name: "Honor X9b", slug: "honor-x9b", releaseYear: 2024, batteryCapacityMah: 5800, maxWattage: 66, connector: "USB-C" },
      { name: "Honor 70", slug: "honor-70", releaseYear: 2022, batteryCapacityMah: 4800, maxWattage: 66, connector: "USB-C" },
      { name: "Honor 90 Lite", slug: "honor-90-lite", releaseYear: 2023, batteryCapacityMah: 4500, maxWattage: 35, connector: "USB-C" },
    ],
  },
  {
    name: "Realme",
    slug: "realme",
    order: 6,
    models: [
      { name: "Realme GT 5", slug: "realme-gt-5", releaseYear: 2023, batteryCapacityMah: 5240, maxWattage: 100, connector: "USB-C" },
      { name: "Realme 12 Pro", slug: "realme-12-pro", releaseYear: 2024, batteryCapacityMah: 5000, maxWattage: 67, connector: "USB-C" },
      { name: "Realme 11", slug: "realme-11", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 67, connector: "USB-C" },
      { name: "Realme C67", slug: "realme-c67", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 33, connector: "USB-C" },
      { name: "Realme 10", slug: "realme-10", releaseYear: 2022, batteryCapacityMah: 5000, maxWattage: 33, connector: "USB-C" },
    ],
  },
  {
    name: "Oppo",
    slug: "oppo",
    order: 7,
    models: [
      { name: "Oppo Find X7", slug: "oppo-find-x7", releaseYear: 2024, batteryCapacityMah: 5000, maxWattage: 100, connector: "USB-C" },
      { name: "Oppo Reno 11", slug: "oppo-reno-11", releaseYear: 2024, batteryCapacityMah: 5000, maxWattage: 67, connector: "USB-C" },
      { name: "Oppo A98", slug: "oppo-a98", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 67, connector: "USB-C" },
      { name: "Oppo Reno 8", slug: "oppo-reno-8", releaseYear: 2022, batteryCapacityMah: 4500, maxWattage: 80, connector: "USB-C" },
      { name: "Oppo A78", slug: "oppo-a78", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 33, connector: "USB-C" },
    ],
  },
  {
    name: "OnePlus",
    slug: "oneplus",
    order: 8,
    models: [
      { name: "OnePlus 12", slug: "oneplus-12", releaseYear: 2024, batteryCapacityMah: 5400, maxWattage: 100, connector: "USB-C" },
      { name: "OnePlus 11", slug: "oneplus-11", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 100, connector: "USB-C" },
      { name: "OnePlus Nord 3", slug: "oneplus-nord-3", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 80, connector: "USB-C" },
      { name: "OnePlus Nord CE 3", slug: "oneplus-nord-ce-3", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 67, connector: "USB-C" },
      { name: "OnePlus 10T", slug: "oneplus-10t", releaseYear: 2022, batteryCapacityMah: 4800, maxWattage: 125, connector: "USB-C" },
    ],
  },
  {
    name: "Google",
    slug: "google",
    order: 9,
    models: [
      { name: "Pixel 8 Pro", slug: "pixel-8-pro", releaseYear: 2023, batteryCapacityMah: 5050, maxWattage: 30, connector: "USB-C" },
      { name: "Pixel 8", slug: "pixel-8", releaseYear: 2023, batteryCapacityMah: 4575, maxWattage: 27, connector: "USB-C" },
      { name: "Pixel 7a", slug: "pixel-7a", releaseYear: 2023, batteryCapacityMah: 4385, maxWattage: 18, connector: "USB-C" },
      { name: "Pixel 7", slug: "pixel-7", releaseYear: 2022, batteryCapacityMah: 4355, maxWattage: 20, connector: "USB-C" },
      { name: "Pixel 6a", slug: "pixel-6a", releaseYear: 2022, batteryCapacityMah: 4410, maxWattage: 18, connector: "USB-C" },
    ],
  },
  {
    name: "Motorola",
    slug: "motorola",
    order: 10,
    models: [
      { name: "Moto Edge 40", slug: "moto-edge-40", releaseYear: 2023, batteryCapacityMah: 4400, maxWattage: 68, connector: "USB-C" },
      { name: "Moto G84", slug: "moto-g84", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 33, connector: "USB-C" },
      { name: "Moto G54", slug: "moto-g54", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 33, connector: "USB-C" },
      { name: "Moto Edge 30", slug: "moto-edge-30", releaseYear: 2022, batteryCapacityMah: 4020, maxWattage: 33, connector: "USB-C" },
      { name: "Moto G73", slug: "moto-g73", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 30, connector: "USB-C" },
    ],
  },
  {
    name: "Vivo",
    slug: "vivo",
    order: 11,
    models: [
      { name: "Vivo X100", slug: "vivo-x100", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 120, connector: "USB-C" },
      { name: "Vivo V29", slug: "vivo-v29", releaseYear: 2023, batteryCapacityMah: 4600, maxWattage: 80, connector: "USB-C" },
      { name: "Vivo Y36", slug: "vivo-y36", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 44, connector: "USB-C" },
      { name: "Vivo X90", slug: "vivo-x90", releaseYear: 2023, batteryCapacityMah: 4810, maxWattage: 80, connector: "USB-C" },
      { name: "Vivo Y17s", slug: "vivo-y17s", releaseYear: 2024, batteryCapacityMah: 5000, maxWattage: 15, connector: "USB-C" },
    ],
  },
  {
    name: "Tecno",
    slug: "tecno",
    order: 12,
    models: [
      { name: "Tecno Camon 20", slug: "tecno-camon-20", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 33, connector: "USB-C" },
      { name: "Tecno Spark 10", slug: "tecno-spark-10", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 18, connector: "USB-C" },
      { name: "Tecno Phantom X2", slug: "tecno-phantom-x2", releaseYear: 2022, batteryCapacityMah: 5160, maxWattage: 45, connector: "USB-C" },
      { name: "Tecno Pova 5", slug: "tecno-pova-5", releaseYear: 2023, batteryCapacityMah: 6000, maxWattage: 68, connector: "USB-C" },
      { name: "Tecno Camon 19", slug: "tecno-camon-19", releaseYear: 2022, batteryCapacityMah: 5000, maxWattage: 33, connector: "USB-C" },
    ],
  },
  {
    name: "Infinix",
    slug: "infinix",
    order: 13,
    models: [
      { name: "Infinix Zero 30", slug: "infinix-zero-30", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 68, connector: "USB-C" },
      { name: "Infinix Note 30", slug: "infinix-note-30", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 45, connector: "USB-C" },
      { name: "Infinix Hot 40", slug: "infinix-hot-40", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 18, connector: "USB-C" },
      { name: "Infinix GT 10 Pro", slug: "infinix-gt-10-pro", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 45, connector: "USB-C" },
      { name: "Infinix Smart 8", slug: "infinix-smart-8", releaseYear: 2023, batteryCapacityMah: 5000, maxWattage: 10, connector: "USB-C" },
    ],
  },
];
