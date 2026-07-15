import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/shared/contact-form";

export const metadata: Metadata = {
  title: "Əlaqə",
  description: "Volt komandası ilə əlaqə saxlayın — WhatsApp, telefon, e-poçt və ya əlaqə forması vasitəsilə.",
};

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "994702828201";

const contactChannels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Bizə yazın",
    href: `https://wa.me/${whatsappNumber}`,
  },
  {
    icon: Phone,
    title: "Telefon",
    value: "+994 70 282 82 01",
    href: `tel:+${whatsappNumber}`,
  },
  {
    icon: Mail,
    title: "E-poçt",
    value: "info@volt.az",
    href: "mailto:info@volt.az",
  },
  {
    icon: MapPin,
    title: "Ünvan",
    value: "Bakı, Azərbaycan",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Əlaqə</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Sualınız var? Komandamız sizə kömək etməyə hazırdır.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          {contactChannels.map((channel) => {
            const content = (
              <>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <channel.icon className="h-5 w-5 text-electric" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{channel.title}</p>
                  <p className="font-medium">{channel.value}</p>
                </div>
              </>
            );

            if (!channel.href) {
              return (
                <div key={channel.title} className="flex items-center gap-4 rounded-2xl border border-border p-5">
                  {content}
                </div>
              );
            }

            return (
              <a
                key={channel.title}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border p-5 transition-colors hover:border-foreground/30"
              >
                {content}
              </a>
            );
          })}
        </div>

        <div className="rounded-3xl border border-border p-8">
          <h2 className="text-lg font-semibold">Mesaj göndərin</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
