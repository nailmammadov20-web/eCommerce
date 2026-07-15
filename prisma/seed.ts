import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import { phoneBrands } from "../lib/compatibility-data";
import { scoreCompatibility } from "../lib/compatibility-score";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env and configure your Neon connection string.");
}
const db = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

async function main() {
  console.log("Seeding database...");

  // ---------- Admin user ----------
  const adminPasswordHash = await bcrypt.hash("VoltAdmin2026!", 10);
  await db.user.upsert({
    where: { email: "admin@volt.az" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@volt.az",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });
  console.log("Admin user ready: admin@volt.az / VoltAdmin2026! (change after first login)");

  // ---------- Categories ----------
  const ganCategory = await db.category.upsert({
    where: { slug: "gan-adapterler" },
    update: {},
    create: {
      name: "GaN Adapterlər",
      slug: "gan-adapterler",
      description: "Kompakt ölçüdə maksimum güc verən yeni nəsil GaN texnologiyalı adapterlər.",
      order: 1,
    },
  });

  const cableCategory = await db.category.upsert({
    where: { slug: "kabeller" },
    update: { name: "USB-C Kabellər", description: "Davamlı hörgü örtüklü, yüksək güc ötürən USB-C şarj kabelləri." },
    create: {
      name: "USB-C Kabellər",
      slug: "kabeller",
      description: "Davamlı hörgü örtüklü, yüksək güc ötürən USB-C şarj kabelləri.",
      order: 2,
    },
  });

  const usbcAdapterCategory = await db.category.upsert({
    where: { slug: "usb-c-adapterler" },
    update: {},
    create: {
      name: "USB-C Adapterlər",
      slug: "usb-c-adapterler",
      description: "Gündəlik istifadə üçün etibarlı, sərfəli USB-C adapterlər.",
      order: 3,
    },
  });

  const lightningCableCategory = await db.category.upsert({
    where: { slug: "lightning-kabeller" },
    update: {},
    create: {
      name: "Lightning Kabellər",
      slug: "lightning-kabeller",
      description: "iPhone 14 və daha köhnə modellər üçün Lightning şarj kabelləri.",
      order: 4,
    },
  });

  const carChargerCategory = await db.category.upsert({
    where: { slug: "car-chargers" },
    update: {},
    create: {
      name: "Car Chargers",
      slug: "car-chargers",
      description: "Yol zamanı sürətli şarj üçün avtomobil adapterləri.",
      order: 5,
    },
  });

  const wirelessCategory = await db.category.upsert({
    where: { slug: "wireless-chargers" },
    update: {},
    create: {
      name: "Wireless Chargers",
      slug: "wireless-chargers",
      description: "Kabelsiz, Qi standartlı sürətli şarj pedləri və stendlər.",
      order: 6,
    },
  });

  const powerBankCategory = await db.category.upsert({
    where: { slug: "power-banks" },
    update: {},
    create: {
      name: "Power Banks",
      slug: "power-banks",
      description: "Yolda enerji ehtiyatı üçün GaN texnologiyalı portativ powerbanklar.",
      order: 7,
    },
  });

  // ---------- Products ----------
  const voltAir = await db.product.upsert({
    where: { slug: "volt-air-33w-gan-adapteri" },
    update: {},
    create: {
      name: "Volt Air 33W GaN Adapteri",
      slug: "volt-air-33w-gan-adapteri",
      shortDescription: "Ovucunuzda gizlənən, telefonunuzu dəqiqələr içində dolduran kompakt güc.",
      story:
        "Volt Air, gündəlik daşınma üçün nəzərdə tutulub. Adi adapterlərdən 40% kiçik olsa da, GaN " +
        "(Gallium Nitride) yarımkeçirici texnologiyası sayəsində eyni ölçüdəki ənənəvi adapterlərdən " +
        "qat-qat çox güc ötürür.\n\n" +
        "33W çıxış gücü ilə uyğun telefonunuzu 30 dəqiqədə 0-dan 50%-ə qədər doldurur. Universal USB-C " +
        "girişi sayəsində demək olar ki, bütün müasir Android telefonlarla və USB-C girişli iPhone " +
        "modelləri ilə uyumludur.\n\n" +
        "Aşırı qızmaya, gərginlik dəyişkənliyinə və qısa qapanmaya qarşı 5 qatlı qoruma sistemi ilə " +
        "həm cihazınızı, həm də adapterin özünü qoruyur.",
      price: 45,
      sku: "VLT-AIR-33",
      stock: 24,
      wattage: 33,
      cableType: "Kabel adapterə daxil deyil — istənilən USB-C kabellə uyğundur",
      connectorType: "USB-C",
      whatsInBox: ["Volt Air 33W GaN adapter", "İstifadə təlimatı", "Zəmanət kartı"],
      warrantyMonths: 24,
      status: "ACTIVE",
      featured: true,
      metaTitle: "Volt Air 33W GaN Adapter — Sürətli Şarj Adapteri Bakıda | Volt",
      metaDescription:
        "Volt Air 33W GaN adapter — kompakt ölçü, sürətli şarj, 24 ay zəmanət. Bakıda çatdırılma ilə sifariş edin.",
      categoryId: ganCategory.id,
    },
  });

  const voltPro = await db.product.upsert({
    where: { slug: "volt-pro-65w-dual-gan-adapteri" },
    update: {},
    create: {
      name: "Volt Pro 65W Dual GaN Adapteri",
      slug: "volt-pro-65w-dual-gan-adapteri",
      shortDescription: "İki cihazı eyni anda tam sürətlə doldurun — noutbukdan telefona qədər.",
      story:
        "Volt Pro, gücə ehtiyacı olanlar üçün yaradılıb. 65W ümumi çıxış gücü ilə təkcə telefonunuzu " +
        "deyil, kompakt noutbukunuzu da doldura bilər.\n\n" +
        "İki USB-C portu Power Delivery 3.0 protokolu ilə ağıllı şəkildə gücü paylaşdırır: bir cihaz " +
        "qoşulanda ona 65W-a qədər, iki cihaz qoşulanda hər ikisinə ehtiyaca uyğun güc verilir.\n\n" +
        "Səyahət zamanı bir adapterlə bütün cihazlarınızı idarə etmək istəyənlər üçün ideal seçimdir. " +
        "Ofis, ev və ya yol — hər yerdə tək adapterlə kifayətlənin.",
      price: 69,
      sku: "VLT-PRO-65",
      stock: 18,
      wattage: 65,
      cableType: "Kabel adapterə daxil deyil — istənilən USB-C kabellə uyğundur",
      connectorType: "USB-C",
      whatsInBox: ["Volt Pro 65W Dual GaN adapter", "İstifadə təlimatı", "Zəmanət kartı"],
      warrantyMonths: 24,
      status: "ACTIVE",
      featured: false,
      metaTitle: "Volt Pro 65W Dual GaN Adapter — İki Portlu Sürətli Şarj | Volt",
      metaDescription:
        "Volt Pro 65W Dual GaN adapter — iki USB-C port, noutbuk və telefon üçün tək adapter. 24 ay zəmanət.",
      categoryId: ganCategory.id,
    },
  });

  const voltLink = await db.product.upsert({
    where: { slug: "volt-link-usb-c-kabeli-100w" },
    update: {},
    create: {
      name: "Volt Link USB-C to USB-C Kabeli (100W)",
      slug: "volt-link-usb-c-kabeli-100w",
      shortDescription: "Hörgü örtüklü, 100W-a qədər dəstəkləyən davamlı şarj kabeli.",
      story:
        "Volt Link, gündəlik istifadədə ən çox əziyyət çəkən komponenti — kabeli — həll etmək üçün " +
        "hazırlanıb. Naylon hörgü örtük min dəfələrlə bükülməyə davam gətirir.\n\n" +
        "Daxili E-Mark çipi sayəsində 100W-a qədər güc ötürməyə təhlükəsiz icazə verir, yəni ən güclü " +
        "GaN adapterlərinizin potensialından tam istifadə edə bilərsiniz.\n\n" +
        "1 metr və 2 metr uzunluq seçimləri ilə istər masaüstündə, istər divandan uzaqda rahat istifadə " +
        "üçün uyğun ölçünü seçin.",
      price: 25,
      sku: "VLT-LINK-100",
      stock: 40,
      wattage: 100,
      cableType: "USB-C to USB-C, hörgü (naylon) örtük, E-Mark çipli",
      connectorType: "USB-C",
      whatsInBox: ["Volt Link 100W kabel", "İstifadə təlimatı"],
      warrantyMonths: 12,
      status: "ACTIVE",
      featured: false,
      metaTitle: "Volt Link USB-C Kabel 100W — Sürətli Şarj Kabeli | Volt",
      metaDescription: "Volt Link 100W USB-C to USB-C hörgü kabel. 1m və 2m seçimləri ilə Bakıda çatdırılma.",
      categoryId: cableCategory.id,
    },
  });

  await db.productVariant.upsert({
    where: { sku: "VLT-LINK-100-1M" },
    update: {},
    create: {
      productId: voltLink.id,
      name: "1 metr",
      sku: "VLT-LINK-100-1M",
      stock: 25,
      attributes: { length: "1m" },
    },
  });
  await db.productVariant.upsert({
    where: { sku: "VLT-LINK-100-2M" },
    update: {},
    create: {
      productId: voltLink.id,
      name: "2 metr",
      sku: "VLT-LINK-100-2M",
      priceOverride: 29,
      stock: 15,
      attributes: { length: "2m" },
    },
  });

  // ---------- Demo products (isDemo: true) ----------
  // Presentational only — "Tezliklə" (not purchasable) everywhere until an
  // admin flips isDemo to false once this is real inventory. Fills out the
  // storefront (category tiles, best sellers, new arrivals) without ever
  // letting a customer actually buy something that doesn't exist yet.
  const demoProducts: {
    name: string;
    slug: string;
    shortDescription: string;
    story: string;
    price: number;
    sku: string;
    stock: number;
    wattage: number;
    cableType: string;
    connectorType: string;
    whatsInBox: string[];
    warrantyMonths: number;
    featured: boolean;
    categoryId: string;
  }[] = [
    {
      name: "Volt Basic 20W USB-C Adapter",
      slug: "volt-basic-20w-usb-c-adapter",
      shortDescription: "Gündəlik istifadə üçün sadə, etibarlı tək portlu adapter.",
      story:
        "Volt Basic, sürətli şarjı hər kəs üçün əlçatan etmək məqsədilə yaradılıb — sadə, kompakt və etibarlı.",
      price: 25,
      sku: "VLT-BASIC-20-DEMO",
      stock: 20,
      wattage: 20,
      cableType: "Kabel adapterə daxil deyil",
      connectorType: "USB-C",
      whatsInBox: ["Volt Basic 20W adapter", "İstifadə təlimatı"],
      warrantyMonths: 24,
      featured: false,
      categoryId: usbcAdapterCategory.id,
    },
    {
      name: "Volt Dual 45W USB-C Adapter",
      slug: "volt-dual-45w-usb-c-adapter",
      shortDescription: "İki port, tək adapter — telefon və qulaqcıqlarınızı birgə doldurun.",
      story: "Volt Dual, iki cihazı eyni anda ağıllı güc paylaşımı ilə doldurur.",
      price: 55,
      sku: "VLT-DUAL-45-DEMO",
      stock: 15,
      wattage: 45,
      cableType: "Kabel adapterə daxil deyil",
      connectorType: "USB-C",
      whatsInBox: ["Volt Dual 45W adapter", "İstifadə təlimatı"],
      warrantyMonths: 24,
      featured: false,
      categoryId: usbcAdapterCategory.id,
    },
    {
      name: "Volt Link Lightning Kabeli (1m)",
      slug: "volt-link-lightning-kabeli-1m",
      shortDescription: "iPhone 14 və daha köhnə modellər üçün davamlı Lightning kabeli.",
      story: "Hörgü örtüklü Volt Link Lightning kabeli, gündəlik istifadəyə davamlı olacaq şəkildə hazırlanıb.",
      price: 22,
      sku: "VLT-LINK-LTN-1M-DEMO",
      stock: 18,
      wattage: 20,
      cableType: "USB-C to Lightning, hörgü örtük",
      connectorType: "Lightning",
      whatsInBox: ["Volt Link Lightning kabel (1m)", "İstifadə təlimatı"],
      warrantyMonths: 12,
      featured: false,
      categoryId: lightningCableCategory.id,
    },
    {
      name: "Volt Link Lightning Kabeli (2m)",
      slug: "volt-link-lightning-kabeli-2m",
      shortDescription: "Daha uzun məsafə üçün Volt Link Lightning kabelinin 2 metrlik versiyası.",
      story: "Eyni davamlılıq, daha çox sərbəstlik — divandan uzaqda rahat istifadə üçün.",
      price: 26,
      sku: "VLT-LINK-LTN-2M-DEMO",
      stock: 12,
      wattage: 20,
      cableType: "USB-C to Lightning, hörgü örtük",
      connectorType: "Lightning",
      whatsInBox: ["Volt Link Lightning kabel (2m)", "İstifadə təlimatı"],
      warrantyMonths: 12,
      featured: false,
      categoryId: lightningCableCategory.id,
    },
    {
      name: "Volt Link Slim USB-C Kabeli (60W)",
      slug: "volt-link-slim-usb-c-kabeli-60w",
      shortDescription: "Yüngül, çevik və gündəlik daşınma üçün ideal USB-C kabel.",
      story: "Volt Link Slim, cib və çantalarda yer tutmayan nazik profili ilə fərqlənir.",
      price: 19,
      sku: "VLT-LINK-SLIM-60-DEMO",
      stock: 22,
      wattage: 60,
      cableType: "USB-C to USB-C, nazik profil",
      connectorType: "USB-C",
      whatsInBox: ["Volt Link Slim kabel", "İstifadə təlimatı"],
      warrantyMonths: 12,
      featured: false,
      categoryId: cableCategory.id,
    },
    {
      name: "Volt Drive 45W Car Charger",
      slug: "volt-drive-45w-car-charger",
      shortDescription: "Avtomobildə sürətli şarj — yol boyu enerjiniz bitmir.",
      story: "Volt Drive, avtomobilinizin çakmaq rozetkasından tam sürətli şarj təmin edir.",
      price: 35,
      sku: "VLT-DRIVE-45-DEMO",
      stock: 14,
      wattage: 45,
      cableType: "Kabel daxil deyil",
      connectorType: "USB-C",
      whatsInBox: ["Volt Drive 45W avtomobil adapteri", "İstifadə təlimatı"],
      warrantyMonths: 24,
      featured: false,
      categoryId: carChargerCategory.id,
    },
    {
      name: "Volt Drive Dual 60W Car Charger",
      slug: "volt-drive-dual-60w-car-charger",
      shortDescription: "İki port ilə ailənizin bütün cihazlarını yolda doldurun.",
      story: "Volt Drive Dual, uzun səyahətlərdə bir neçə cihazı eyni anda şarj etmək üçün nəzərdə tutulub.",
      price: 48,
      sku: "VLT-DRIVE-DUAL-60-DEMO",
      stock: 10,
      wattage: 60,
      cableType: "Kabel daxil deyil",
      connectorType: "USB-C",
      whatsInBox: ["Volt Drive Dual 60W avtomobil adapteri", "İstifadə təlimatı"],
      warrantyMonths: 24,
      featured: false,
      categoryId: carChargerCategory.id,
    },
    {
      name: "Volt Wireless Pad 15W",
      slug: "volt-wireless-pad-15w",
      shortDescription: "Kabelsiz, sadə, sürətli — telefonunuzu pedin üzərinə qoyun, kifayətdir.",
      story: "Volt Wireless Pad, Qi standartına uyğun bütün telefonlarla işləyir və masanızda zərif görünür.",
      price: 39,
      sku: "VLT-WPAD-15-DEMO",
      stock: 16,
      wattage: 15,
      cableType: "Simsiz (Qi) — kabel tələb olunmur",
      connectorType: "Qi Wireless",
      whatsInBox: ["Volt Wireless Pad", "USB-C qidalanma kabeli", "İstifadə təlimatı"],
      warrantyMonths: 24,
      featured: true,
      categoryId: wirelessCategory.id,
    },
    {
      name: "Volt Wireless Stand 15W",
      slug: "volt-wireless-stand-15w",
      shortDescription: "Ekranınızı görərək şarj edin — masa üstü və ya gecə saatı rejimi üçün ideal.",
      story: "Volt Wireless Stand, telefonunuzu dik saxlayaraq bildirişləri görməyə imkan verir.",
      price: 45,
      sku: "VLT-WSTAND-15-DEMO",
      stock: 11,
      wattage: 15,
      cableType: "Simsiz (Qi) — kabel tələb olunmur",
      connectorType: "Qi Wireless",
      whatsInBox: ["Volt Wireless Stand", "USB-C qidalanma kabeli", "İstifadə təlimatı"],
      warrantyMonths: 24,
      featured: false,
      categoryId: wirelessCategory.id,
    },
    {
      name: "Volt Power 10000mAh",
      slug: "volt-power-10000mah",
      shortDescription: "Cibinizə sığan, gündəlik ehtiyaclar üçün kompakt powerbank.",
      story: "Volt Power 10000mAh, telefonunuzu 2-3 dəfə tam doldurmağa kifayət edən yığcam həlldir.",
      price: 49,
      sku: "VLT-POWER-10K-DEMO",
      stock: 13,
      wattage: 20,
      cableType: "Kabel daxil deyil",
      connectorType: "USB-C",
      whatsInBox: ["Volt Power 10000mAh powerbank", "İstifadə təlimatı"],
      warrantyMonths: 24,
      featured: false,
      categoryId: powerBankCategory.id,
    },
    {
      name: "Volt Power 20000mAh GaN",
      slug: "volt-power-20000mah-gan",
      shortDescription: "Noutbukdan telefona — böyük tutum, GaN sürəti ilə.",
      story: "Volt Power 20000mAh GaN, uzun səyahətlərdə bütün cihazlarınızı doldurmaq üçün nəzərdə tutulub.",
      price: 89,
      sku: "VLT-POWER-20K-DEMO",
      stock: 9,
      wattage: 65,
      cableType: "Kabel daxil deyil",
      connectorType: "USB-C",
      whatsInBox: ["Volt Power 20000mAh GaN powerbank", "İstifadə təlimatı"],
      warrantyMonths: 24,
      featured: false,
      categoryId: powerBankCategory.id,
    },
    {
      name: "Volt Max 100W GaN Adapter",
      slug: "volt-max-100w-gan-adapter",
      shortDescription: "Ən yüksək güc ehtiyacları üçün — noutbuk, telefon və daha çoxu tək adapterdə.",
      story: "Volt Max, GaN xəttimizin ən güclü üzvüdür — 100W çıxışla ən tələbkar cihazları belə doldurur.",
      price: 129,
      sku: "VLT-MAX-100-DEMO",
      stock: 8,
      wattage: 100,
      cableType: "Kabel adapterə daxil deyil",
      connectorType: "USB-C",
      whatsInBox: ["Volt Max 100W GaN adapter", "İstifadə təlimatı", "Zəmanət kartı"],
      warrantyMonths: 24,
      featured: true,
      categoryId: ganCategory.id,
    },
  ];

  for (const demo of demoProducts) {
    await db.product.upsert({
      where: { slug: demo.slug },
      update: {},
      create: { ...demo, status: "ACTIVE", isDemo: true },
    });
  }
  console.log(`Seeded ${demoProducts.length} demo products (isDemo: true, not purchasable).`);

  const chargers = [voltAir, voltPro];

  // ---------- Phone brands / models / compatibility rules ----------
  for (const brand of phoneBrands) {
    const brandRecord = await db.phoneBrand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: { name: brand.name, slug: brand.slug, order: brand.order },
    });

    for (const model of brand.models) {
      const modelRecord = await db.phoneModel.upsert({
        where: { slug: model.slug },
        update: {},
        create: {
          brandId: brandRecord.id,
          name: model.name,
          slug: model.slug,
          releaseYear: model.releaseYear,
          batteryCapacityMah: model.batteryCapacityMah,
        },
      });

      const scored = chargers
        .map((p) => ({
          product: p,
          ...scoreCompatibility({
            phoneMaxWattage: model.maxWattage,
            phoneConnector: model.connector,
            productWattage: p.wattage,
            productConnector: p.connectorType,
            batteryCapacityMah: model.batteryCapacityMah,
          }),
        }))
        .sort((a, b) => b.score - a.score);

      const best = scored[0];
      const connectorMatches = best.product.connectorType.toLowerCase() === model.connector.toLowerCase();

      await db.compatibilityRule.deleteMany({ where: { phoneModelId: modelRecord.id } });
      await db.compatibilityRule.create({
        data: {
          phoneModelId: modelRecord.id,
          recommendedProductId: connectorMatches ? best.product.id : null,
          maxWattage: model.maxWattage,
          cableType: connectorMatches
            ? voltLink.cableType
            : "Lightning to USB-C kabel (hazırda kataloqda yoxdur)",
          connectorType: model.connector,
          estimatedChargeMinutes: best.fullMinutes,
          compatibilityScore: best.score,
          notes: connectorMatches
            ? null
            : "Hazırda kataloqumuzda Lightning konnektoru üçün adapter yoxdur — tezliklə əlavə olunacaq.",
        },
      });
    }
  }
  console.log(`Seeded ${phoneBrands.length} phone brands with models and compatibility rules.`);

  // ---------- FAQ ----------
  const faqs: { question: string; answer: string; category: "GENERAL" | "SHIPPING" | "WARRANTY" | "PRODUCT"; order: number }[] = [
    {
      category: "GENERAL",
      order: 1,
      question: "Volt kimdir və məhsullarınız haradan gəlir?",
      answer:
        "Volt — Azərbaycanda premium şarj texnologiyaları təqdim edən brenddir. Bütün məhsullarımız beynəlxalq keyfiyyət standartlarına uyğun test edilir və rəsmi zəmanətlə satılır.",
    },
    {
      category: "GENERAL",
      order: 2,
      question: "GaN texnologiyası nədir və niyə vacibdir?",
      answer:
        "GaN (Gallium Nitride) ənənəvi silisium əvəzinə istifadə olunan yarımkeçirici materialdır. Daha az istilik yaradır və daha kiçik ölçüdə daha çox güc ötürməyə imkan verir.",
    },
    {
      category: "GENERAL",
      order: 3,
      question: "Sifarişimi necə izləyə bilərəm?",
      answer:
        "Hesabınıza daxil olub \"Sifarişlərim\" bölməsindən statusu izləyə bilərsiniz. Əlavə olaraq, sifariş təsdiqləndikdə əlaqə nömrənizə məlumat veriləcək.",
    },
    {
      category: "SHIPPING",
      order: 1,
      question: "Çatdırılma nə qədər vaxt alır?",
      answer: "Bakı daxilində sifarişlər adətən 1-2 iş günü ərzində, digər bölgələrə isə 2-4 iş günü ərzində çatdırılır.",
    },
    {
      category: "SHIPPING",
      order: 2,
      question: "Çatdırılma haqqı nə qədərdir?",
      answer:
        "Bakı daxilində 50 AZN-dən yuxarı sifarişlərdə çatdırılma pulsuzdur. Bundan aşağı sifarişlərdə sabit çatdırılma haqqı tətbiq olunur.",
    },
    {
      category: "SHIPPING",
      order: 3,
      question: "Nəğd ödəniş (COD) mövcunddurmu?",
      answer: "Bəli, çatdırılma zamanı nəğd ödəniş, həmçinin bank kartı ilə manual ödəniş və WhatsApp üzərindən sifariş seçimləri mövcuddur.",
    },
    {
      category: "WARRANTY",
      order: 1,
      question: "Zəmanət müddəti nə qədərdir?",
      answer: "Adapterlərimiz 24 ay, kabellərimiz isə 12 ay rəsmi zəmanətlə satılır.",
    },
    {
      category: "WARRANTY",
      order: 2,
      question: "Zəmanət nələri əhatə edir?",
      answer:
        "İstehsal qüsurları, daxili komponent nasazlıqları və normal istifadə zamanı yaranan funksional problemlər zəmanətə daxildir. Fiziki zədələr (sındırma, suya salma) əhatə olunmur.",
    },
    {
      category: "WARRANTY",
      order: 3,
      question: "Zəmanət tələbini necə təqdim edə bilərəm?",
      answer: "\"Zəmanət\" səhifəsindəki formu doldurun. Komandamız 24-48 saat ərzində sizinlə əlaqə saxlayacaq.",
    },
    {
      category: "PRODUCT",
      order: 1,
      question: "Adapterləriniz bütün telefonlarla uyğundurmu?",
      answer:
        "Əksər müasir USB-C telefonlarla tam uyğundur. Dəqiq uyğunluğu yoxlamaq üçün saytımızdakı \"Uyğunluq Yoxlayıcısı\" alətindən istifadə edə bilərsiniz.",
    },
    {
      category: "PRODUCT",
      order: 2,
      question: "Adapter telefonuma zərər verə bilərmi?",
      answer:
        "Xeyr. Bütün adapterlərimiz aşırı gərginlik, qısa qapanma və istilik nəzarəti sistemləri ilə təchiz olunub və telefonunuzun tələb etdiyi gücdən artıq ötürmür.",
    },
    {
      category: "PRODUCT",
      order: 3,
      question: "Kabel adapterə daxildirmi?",
      answer: "Adapterlərimizlə kabel ayrıca satılır ki, artıq uyğun kabeliniz varsa, əlavə ödəniş etməyəsiniz. Kabellərimizi \"Kabellər\" kateqoriyasında tapa bilərsiniz.",
    },
    {
      category: "PRODUCT",
      order: 4,
      question: "Batareyanın sağlamlığına necə qayğı göstərə bilərəm?",
      answer:
        "Telefonunuzu 20-80% aralığında saxlamaq, orijinal keyfiyyətli adapterlərdən istifadə etmək və aşırı istiləşmədən qaçmaq batareya ömrünü uzadan əsas amillərdir. Ətraflı məlumat üçün \"Şarj Bələdçisi\" səhifəmizə baxın.",
    },
  ];

  for (const faq of faqs) {
    const existing = await db.fAQ.findFirst({ where: { question: faq.question } });
    if (!existing) {
      await db.fAQ.create({ data: faq });
    }
  }
  console.log(`Seeded ${faqs.length} FAQ entries.`);

  // ---------- Blog posts ----------
  const posts = [
    {
      title: "GaN texnologiyası nədir və niyə fərq yaradır?",
      slug: "gan-texnologiyasi-nedir",
      excerpt: "Adi adapterlərdən qat-qat kiçik, lakin daha güclü olan GaN çiplərinin arxasındakı elmi izah edirik.",
      tags: ["texnologiya", "gan"],
      content:
        "Son illərdə şarj adapterləri kiçilib, amma güc artıb. Bunun səbəbi GaN (Gallium Nitride) adlanan " +
        "yarımkeçirici materialdır.\n\n" +
        "Ənənəvi adapterlər silisium (silicon) əsaslı tranzistorlardan istifadə edir. Silisium yüksək tezliklərdə " +
        "işlədikdə çox istilik yaradır, buna görə də böyük soyutma elementlərinə ehtiyac var — bu da adapterin " +
        "ölçüsünü artırır.\n\n" +
        "GaN isə eyni gücü daha az itki ilə ötürür. Daha az istilik deməkdir — daha kiçik korpus, daha yüksək " +
        "effektivlik. Nəticədə ovucunuza sığan adapter noutbukunuzu belə doldura bilir.",
    },
    {
      title: "Sürətli şarj necə işləyir? PD və QC arasındakı fərq",
      slug: "suretli-sarj-nece-isleyir",
      excerpt: "Power Delivery və Quick Charge protokollarının nə etdiyini və telefonunuz üçün nəyin vacib olduğunu öyrənin.",
      tags: ["texnologiya", "suretli-sarj"],
      content:
        "Sürətli şarj sehr deyil — telefon və adapter arasında rəqəmsal \"danışıq\"dır. Cihazlar qoşulan kimi " +
        "bir-birinə \"mən nə qədər gərginlik və cərəyan qəbul edə bilərəm\" deyə soruşur.\n\n" +
        "USB Power Delivery (PD) — bugünkü ən geniş yayılmış standartdır və əksər USB-C telefonlar, noutbuklar " +
        "və planşetlər tərəfindən dəstəklənir. Quick Charge (QC) isə daha köhnə, əsasən Qualcomm çipli " +
        "telefonlarda rast gəlinən alternativ protokoldur.\n\n" +
        "Yaxşı xəbər budur ki, müasir GaN adapterlərin əksəriyyəti hər iki protokolu dəstəkləyir və telefonunuzla " +
        "avtomatik olaraq ən uyğun sürəti seçir.",
    },
    {
      title: "Batareya sağlamlığı üçün 7 praktik məsləhət",
      slug: "batareya-saglamligi-ucun-mesleheler",
      excerpt: "Telefonunuzun batareyasının ömrünü uzatmaq üçün gündəlik vərdişlərinizə əlavə edə biləcəyiniz sadə addımlar.",
      tags: ["batareya", "meslehet"],
      content:
        "1. Telefonunuzu 20-80% aralığında saxlamağa çalışın — tam dolu və tam boş vəziyyətlər batareyaya daha çox stress yaradır.\n\n" +
        "2. Orijinal və ya sertifikatlı adapterlərdən istifadə edin. Ucuz, sertifikatsız adapterlər gərginliyi düzgün tənzimləmir.\n\n" +
        "3. Telefonunuzu birbaşa günəş işığında və ya isti mühitdə şarj etməyin.\n\n" +
        "4. Gecə boyu şarjda saxlamaqdan çəkinin — müasir telefonlar bunu idarə etsə də, uzunmüddətli 100% gərginlik faydalı deyil.\n\n" +
        "5. Case ilə şarj edərkən qızma müşahidə etsəniz, case-i çıxarın.\n\n" +
        "6. Batareya statistikasını mütəmadi yoxlayın (əksər telefonlarda Ayarlar bölməsində mövcuddur).\n\n" +
        "7. Uzun müddət istifadə etməyəcəyinizsə, telefonu ~50% enerji ilə saxlayın.",
    },
    {
      title: "Orijinal adapter seçməyin niyə vacib olduğunu bilirsinizmi?",
      slug: "orijinal-adapter-secmeyin-vacibliyi",
      excerpt: "Sertifikatsız adapterlərin real riskləri və uzunmüddətli qənaət kimi görünən seçimin əslində niyə baha başa gəldiyi.",
      tags: ["tehlukesizlik", "keyfiyyet"],
      content:
        "Bazarda çox ucuz adapterlər tapmaq mümkündür, lakin bu adapterlərin əksəriyyəti lazımi gərginlik " +
        "tənzimləmə komponentlərindən məhrumdur.\n\n" +
        "Nəticə: gərginlik dalğalanmaları telefonun batareya idarəetmə çipinə zərər verə bilər, bu da uzunmüddətdə " +
        "batareyanın daha tez deqradasiyaya uğramasına səbəb olur.\n\n" +
        "Sertifikatlı adapterlər (məsələn, bizim Volt xəttimiz) beynəlxalq təhlükəsizlik standartlarına uyğun test " +
        "edilir: qısa qapanma, aşırı gərginlik, aşırı cərəyan və aşırı istilikdən qoruma daxil olmaqla.",
    },
    {
      title: "USB-C və Lightning: əsas fərqlər nədir?",
      slug: "usb-c-ve-lightning-ferqleri",
      excerpt: "İki əsas qoşulma standartının texniki fərqlərini və hansı telefonların hansını istifadə etdiyini izah edirik.",
      tags: ["usb-c", "lightning"],
      content:
        "Lightning — Apple tərəfindən 2012-ci ildə təqdim edilmiş qapalı (proprietary) standartdır. iPhone 14 və " +
        "daha köhnə modellərdə istifadə olunur.\n\n" +
        "USB-C isə açıq sənaye standartıdır və 2017-dən bəri əksər Android telefonlar, 2023-dən etibarən isə " +
        "iPhone 15 və sonrakı modellər tərəfindən istifadə olunur.\n\n" +
        "Əməli fərq: USB-C portu iki tərəfli (hansı tərəfdən taxsanız da düzgün işləyir) və ümumiyyətlə daha yüksək " +
        "güc ötürmə qabiliyyətinə malikdir — buna görə də USB-C ekosistemi sürətli şarjda üstünlük təşkil edir.",
    },
  ];

  for (const post of posts) {
    await db.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags,
        status: "PUBLISHED",
        publishedAt: new Date(),
        metaTitle: `${post.title} | Volt Bloq`,
        metaDescription: post.excerpt,
      },
    });
  }
  console.log(`Seeded ${posts.length} blog posts.`);

  // ---------- Admin settings ----------
  await db.adminSetting.upsert({
    where: { key: "homepage_hero" },
    update: {},
    create: {
      key: "homepage_hero",
      description: "Ana səhifə hero bölməsinin başlıq və alt mətni",
      value: {
        headline: "Enerjinin gələcəyi. Bu gün ovucunuzda.",
        subtitle: "Volt — Azərbaycan üçün yaradılmış premium şarj texnologiyaları brendi.",
        ctaLabel: "Kolleksiyaya bax",
      },
    },
  });

  await db.adminSetting.upsert({
    where: { key: "whatsapp_number" },
    update: {},
    create: {
      key: "whatsapp_number",
      description: "WhatsApp sifariş nömrəsi (beynəlxalq formatda, + işarəsiz)",
      value: { number: "994702828201" },
    },
  });

  await db.adminSetting.upsert({
    where: { key: "coming_soon_items" },
    update: {},
    create: {
      key: "coming_soon_items",
      description: "Ana səhifədəki 'Tezliklə' bölməsi üçün presentasiya məqsədli elementlər (real məhsul deyil)",
      value: [
        { name: "Volt Desk 100W GaN Adapter", blurb: "Masaüstü stansiyası üçün 4 portlu güc həlli.", eta: "2026 Payız" },
        { name: "Volt Wireless Pad", blurb: "15W simsiz sürətli şarj pedi.", eta: "2026 Payız" },
        { name: "Volt Power 20000mAh", blurb: "GaN texnologiyalı portativ powerbank.", eta: "2027 Qış" },
        { name: "Volt Laptop 140W", blurb: "Yüksək performanslı noutbuklar üçün GaN adapter.", eta: "2027 Yaz" },
      ],
    },
  });

  await db.adminSetting.upsert({
    where: { key: "seo_defaults" },
    update: {},
    create: {
      key: "seo_defaults",
      description: "Sayt üzrə default SEO dəyərləri",
      value: {
        defaultMetaTitle: "Volt — Premium Telefon Adapterləri və Şarj Aksesuarları Bakıda",
        defaultMetaDescription:
          "Volt ilə sürətli şarj adapteri, USB-C adapter, GaN adapter və şarj kabelləri. Bakıda sürətli çatdırılma, 24 ay zəmanət.",
      },
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
