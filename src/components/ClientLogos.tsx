const clients = [
  "Philips",
  "Amazon",
  "Google",
  "Microsoft",
  "Samsung",
  "Apple",
  "Meta",
  "Netflix",
  "Spotify",
  "Adobe",
  "Salesforce",
  "Oracle",
];

export const ClientLogos = () => {
  return (
    <section className="py-16 bg-secondary/30 border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-center text-lg font-medium text-muted-foreground">
          Video Production that's Trusted - Across India.
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        <div className="flex marquee">
          {/* First set */}
          {clients.map((client, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-8 px-6 py-3 bg-card/50 rounded-lg border border-border/30"
            >
              <span className="text-muted-foreground font-medium text-lg whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {clients.map((client, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-8 px-6 py-3 bg-card/50 rounded-lg border border-border/30"
            >
              <span className="text-muted-foreground font-medium text-lg whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
