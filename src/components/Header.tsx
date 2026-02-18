import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
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
  const { user, signOut } = useAuth() as any;
  const navigate = useNavigate();

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

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1 text-sm font-medium text-black hover:text-orange-500 transition-colors">
                        {item.label}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="w-[1200px] p-6">
                      <div className="grid grid-cols-5 gap-8">
                        <div>
                          <h5 className="text-lg font-semibold mb-3 text-orange-500">Graphic work</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/services#2d-3d-logo-design">2D/3D Logo Design</Link></li>
                            <li><Link to="/services#label-design">Label Design</Link></li>
                            <li><Link to="/services#product-3d-mockup">Product 3D & Mockup</Link></li>
                            <li><Link to="/services#box-packaging">Box Packaging</Link></li>
                            <li><Link to="/services#pouch-design">Pouch/Sachet Design</Link></li>
                            <li><Link to="/services#visual-aid">Visual Aid Design</Link></li>
                            <li><Link to="/services#banner-poster">Banner / Poster Design</Link></li>
                            <li><Link to="/services#business-cards">Business Card & Letterhead Design</Link></li>
                            <li><Link to="/services#bill-book">Bill Book Design</Link></li>
                            <li><Link to="/services#menu-card">Menu Card Design</Link></li>
                            <li><Link to="/services#doctor-file">Doctor File Design</Link></li>
                            <li><Link to="/services#calendar-design">Calendar Design</Link></li>
                            <li><Link to="/services#brochure-flyer">Brochure / Flyer Design</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-lg font-semibold mb-3 text-orange-500">Digital work</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/services#social-media-post">Social Media Post</Link></li>
                            <li><Link to="/services#campaign-post">Campaign Post</Link></li>
                            <li><Link to="/services#video-editing">Video Editing</Link></li>
                            <li><Link to="/services#ai-generated-video">Ai Generated Video</Link></li>
                            <li><Link to="/services#digital-visiting-card">Digital Visiting Card</Link></li>
                            <li><Link to="/services#digital-invitation">Digital Invitation Card</Link></li>
                            <li><Link to="/services#cover-pages">Instagram & Facebook cover page</Link></li>
                            <li><Link to="/services#youtube-thumbnail">YouTube Thumbnail Design</Link></li>
                            <li><Link to="/services#festival-offer">Festival & Offer Creatives</Link></li>
                            <li><Link to="/services#e-brochure">E-Brochure / PDF Presentation</Link></li>
                            <li><Link to="/services#highlight-icons">Highlight Icons for Instagram</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-lg font-semibold mb-3 text-orange-500">Marketing Services</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/services#ads-run">Instagram / Facebook / Google Ads Run</Link></li>
                            <li><Link to="/services#digital-marketing">Digital Marketing</Link></li>
                            <li><Link to="/services#google-business">Google Business Profile Setup & Management</Link></li>
                            <li><Link to="/services#seo">SEO (Search Engine Optimization)</Link></li>
                            <li><Link to="/services#whatsapp-api">WhatsApp API Integration</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-lg font-semibold mb-3">Web Designing & Developing</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/services#web-designing-developing">Web Designing & Developing</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-lg font-semibold mb-3">Photo & Video shoot</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/services#photo-video-shoot">Photo & Video shoot</Link></li>
                          </ul>
                        </div>
                      </div>
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
          </div>

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
