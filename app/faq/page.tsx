import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Tez-tez verilən suallar",
  description: "Sifariş, çatdırılma, zəmanət və məhsullarımız haqqında ən çox verilən suallara cavablar.",
};

const categoryLabels: Record<string, string> = {
  GENERAL: "Ümumi",
  SHIPPING: "Çatdırılma",
  WARRANTY: "Zəmanət",
  PRODUCT: "Məhsul",
};

export default async function FaqPage() {
  const faqs = await db.fAQ.findMany({ where: { published: true }, orderBy: [{ category: "asc" }, { order: "asc" }] });

  const grouped = faqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    acc[faq.category] = acc[faq.category] ?? [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Tez-tez verilən suallar</h1>
        <p className="mt-4 text-lg text-muted-foreground">Axtardığınız cavabı tapa bilmirsiniz? Bizimlə əlaqə saxlayın.</p>
      </div>

      <div className="mt-14 space-y-12">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-lg font-semibold text-electric">{categoryLabels[category] ?? category}</h2>
            <Accordion className="mt-4">
              {items.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left text-base font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
