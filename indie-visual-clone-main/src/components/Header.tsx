import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import apLogo from "@/assets/ap-creation-logo.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Design Services",
    hasDropdown: true,
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { user, signOut } = useAuth() as any;
  const navigate = useNavigate();

  const submenuRefs = React.useRef<Array<HTMLUListElement | null>>([]);
  const headingRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const panelRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (openIndex === null) return;
      const headingEl = headingRefs.current[openIndex];
      const panelEl = panelRefs.current[openIndex];
      const target = e.target as Node;
      if (headingEl && headingEl.contains(target)) return;
      if (panelEl && panelEl.contains(target)) return;
      setOpenIndex(null);
    };

    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, [openIndex]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-white border-b border-gray-200 overflow-visible">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4 min-h-[80px]">
          {/* Left: Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex-shrink-0 flex items-center overflow-visible">
              <div className="overflow-visible flex items-center justify-center bg-white p-1">
                <img
                  id="site-logo"
                  src={apLogo}
                  alt="AP Creation"
                  className="h-[60px] w-auto max-w-none object-contain"
                  style={{ display: 'block' }}
                />
              </div>
            </Link>
          </div>

          {/* Center: Nav (visible on lg) - centered between logo and actions */}
          <nav className="hidden lg:flex items-center gap-8 justify-center flex-1">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-sm font-medium text-black hover:text-orange-500 transition-colors">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    sideOffset={17}
                    className="w-72 max-w-full p-4 bg-[#0f1113] rounded-2xl border border-gray-800 shadow-lg overflow-visible"
                  >
                    {/* Collapsed accordion view: show only headings and toggle submenu per section */}
                    {(() => {
                      const sections = [
                        {
                          title: 'Graphic work',
                          items: [
                            { label: '2D/3D Logo Design', href: '/services#2d-3d-logo-design' },
                            { label: 'Label Design', href: '/services#label-design' },
                            { label: 'Product 3D & Mockup', href: '/services#product-3d-mockup' },
                            { label: 'Box Packaging', href: '/services#box-packaging' },
                            { label: 'Pouch/Sachet Design', href: '/services#pouch-design' },
                            { label: 'Visual Aid Design', href: '/services#visual-aid' },
                            { label: 'Banner / Poster Design', href: '/services#banner-poster' },
                            { label: 'Business Card & Letterhead Design', href: '/services#business-cards' },
                            { label: 'Bill Book Design', href: '/services#bill-book' },
                            { label: 'Menu Card Design', href: '/services#menu-card' },
                            { label: 'Doctor File Design', href: '/services#doctor-file' },
                            { label: 'Calendar Design', href: '/services#calendar-design' },
                            { label: 'Brochure / Flyer Design', href: '/services#brochure-flyer' },
                          ],
                        },
                        {
                          title: 'Digital work',
                          items: [
                            { label: 'Social Media Post', href: '/services#social-media-post' },
                            { label: 'Campaign Post', href: '/services#campaign-post' },
                            { label: 'Video Editing', href: '/services#video-editing' },
                            { label: 'Ai Generated Video', href: '/services#ai-generated-video' },
                            { label: 'Digital Visiting Card', href: '/services#digital-visiting-card' },
                            { label: 'Digital Invitation Card', href: '/services#digital-invitation' },
                            { label: 'Instagram & Facebook cover page', href: '/services#cover-pages' },
                            { label: 'YouTube Thumbnail Design', href: '/services#youtube-thumbnail' },
                            { label: 'Festival & Offer Creatives', href: '/services#festival-offer' },
                            { label: 'E-Brochure / PDF Presentation', href: '/services#e-brochure' },
                            { label: 'Highlight Icons for Instagram', href: '/services#highlight-icons' },
                          ],
                        },
                        {
                          title: 'Marketing Services',
                          items: [
                            { label: 'Instagram / Facebook / Google Ads Run', href: '/services#ads-run' },
                            { label: 'Digital Marketing', href: '/services#digital-marketing' },
                            { label: 'Google Business Profile Setup & Management', href: '/services#google-business' },
                            { label: 'SEO (Search Engine Optimization)', href: '/services#seo' },
                            { label: 'WhatsApp API Integration', href: '/services#whatsapp-api' },
                          ],
                        },
                        {
                          title: 'Web Designing & Developing',
                          items: [
                            { label: 'Web Designing & Developing', href: '/services#web-designing-developing' },
                          ],
                        },
                        {
                          title: 'Photo & Video shoot',
                          items: [
                            { label: 'Photo & Video shoot', href: '/services#photo-video-shoot' },
                          ],
                        },
                      ];

                      return (
                        <div className="space-y-6">
                          {sections.map((sec, i) => (
                            <div key={sec.title} className="relative">
                              <div ref={(el) => (headingRefs.current[i] = el)} className="relative py-3">
                                <div className="text-xl font-semibold text-orange-500 pl-1">{sec.title}</div>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenIndex(openIndex === i ? null : i);
                                  }}
                                  aria-expanded={openIndex === i}
                                  aria-controls={`submenu-${i}`}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted"
                                >
                                  <ChevronRight className={`w-5 h-5 text-white transition-transform duration-300 ${openIndex === i ? 'rotate-90' : ''}`} />
                                </button>
                              </div>

                              <div
                                id={`submenu-${i}`}
                                ref={(el) => (panelRefs.current[i] = el)}
                                className="absolute left-full top-0 ml-2 w-56 bg-[#0f1113] text-white border border-gray-700 rounded-2xl shadow-lg p-3 z-[10005] transition-all duration-300 ease-in-out"
                                style={{
                                  transform: openIndex === i ? 'translateX(0)' : 'translateX(-12px)',
                                  opacity: openIndex === i ? 1 : 0,
                                  pointerEvents: openIndex === i ? 'auto' : 'none',
                                }}
                                aria-hidden={openIndex !== i}
                              >
                                <ul className="text-sm text-muted-foreground">
                                  {sec.items.map((it) => (
                                    <li key={it.label} className="py-1">
                                      <Link to={it.href} className="block hover:text-orange-500">
                                        {it.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  key={item.label}
                  href={item.href || "#"}
                  className="flex items-center gap-1 text-sm font-medium text-black hover:text-orange-500 transition-colors"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600 border-orange-500 px-6 py-2">
                    <User className="w-5 h-5" />
                    <span className="text-sm font-semibold">Get Quote</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="btn-primary">Get a Quote</Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-black hover:bg-secondary rounded-md transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black border-t border-gray-700"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    item.hasDropdown ? (
                      <div key={item.label} className="space-y-2">
                        <span className="text-base font-medium text-white">{item.label}</span>
                        <div className="pl-4 space-y-2">
                          {/* For mobile we simply link to services page anchors */}
                          <Link
                            to="/services"
                            className="block text-sm text-gray-300 hover:text-orange-500 transition-colors py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            View Services
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.href || "#"}
                        className="text-base font-medium text-gray-300 hover:text-orange-500 transition-colors py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}

                  {user ? (
                    <div className="border-t border-gray-700 pt-4 mt-2">
                      <p className="text-sm text-gray-300 mb-2">Get Quote</p>
                      <Button
                        variant="destructive"
                        className="w-full justify-center"
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button className="btn-primary mt-4 w-full justify-center px-6 py-3">Get a Quote</Button>
                    </Link>
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
