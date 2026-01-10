import { useState } from "react";

// Logo imports - add your Zicad logo here
const zicadLogo = "/assets/zicad-logo.jpg"; // Path relative to public folder
const estrellasLogo = "/assets/estrellas-logo.jpg"; // Path relative to public folder
const coronaLogo = "/assets/corona-logo.jpg"; // Path relative to public folder
const froniusLogo = "/assets/fronius-logo.jpg"; // Path relative to public folder
const accretionLogo = "/assets/accretion-logo.jpg"; // Path relative to public folder
const kumarLogo = "/assets/kumar-logo.jpg"; // Path relative to public folder
const sanitasLogo = "/assets/sanitas-logo.jpg"; // Path relative to public folder
const maapharmaLogo = "/assets/maapharma-logo.jpg"; // Path relative to public folder
const skylinkLogo = "/assets/skylink-logo.jpg"; // Path relative to public folder
const avitrLogo = "/assets/avitr-logo.jpg"; // Path relative to public folder
const everalLogo = "/assets/everal-logo.jpg"; // Path relative to public folder
const ayunationLogo = "/assets/ayunation-logo.jpg"; // Path relative to public folder
const jainikLogo = "/assets/jainik-logo.jpg"; // Path relative to public folder
const bshardaLogo = "/assets/bsharda-logo.jpg"; // Path relative to public folder

const clients = [
  { name: "Estrallas", logo: estrellasLogo },
  { name: "Ecogen", logo: coronaLogo },
  { name: "Fronius", logo: froniusLogo },
  { name: "Zicad", logo: zicadLogo },
  { name: "Kumar products", logo: accretionLogo },
  { name: "Krish", logo: kumarLogo },
  { name: "Avitra", logo: avitrLogo },
  { name: "Rappa foods", logo: sanitasLogo },
  { name: "Adventure times", logo: maapharmaLogo },
  { name: "hhpw", logo: skylinkLogo },
  { name: "Capitate", logo: everalLogo },
  { name: "Ayunation", logo: ayunationLogo },
];

export const ClientLogos = () => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (clientName: string) => {
    setImageErrors(prev => new Set(prev).add(clientName));
  };

  const renderClient = (client: string | { name: string; logo: string }, index: number, keyPrefix: string) => {
    const clientName = typeof client === 'string' ? client : client.name;
    const clientLogo = typeof client === 'object' ? client.logo : null;

    return (
      <div
        key={`${keyPrefix}-${index}`}
        className="flex-shrink-0 mx-8 bg-card/50 rounded-lg border border-border/30 hover:bg-card/70 transition-colors"
      >
        {clientLogo && !imageErrors.has(clientName) ? (
          <img
            src={clientLogo}
            alt={clientName}
            onError={() => handleImageError(clientName)}
            className="h-24 w-auto object-contain rounded-lg hover:brightness-110 transition-all duration-300"
          />
        ) : (
          <span className="text-muted-foreground font-medium text-sm whitespace-nowrap">
            {clientName}
          </span>
        )}
      </div>
    );
  };

  // Split clients into two rows - 7 logos each
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
