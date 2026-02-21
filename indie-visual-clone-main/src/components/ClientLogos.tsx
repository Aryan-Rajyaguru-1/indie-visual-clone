import { useState } from "react";

// Logo imports - ES6 imports from src/assets
import clientLogoZicad from "@/assets/client-logo-zicad.jpg";
import clientLogoEstrellas from "@/assets/client-logo-estrellas.jpg";
import clientLogoCoronaEcogen from "@/assets/client-logo-corona-ecogen.jpg";
import clientLogoFronius from "@/assets/client-logo-fronius.jpg";
import clientLogoEveral from "@/assets/client-logo-everal.jpg";
import clientLogoBSharda from "@/assets/client-logo-b-sharda.jpg";
import clientLogoKumar from "@/assets/client-logo-kumar.jpg";
import clientLogoMaaPharma from "@/assets/client-logo-maa-pharma.jpg";
import clientLogoSanitas from "@/assets/client-logo-sanitas.jpg";
import clientLogoSkylink from "@/assets/client-logo-skylink.jpg";
import clientLogoAccretion from "@/assets/client-logo-accretion.jpg";
import clientLogoAyunation from "@/assets/client-logo-ayunation.jpg";
import clientLogoJainik from "@/assets/client-logo-jainik.jpg";

const clients = [
  { name: "zicad Life care", logo: clientLogoZicad },
  { name: "Estrellas", logo: clientLogoEstrellas },
  { name: "Corona Ecogen", logo: clientLogoCoronaEcogen },
  { name: "Fronius", logo: clientLogoFronius },
  { name: "Everal Life Sciences", logo: clientLogoEveral },
  { name: "B Sharda Logo", logo: clientLogoBSharda },
  { name: "Kumar Products", logo: clientLogoKumar },
  { name: "Maa Pharma Tech", logo: clientLogoMaaPharma },
  { name: "Sanitas", logo: clientLogoSanitas },
  { name: "Skylink Pharma", logo: clientLogoSkylink },
  { name: "Accretion", logo: clientLogoAccretion },
  { name: "Ayunation", logo: clientLogoAyunation },
  { name: "Jainik Ayurveda", logo: clientLogoJainik },
];

export const ClientLogos = () => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (clientName: string) => {
    setImageErrors(prev => new Set(prev).add(clientName));
  };

  const renderClient = (client: { name: string; logo: string }, index: number, keyPrefix: string) => {
    return (
      <div
        key={`${keyPrefix}-${index}`}
        className="flex-shrink-0 mx-8 bg-card/50 rounded-lg border border-border/30 hover:bg-card/70 transition-colors"
      >
        {!imageErrors.has(client.name) ? (
          <img
            src={client.logo}
            alt={client.name}
            onError={() => handleImageError(client.name)}
            className="h-24 w-auto object-contain rounded-lg hover:brightness-110 transition-all duration-300"
          />
        ) : (
          <span className="text-muted-foreground font-medium text-sm whitespace-nowrap p-4">
            {client.name}
          </span>
        )}
      </div>
    );
  };

  // Split clients into two rows - 7 logos in first row, 6 in second
  const firstRowClients = clients.slice(0, 7);
  const secondRowClients = clients.slice(7);

  return (
    <section className="py-16 bg-secondary/30 border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-center text-lg font-medium text-muted-foreground">
          Trusted by Leading Brands Worldwide
        </h2>
      </div>

      {/* First Row - Left to Right */}
      <div className="relative mb-8">
        <div className="flex marquee" style={{ minWidth: '200%' }}>
          {firstRowClients.map((client, index) => renderClient(client, index, 'first-row-1'))}
          {firstRowClients.map((client, index) => renderClient(client, index, 'first-row-2'))}
        </div>
      </div>

      {/* Second Row - Right to Left */}
      <div className="relative">
        <div className="flex marquee-reverse" style={{ minWidth: '200%' }}>
          {secondRowClients.map((client, index) => renderClient(client, index, 'second-row-1'))}
          {secondRowClients.map((client, index) => renderClient(client, index, 'second-row-2'))}
        </div>
      </div>
    </section>
  );
};
