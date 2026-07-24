import { useEffect, useState } from "react";

// Tiny external store so the 3D staircase canvas (mounted on the Home page)
// can know whether a nav dropdown/mobile menu is open (mounted in the
// persistent Navbar) without threading props through the route tree.
let isOpen = false;
const listeners = new Set();

export function setNavMenuOpen(value) {
  if (isOpen === value) return;
  isOpen = value;
  listeners.forEach((listener) => listener(isOpen));
}

export function useNavMenuOpen() {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    listeners.add(setOpen);
    return () => listeners.delete(setOpen);
  }, []);
  return open;
}
