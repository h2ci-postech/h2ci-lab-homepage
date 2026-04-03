import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of the H2CI Lab at POSTECH.",
};

function formatDate(folder: string) {
  // folder: YYYYMMDD
  const year = folder.slice(0, 4);
  const month = Number(folder.slice(4, 6));
  const day = folder.slice(6, 8);
  const date = new Date(Number(year), month - 1, Number(day));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function GalleryPage() {
  const galleryRoot = path.join(process.cwd(), "public", "gallery");

  const dateFolders = fs
    .readdirSync(galleryRoot)
    .filter((name) => {
      const full = path.join(galleryRoot, name);
      return fs.statSync(full).isDirectory() && /^\d{8}$/.test(name);
    })
    .sort((a, b) => b.localeCompare(a)); // newest first

const CAPTIONS: Record<string, string> = {
  "20260320": "Congratulations to Dr. Jo on receiving the 2026 ACM SIGCHI Outstanding Dissertation Award 🎉",
  "20260326": "Official lab photo shoot 📸",
  "20260402": "A spring day out enjoying the cherry blossoms in Gyeongju 🌸",
};

  const groups = dateFolders.map((folder) => {
    const dir = path.join(galleryRoot, folder);
    const images = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b))
      .map((f) => `/gallery/${folder}/${f}`);
    return { folder, label: formatDate(folder), caption: CAPTIONS[folder] ?? "", images };
  });

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-16 text-center">
          <div className="brand-divider w-24 mb-5 mx-auto" />
          <h1 className="font-rajdhani text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Gallery
          </h1>
        </div>

        {/* Date groups */}
        <div className="space-y-12">
          {groups.map(({ folder, label, caption, images }) => (
            <section key={folder}>
              <h2 className="font-rajdhani text-2xl font-bold text-stone-800 mb-1">
                {label}
              </h2>
              {caption && (
                <p className="text-sm text-stone-400 font-normal mb-4">{caption}</p>
              )}
              {/* Horizontal scroll row */}
              <div className="overflow-x-auto">
                <div className="flex gap-3 pb-2" style={{ minWidth: "max-content" }}>
                  {images.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt={label}
                      style={{ height: "280px", width: "auto", flexShrink: 0 }}
                      className="rounded-lg object-cover"
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {groups.length === 0 && (
          <p className="text-center text-stone-400 py-16">No photos yet.</p>
        )}
      </div>
    </div>
  );
}
