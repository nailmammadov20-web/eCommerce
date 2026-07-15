import { NewsletterForm } from "@/components/shared/newsletter-form";
import { Reveal } from "@/components/shared/reveal";

export function NewsletterSection() {
  return (
    <section className="border-t border-border/60 bg-black py-24 text-white">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Enerjidə qalın</h2>
          <p className="mt-5 text-lg text-white/70">
            Yeni məhsullar, şarj məsləhətləri və məxsusi kampaniyalardan ilk siz xəbərdar olun.
          </p>
          <NewsletterForm dark className="mx-auto mt-8 max-w-md" />
        </Reveal>
      </div>
    </section>
  );
}
