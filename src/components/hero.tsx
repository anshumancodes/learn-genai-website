"use client";

export default function Hero() {
  return (
    <section className="px-6 pt-10 pb-6" aria-labelledby="hero-heading">
      {/* Big bordered title box */}
      <div className="border border-[#292929] mx-auto max-w-2xl p-8 mb-8">
        <h1
          id="hero-heading"
          className="font-display text-6xl md:text-7xl text-[#29391D] leading-none mb-6 text-center"
        >
          learn genAI
        </h1>
        <p className="text-sm text-[#29391D] leading-relaxed text-center max-w mx-auto font-body">
          a resource to learn genAI and its mathematical foundations. courses link to IISc’s NPTEL videos, and you can use this site to track your progress.

        </p>
      </div>

      {/* Secondary description outside the box */}
      <p className="text-[12px] text-[#29391D] leading-relaxed max-w-2xl mx-auto font-body text-center">
        this site is editable, so if you wanna add more resources for others, find the repo above and contribute.

      </p>
    </section>
  );
}
