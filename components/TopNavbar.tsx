"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Phone,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  MapPin,
  Ambulance,
  Globe,
  MessageSquareText,
  Dot,
  ChevronDown,
} from "lucide-react";
import { RootState, AppDispatch } from "@/store";
import { setLanguage } from "@/store/slices/languageSlice";
import { fetchHospitals } from "@/store/slices/masterDataSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TopBarProps {
  hideTopBar: boolean;
}

export default function TopBar({ hideTopBar }: TopBarProps) {
  const { t, i18n } = useTranslation();
  const lang = useSelector((state: RootState) => state.language.lang);
  const dispatch = useDispatch<AppDispatch>();
  // Get hospitals for social media links
  const { hospitals } = useSelector((state: RootState) => state.masterData);

  type LocationCoords = {
    lat: number;
    lng: number;
    timestamp: number;
  };

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLocationActive, setIsLocationActive] = useState<boolean>(false);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationCoords, setLocationCoords] = useState<LocationCoords | null>(
    null
  );
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "live-location-active",
      String(isLocationActive)
    );
  }, [isLocationActive]);

  const changeLanguage = (newLang: string) => {
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedActive = window.localStorage.getItem("live-location-active");
    const storedCoords = window.localStorage.getItem("live-location-coords");
    window.setTimeout(() => {
      if (storedActive !== null) {
        setIsLocationActive(storedActive === "true");
      }
      if (storedCoords) {
        try {
          const parsed = JSON.parse(storedCoords) as LocationCoords;
          setLocationCoords(parsed);
        } catch {
          window.localStorage.removeItem("live-location-coords");
        }
      }
    }, 0);
  }, []);

  const formattedCoords = useMemo(() => {
    if (!locationCoords) return null;
    try {
      const formatter = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      const date = new Date(locationCoords.timestamp).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      });
      return `${formatter.format(locationCoords.lat)}, ${formatter.format(
        locationCoords.lng
      )} · ${date}`;
    } catch {
      return null;
    }
  }, [locationCoords]);

  const handleDeactivateLocation = () => {
    setIsLocationActive(false);
    setLocationCoords(null);
    setLocationError(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("live-location-coords");
      window.localStorage.setItem("live-location-permission", "inactive");
    }
  };

  const handleOpenLocationModal = () => {
    setLocationError(null);
    setIsLocationModalOpen(true);
    if (typeof window === "undefined") return;
    if (!("geolocation" in navigator)) {
      setLocationError(
        t("topbar.location_modal.unsupported", {
          defaultValue:
            "Perangkat Anda tidak mendukung layanan lokasi langsung.",
        })
      );
      window.localStorage.setItem("live-location-permission", "unsupported");
      return;
    }
    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((status) => {
          if (status.state === "denied") {
            setLocationError(
              t("topbar.location_modal.permission_denied", {
                defaultValue:
                  "Akses lokasi diblokir oleh browser. Silakan buka pengaturan izin situs untuk mengaktifkannya kembali.",
              })
            );
            window.localStorage.setItem("live-location-permission", "denied");
          }
        })
        .catch(() => {
          /* ignore permissions errors */
        });
    }
  };

  const handleActivateLocation = () => {
    if (typeof window === "undefined") return;
    if (!("geolocation" in navigator)) {
      setLocationError(
        t("topbar.location_modal.unsupported", {
          defaultValue:
            "Perangkat Anda tidak mendukung layanan lokasi langsung.",
        })
      );
      return;
    }
    setLocationError(null);
    setIsRequestingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const payload = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
        };
        setLocationCoords(payload);
        window.localStorage.setItem(
          "live-location-coords",
          JSON.stringify(payload)
        );
        setIsLocationActive(true);
        window.localStorage.setItem("live-location-permission", "granted");
        setIsRequestingLocation(false);
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? t("topbar.location_modal.permission_denied", {
                defaultValue:
                  "Akses lokasi ditolak. Silakan izinkan lokasi pada browser Anda lalu coba lagi.",
              })
            : t("topbar.location_modal.generic_error", {
                defaultValue:
                  "Gagal mendapatkan lokasi. Pastikan layanan lokasi aktif dan sinyal stabil.",
              });
        setLocationError(message);
        window.localStorage.setItem(
          "live-location-permission",
          error.code === error.PERMISSION_DENIED ? "denied" : "error"
        );
        setIsLocationActive(false);
        setIsRequestingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleToggleLocation = () => {
    if (isLocationActive) {
      handleDeactivateLocation();
    } else {
      handleActivateLocation();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLang = window.localStorage.getItem("lang");
    if (storedLang) {
      dispatch(setLanguage(storedLang));
    }
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  // Auto-refresh hospitals when live location is active
  useEffect(() => {
    if (isLocationActive) {
      // Fetch immediately when location becomes active
      dispatch(fetchHospitals());

      // Set up interval to fetch every 30 seconds
      intervalRef.current = setInterval(() => {
        dispatch(fetchHospitals());
      }, 30000); // 30 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else {
      // Clear interval when location is deactivated
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isLocationActive, dispatch]);

  // Helper function to get icon by social media name
  const getSocialIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("instagram")) return Instagram;
    if (lowerName.includes("youtube")) return Youtube;
    if (lowerName.includes("facebook")) return Facebook;
    if (lowerName.includes("twitter") || lowerName.includes("x"))
      return Twitter;
    return Instagram; // Default
  };

  // Helper function to get label by social media name
  const getSocialLabel = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("instagram"))
      return t("topbar.instagram") || "Instagram";
    if (lowerName.includes("youtube")) return t("topbar.youtube") || "YouTube";
    if (lowerName.includes("facebook")) return "Facebook";
    if (lowerName.includes("twitter") || lowerName.includes("x"))
      return "Twitter";
    return name; // Return original name if no match
  };

  // Extract social media links from all hospitals
  const socialMediaLinks = useMemo(() => {
    const socialMap = new Map<
      string,
      { name: string; icon: typeof Instagram; href: string; label: string }
    >();

    // Collect social media from all active hospitals
    hospitals
      .filter((h) => h.is_active)
      .forEach((hospital) => {
        // Check if hospital has social media data (could be in various formats)
        // Try common field names that might exist in API response
        const hospitalData = hospital as unknown as Record<string, unknown>;

        // Check for social_media array (most common format)
        if (
          hospitalData.social_media &&
          Array.isArray(hospitalData.social_media)
        ) {
          (
            hospitalData.social_media as Array<{
              name?: string;
              platform?: string;
              type?: string;
              url?: string;
              href?: string;
              link?: string;
              is_active?: boolean;
            }>
          ).forEach((social) => {
            // Skip inactive social media
            if (social.is_active === false) return;

            const name = social.name || social.platform || social.type || "";
            const url = social.url || social.href || social.link || "";
            if (name && url && typeof url === "string") {
              const key = name.toLowerCase().trim();
              // Only add if URL is valid
              if (url.startsWith("http://") || url.startsWith("https://")) {
                if (!socialMap.has(key)) {
                  socialMap.set(key, {
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    icon: getSocialIcon(name),
                    href: url,
                    label: getSocialLabel(name),
                  });
                }
              }
            }
          });
        }

        // Check for individual social media fields (if API provides them as separate fields)
        const socialFields = [
          { field: "instagram_url", platform: "instagram" },
          { field: "youtube_url", platform: "youtube" },
          { field: "facebook_url", platform: "facebook" },
          { field: "twitter_url", platform: "twitter" },
          { field: "social_instagram", platform: "instagram" },
          { field: "social_youtube", platform: "youtube" },
          { field: "social_facebook", platform: "facebook" },
          { field: "social_twitter", platform: "twitter" },
          { field: "instagram", platform: "instagram" },
          { field: "youtube", platform: "youtube" },
          { field: "facebook", platform: "facebook" },
          { field: "twitter", platform: "twitter" },
        ];

        socialFields.forEach(({ field, platform }) => {
          const url = hospitalData[field] as string | undefined;
          if (url && typeof url === "string" && url.trim()) {
            const key = platform;
            // Only add if URL is valid and not already in map
            if (
              (url.startsWith("http://") || url.startsWith("https://")) &&
              !socialMap.has(key)
            ) {
              socialMap.set(key, {
                name: platform.charAt(0).toUpperCase() + platform.slice(1),
                icon: getSocialIcon(platform),
                href: url,
                label: getSocialLabel(platform),
              });
            }
          }
        });
      });

    // Convert map to array and sort by name
    const links = Array.from(socialMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // If no social media found from hospitals, use default links
    if (links.length === 0) {
      return [
        {
          name: "Instagram",
          icon: Instagram,
          href: "https://instagram.com/sentramedika",
          label: t("topbar.instagram") || "Instagram",
        },
        {
          name: "YouTube",
          icon: Youtube,
          href: "https://youtube.com/@sentramedika",
          label: t("topbar.youtube") || "YouTube",
        },
        {
          name: "Facebook",
          icon: Facebook,
          href: "https://facebook.com/sentramedika",
          label: "Facebook",
        },
        {
          name: "Twitter",
          icon: Twitter,
          href: "https://twitter.com/sentramedika",
          label: "Twitter",
        },
      ];
    }

    return links;
  }, [hospitals, t]);

  return (
    <motion.div
      className="border-b border-slate-200 bg-[#f8f9fd] text-xs text-slate-600 ease-in duration-400"
      style={{ y: hideTopBar ? -50 : 0 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="hidden w-full items-center gap-4 md:flex">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 font-medium">
              <Phone className="h-4 w-4" aria-hidden />
              {t("contact_us")}
            </span>
            <div className="h-4 w-px bg-slate-300" />
            <DropdownMenu
              open={isSocialMenuOpen}
              onOpenChange={setIsSocialMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 hover:text-slate-900 focus:outline-none"
                >
                  <Instagram className="h-4 w-4" aria-hidden />
                  <span>{t("topbar.social_media") || "Media Sosial"}</span>
                  <ChevronDown className="h-3 w-3" aria-hidden />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {socialMediaLinks.map((social) => (
                  <DropdownMenuItem
                    key={social.name}
                    asChild
                    className="cursor-pointer"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <social.icon className="h-4 w-4" />
                      <span>{social.label}</span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="h-4 w-px bg-slate-300" />
            <Link
              href="/feedback"
              className="flex items-center gap-2 hover:text-slate-900"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden />
              {t("feedback.title")}
            </Link>
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-4 md:gap-6">
          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={handleOpenLocationModal}
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-1 font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              <span className="inline-flex items-center gap-2">
                <span
                  className={clsx(
                    "h-2 w-2 rounded-full",
                    isLocationActive
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-slate-300"
                  )}
                />
                {isLocationActive
                  ? t("topbar.location_active", {
                      defaultValue: t("topbar.activate_location"),
                    })
                  : t("topbar.activate_location")}
              </span>
            </button>
            <div className="h-4 w-px bg-slate-300" />
            <span className="flex items-center gap-2 font-medium text-red-600">
              <Ambulance className="h-4 w-4" aria-hidden />
              {t("topbar.er_24_hours")}
            </span>
            <div className="h-4 w-px bg-slate-300" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 rounded-full border border-transparent px-3 py-1 font-medium text-slate-600 hover:border-slate-200 hover:bg-white"
              >
                <Globe className="h-4 w-4" aria-hidden />
                <span className="uppercase">{lang}</span>
                <Dot className="h-4 w-4 text-red-500" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 text-sm">
              <DropdownMenuItem
                onClick={() => changeLanguage("en")}
                className={clsx(
                  "cursor-pointer",
                  lang === "en" && "bg-slate-100 font-medium"
                )}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => changeLanguage("id")}
                className={clsx(
                  "cursor-pointer",
                  lang === "id" && "bg-slate-100 font-medium"
                )}
              >
                Bahasa Indonesia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-4 py-2 text-[11px] text-slate-600 md:hidden">
        <span className="flex items-center gap-2 font-medium">
          <Phone className="h-3.5 w-3.5" aria-hidden />
          {t("contact_us")}
        </span>
        <span className="flex items-center gap-2 font-medium text-red-600">
          <Ambulance className="h-3.5 w-3.5" aria-hidden />
          {t("topbar.er_24_hours")}
        </span>
      </div>

      <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t("topbar.location_modal.title", {
                defaultValue: "Kontrol Lokasi Langsung",
              })}
            </DialogTitle>
            <DialogDescription>
              {t("topbar.location_modal.description", {
                defaultValue:
                  "Aktifkan lokasi langsung untuk mendapatkan rekomendasi layanan dan estimasi waktu tempuh yang lebih akurat.",
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-relaxed text-slate-600">
            {isRequestingLocation
              ? t("topbar.location_modal.requesting", {
                  defaultValue:
                    "Sedang memuat lokasi terkini... mohon tetap berada di area dengan sinyal baik.",
                })
              : isLocationActive
              ? t("topbar.location_modal.active_message", {
                  defaultValue:
                    "Lokasi langsung sedang diaktifkan. Kami hanya menggunakan data ini untuk meningkatkan pengalaman Anda.",
                })
              : t("topbar.location_modal.inactive_message", {
                  defaultValue:
                    "Lokasi langsung saat ini nonaktif. Aktifkan untuk mempermudah pencarian fasilitas terdekat.",
                })}
          </div>
          <div className="space-y-3 text-sm">
            {formattedCoords && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-emerald-700">
                {t("topbar.location_modal.last_known", {
                  defaultValue: "Lokasi terakhir tercatat:",
                })}{" "}
                <span className="font-semibold text-emerald-900">
                  {formattedCoords}
                </span>
              </div>
            )}
            {locationError && (
              <div className="rounded-xl border border-rose-100 bg-rose-50/70 px-3 py-2 text-rose-600">
                {locationError}
              </div>
            )}
          </div>
          <DialogFooter className="flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsLocationModalOpen(false);
                setIsRequestingLocation(false);
              }}
            >
              {t("common.close", { defaultValue: "Tutup" })}
            </Button>
            <Button
              onClick={handleToggleLocation}
              disabled={isRequestingLocation}
            >
              {isLocationActive
                ? t("topbar.location_modal.deactivate", {
                    defaultValue: "Nonaktifkan Lokasi",
                  })
                : t("topbar.location_modal.activate", {
                    defaultValue: "Aktifkan Lokasi",
                  })}
              {isRequestingLocation && (
                <span className="ml-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
