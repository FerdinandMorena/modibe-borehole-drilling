import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { CONTACT } from "@/lib/site";

/**
 * Both faces are locked in. Fraunces carries every headline and the
 * Surface to Source narrative; Manrope carries nav, body and buttons.
 * `next/font` self-hosts them, so no request ever leaves for Google.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://modibeboreholedrilling.co.za"),
  title: {
    default: "Modibe Borehole Drilling — Surface to Source | Polokwane, Limpopo",
    template: "%s | Modibe Borehole Drilling",
  },
  description:
    "Family-run borehole drilling and water solutions in Polokwane, Limpopo. Drilling from 30m to 120m, casing, pumps, tanks and fittings — sixteen fixed packages, free transport within 65km.",
  keywords: [
    "borehole drilling Polokwane",
    "borehole drilling Limpopo",
    "water solutions Limpopo",
    "borehole prices South Africa",
    "submersible pump installation",
    "borehole casing",
  ],
  authors: [{ name: "Modibe Borehole Drilling" }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Modibe Borehole Drilling",
    title: "Modibe Borehole Drilling — Surface to Source",
    description:
      "Precision borehole drilling and full water-supply care across Polokwane and greater Limpopo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modibe Borehole Drilling — Surface to Source",
    description:
      "Precision borehole drilling and full water-supply care across Polokwane and greater Limpopo.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#041B2D",
  colorScheme: "light",
};

/**
 * LocalBusiness structured data. Only verified facts go in here — the region
 * is Polokwane/Limpopo with no street address on file, so `address` carries
 * locality and region only rather than a fabricated street line.
 */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Modibe Borehole Drilling",
  description:
    "Family-run borehole drilling and water solutions serving Polokwane and greater Limpopo.",
  telephone: CONTACT.phones.map((phone) => phone.tel),
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Polokwane",
    addressRegion: "Limpopo",
    addressCountry: "ZA",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Limpopo, South Africa",
  },
  priceRange: "R16700–R66800",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-ZA"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-foam font-sans text-ink">
        {/* Headings are hidden until SplitHeading reveals them; without
            JavaScript that reveal never runs, so unhide them here. */}
        <noscript>
          <style>{".split-heading{visibility:visible!important}"}</style>
        </noscript>

        <script
          type="application/ld+json"
          // Static, developer-authored JSON — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />

        <SmoothScroll>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
