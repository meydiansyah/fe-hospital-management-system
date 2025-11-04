"use client";

import React, { useState } from "react";
import TopBar from "./TopNavbar";
import MainNav from "./MainNav";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [hideTopBar, setHideTopBar] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // scroll effect
  React.useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHideTopBar(currentY > lastScrollY && currentY > 10);
      lastScrollY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full">
        <TopBar hideTopBar={hideTopBar} />
        <MainNav
          hideTopBar={hideTopBar}
          onGetStarted={() => setShowAuthModal(true)}
        />
      </nav>
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  );
}
