import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search, MapPin } from "lucide-react";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const slides = [
    {
      title: "Find Your Perfect Doctor",
      description:
        "Connect with experienced healthcare professionals in your area. Quality care is just a search away.",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80",
      background:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80",
    },
    {
      title: "Expert Medical Care",
      description:
        "Access specialized healthcare professionals across multiple disciplines. Your health, our priority.",
      image:
        "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
      background:
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&q=80",
    },
    {
      title: "Healthcare Made Simple",
      description:
        "Book appointments, consult online, and manage your health journey all in one place.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      background:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1920&q=80",
    },
  ];

  const stats = [
    { label: "Happy Patients", value: 12500, suffix: "+" },
    { label: "Expert Doctors", value: 250, suffix: "+" },
    { label: "Hospitals", value: 15, suffix: "" },
    { label: "Years of Experience", value: 20, suffix: "" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Animate statistics on mount
  useEffect(() => {
    const duration = 2000;
    const start = performance.now();
    let animationFrameId: number;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const updated = stats.map((stat) => Math.floor(stat.value * progress));
      setCounts(updated);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, "in", location);
    alert(`Searching for "${searchQuery}" in "${location}"`);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Images Layer */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={`bg-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.background}
              alt=""
              fill
              priority={index === 0}
              quality={85}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-screen flex items-center z-10">
        <div className="w-full lg:w-1/2 space-y-8 text-left max-w-xl">
          {/* Sliding Title and Description */}
          <div className="relative min-h-[12rem]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  {slide.title}
                </h1>

                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Search Card - Bottom (Above Statistics) */}
      {/* <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 z-30">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for doctors, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>

            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Find Doctor
            </button>
          </div>
        </div>
      </div> */}

      <SearchBar />

      {/* Statistics Section - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary py-10 z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-20">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-4">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {counts[idx].toLocaleString()}
                  {stat.suffix}
                </span>
                <p className="text-gray-200 font-medium xl:text-xl text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-[22rem] md:bottom-80 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-10"
                : "bg-white/50 w-3 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
