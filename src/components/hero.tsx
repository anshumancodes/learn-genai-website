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
          learn genAi
        </h1>
        <p className="text-sm text-[#29391D] leading-relaxed text-center max-w-sm mx-auto font-body">
          this website is opensource incase you wanna add more resources
          or make design changes or simply wanna contribute please find the
          github link below and contribute.
        </p>
      </div>

      {/* Secondary description outside the box */}
      <p className="text-sm text-[#29391D] leading-relaxed max-w-2xl mx-auto font-body">
        this a resource for learning gen ai along with its mathematical foundations.
        the courses arent owned by the site maintainer and they simply redirect u to
        indian institute of sciences&apos; nptel yt videos, you can use this site as a tracker
      </p>
    </section>
  );
}
