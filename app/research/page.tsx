import type { Metadata } from "next";
import { RESEARCH_AREAS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Research",
  description: "Research areas and projects at H2CI Lab, POSTECH.",
};

export default function ResearchPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-16 text-center">
          <div className="brand-divider w-36 mb-5 mx-auto" />
          <h1 className="font-rajdhani text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Research
          </h1>
        </div>

        {/* Research themes */}
        <div className="space-y-20">
          {RESEARCH_AREAS.map((theme) => (
            <section key={theme.title}>
              {/* Section header with left accent border */}
              <div className="border-l-4 pl-5 mb-3" style={{ borderColor: "#A61955" }}>
                <h2 className="text-2xl font-extrabold text-stone-900">{theme.title}</h2>
              </div>
              <p className="text-stone-500 text-base leading-relaxed mb-8 pl-5">
                {theme.description}
              </p>

              {/* Cards row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {theme.cards.map((card) => (
                  <div
                    key={card.title}
                    className="flex flex-col bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden"
                  >
                    {/* Image */}
                    {card.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full aspect-video object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-stone-200 flex items-center justify-center">
                        <span className="text-stone-400 text-xs">Image</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Award */}
                      {card.award && (
                        <div className="mb-2">
                          <span className="award-badge">🏆 {card.award}</span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-bold text-stone-900 text-sm leading-snug mb-2">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-stone-500 text-xs leading-relaxed flex-1">{card.desc}</p>

                      {/* Led by */}
                      {card.ledBy && (
                        <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500">
                          Led by{" "}
                          <a
                            href={card.ledBy.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-stone-700 inline-block transition-transform duration-200 hover:-translate-y-0.5"
                          >
                            {card.ledBy.name}
                          </a>
                        </div>
                      )}

                      {/* Nickname + Venue + DOI */}
                      {card.type === "pub" && (card.nickname || card.venue || card.link) && (
                        <div className="mt-4 pt-3 border-t border-stone-100 flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            {card.nickname && (
                              <p className="text-xs font-semibold text-stone-700 break-words">{card.nickname}</p>
                            )}
                            {card.venue && (
                              <p className="text-xs text-stone-400">{card.venue}</p>
                            )}
                          </div>
                          {card.link && (
                            <a
                              href={card.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-md text-white transition-opacity hover:opacity-80"
                              style={{ backgroundColor: "#A61955CC" }}
                            >
                              DOI
                            </a>
                          )}
                        </div>
                      )}
                      {/* Additional publications */}
                      {"additionalPubs" in card && Array.isArray(card.additionalPubs) && card.additionalPubs.map((pub: { nickname: string; venue: string; link: string }) => (
                        <div key={pub.nickname} className="mt-2 pt-2 flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-stone-700 break-words">{pub.nickname}</p>
                            <p className="text-xs text-stone-400">{pub.venue}</p>
                          </div>
                          {pub.link && (
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-md text-white transition-opacity hover:opacity-80"
                              style={{ backgroundColor: "#A61955CC" }}
                            >
                              DOI
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
