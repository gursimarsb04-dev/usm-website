import DonationForm from "@/components/DonationForm";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";

export const revalidate = 3600;

export default async function DonatePage() {
  const settings = await client.fetch(siteSettingsQuery) || {};

  return (
    <div className="min-h-[100dvh] bg-warm-white flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row lg:h-[100dvh]">
        {/* Left side info */}
        <div className="w-full lg:w-[45%] bg-navy p-6 md:p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden pt-36 lg:pt-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10 max-w-lg">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-saffron px-3 py-1 bg-saffron/10 rounded-full w-fit mb-8 inline-block">Support Us</span>
            <h1 className="font-display font-semibold text-5xl md:text-6xl tracking-tighter text-white leading-[1.05] mb-6">
              Invest in the Next Generation.
            </h1>
            <p className="font-body text-lg text-white/80 leading-relaxed mb-12">
              Your donation directly funds regional retreats, mentorship programs, and resources for Sikh Student Associations across the country. 
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-saffron" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white font-medium mb-1">Tax Deductible</h3>
                  <p className="text-white/60 text-sm">USM is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-saffron" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white font-medium mb-1">Direct Impact</h3>
                  <p className="text-white/60 text-sm">Funds are distributed directly to programming, ground operations, and student resource grants.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side form */}
        <div className="w-full lg:w-[55%] p-6 md:p-12 lg:p-20 flex flex-col justify-center items-center bg-cream relative">
          <DonationForm donationGoal={settings?.donationGoal} />
        </div>
      </div>
    </div>
  );
}
