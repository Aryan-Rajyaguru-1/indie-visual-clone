import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { 
    label: "Design Services", 
    hasDropdown: true,
    dropdownItems: [
      { label: "Brand Identity", href: "/services" },
      { label: "Web Design", href: "/services" },
      { label: "Social Media", href: "/services" },
      { label: "Packaging", href: "/services" },
      { label: "Print & Marketing", href: "/services" },
      { label: "Logo Design", href: "/services" },
    ]
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">AP</span>
            </div>
            <span className="text-xl font-semibold text-foreground">AP Creation</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none">
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.dropdownItems?.map((dropItem) => (
                      <DropdownMenuItem key={dropItem.label} asChild>
                        <Link to={dropItem.href}>{dropItem.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  to={item.href || "#"}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="max-w-32 truncate">{user.email}</span>
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
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
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
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  item.hasDropdown ? (
                    <div key={item.label} className="space-y-2">
                      <span className="text-base font-medium text-foreground">
                        {item.label}
                      </span>
                      <div className="pl-4 space-y-2">
                        {item.dropdownItems?.map((dropItem) => (
                          <Link
                            key={dropItem.label}
                            to={dropItem.href}
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {dropItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href || "#"}
                      className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
                {user ? (
                  <>
                    <div className="border-t border-border pt-4 mt-2">
                      <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
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
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="btn-primary mt-4 w-full justify-center">
                      Get a Quote
                    </Button>
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
