import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOIRÉ CACAO — An Obsession, Perfected",
  description:
    "Luxury artisanal chocolate crafted from the finest single-origin cacao. Experience the art of chocolate elevated.",
  keywords: [
    "luxury chocolate",
    "artisanal chocolate",
    "single-origin cacao",
    "gourmet dark chocolate",
    "bespoke gift box",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  function clean() {
                    var els = document.querySelectorAll('[bis_skin_checked], [bis_register]');
                    for (var j = 0; j < els.length; j++) {
                      els[j].removeAttribute('bis_skin_checked');
                      els[j].removeAttribute('bis_register');
                    }
                  }
                  clean();
                  if (typeof MutationObserver !== 'undefined') {
                    var obs = new MutationObserver(function(muts) {
                      for (var i = 0; i < muts.length; i++) {
                        var m = muts[i];
                        if (m.type === 'attributes' && m.attributeName && m.attributeName.indexOf('bis_') === 0) {
                          m.target.removeAttribute(m.attributeName);
                        }
                      }
                    });
                    obs.observe(document.documentElement, { attributes: true, subtree: true });
                    setTimeout(function() {
                      obs.disconnect();
                    }, 1500);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-cocoa)] selection:text-[var(--color-ivory)]"
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
