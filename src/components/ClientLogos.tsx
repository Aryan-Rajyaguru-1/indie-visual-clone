import { useState } from "react";

// Logo imports - ES6 imports from src/assets
import clientLogo1 from "@/assets/client-logo-1.jpg";
import clientLogo2 from "@/assets/client-logo-2.jpg";
import clientLogo3 from "@/assets/client-logo-3.jpg";
import clientLogo4 from "@/assets/client-logo-4.jpg";
import clientLogo5 from "@/assets/client-logo-5.jpg";
import clientLogo6 from "@/assets/client-logo-6.jpg";

const clients = [
  { name: "Estrallas", logo: clientLogo1 },
  { name: "Ecogen", logo: clientLogo2 },
  { name: "Fronius", logo: clientLogo3 },
  { name: "Zicad", logo: clientLogo4 },
  { name: "Kumar Products", logo: clientLogo5 },
  { name: "Krish", logo: clientLogo6 },
  { name: "Avitra", logo: clientLogo1 },
  { name: "Rappa Foods", logo: clientLogo2 },
  { name: "Adventure Times", logo: clientLogo3 },
  { name: "HHPW", logo: clientLogo4 },
  { name: "Capitate", logo: clientLogo5 },
  { name: "Ayunation", logo: clientLogo6 },
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

  // Split clients into two rows - 6 logos each
  const firstRowClients = clients.slice(0, 6);
  const secondRowClients = clients.slice(6);

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
