"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  Calendar,
  Clock,
  Search,
  User,
  Settings,
  LogOut,
  Star,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */
interface UserData {
  name: string;
  email: string;
  avatar: string;
}

type AppointmentStatus = "upcoming" | "completed" | "cancelled";

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  location: string;
  date: string;
  time: string;
  queueNumber: number;
  status: AppointmentStatus;
  rating?: number;
}

/* -------------------------------------------------------------------------- */
/*                               Mock & API Data                              */
/* -------------------------------------------------------------------------- */
const mockData = {
  user: {
    name: "Vozu Narapati",
    email: "vozunarapati@gmail.com",
    avatar: "/api/placeholder/100/100",
  },
  upcomingAppointment: {
    id: 1,
    doctor: "dr Abdullah Shidqul Azmi",
    specialty: "Penyakit Dalam",
    location: "Sentra medika Cisalak",
    date: "4 Sep 2025",
    time: "10:30",
    queueNumber: 10,
    status: "upcoming" as AppointmentStatus,
  },
  appointments: [
    {
      id: 2,
      doctor: "dr Abdullah Shidqul Azmi, Sp.PD",
      specialty: "Penyakit Dalam",
      location: "Sentra medika Cibinong",
      date: "4 Sep 2025",
      time: "10:30",
      queueNumber: 19,
      status: "completed" as AppointmentStatus,
      rating: 5,
    },
    {
      id: 3,
      doctor: "dr Abdullah Shidqul Azmi, Sp.PD",
      specialty: "Penyakit Dalam",
      location: "Sentra medika Cibinong",
      date: "4 Sep 2025",
      time: "10:30",
      queueNumber: 9,
      status: "cancelled" as AppointmentStatus,
    },
    {
      id: 4,
      doctor: "dr Abdullah Shidqul Azmi, Sp.PD",
      specialty: "Penyakit Dalam",
      location: "Sentra medika Cisalak",
      date: "5 Sep 2025",
      time: "14:00",
      queueNumber: 5,
      status: "completed" as AppointmentStatus,
      rating: 4,
    },
  ],
};

const apiService = {
  fetchUserData: async (): Promise<UserData> => {
    await new Promise((r) => setTimeout(r, 1000));
    return mockData.user;
  },
  fetchUpcomingAppointment: async (): Promise<Appointment> => {
    await new Promise((r) => setTimeout(r, 1000));
    return mockData.upcomingAppointment;
  },
  fetchAppointments: async (): Promise<Appointment[]> => {
    await new Promise((r) => setTimeout(r, 1200));
    return mockData.appointments;
  },
};

/* -------------------------------------------------------------------------- */
/*                                 Context                                    */
/* -------------------------------------------------------------------------- */
interface DashboardState {
  user: UserData | null;
  upcomingAppointment: Appointment | null;
  appointments: Appointment[];
  loading: boolean;
  searchQuery: string;
  dataSource: "mock" | "api";
}

interface DashboardActions {
  loadMockData: () => void;
  loadApiData: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  cancelAppointment: (id: number) => void;
}

interface DashboardContextProps {
  state: DashboardState;
  actions: DashboardActions;
}

const DashboardContext = createContext<DashboardContextProps | null>(null);

const useDashboard = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};

const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DashboardState>({
    user: null,
    upcomingAppointment: null,
    appointments: [],
    loading: false,
    searchQuery: "",
    dataSource: "mock",
  });

  const actions: DashboardActions = {
    loadMockData: () => {
      setState((prev) => ({ ...prev, loading: true, dataSource: "mock" }));
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          user: mockData.user,
          upcomingAppointment: mockData.upcomingAppointment,
          appointments: mockData.appointments,
          loading: false,
        }));
      }, 100);
    },
    loadApiData: async () => {
      setState((prev) => ({ ...prev, loading: true, dataSource: "api" }));
      try {
        const [userData, upcomingData, appointmentsData] = await Promise.all([
          apiService.fetchUserData(),
          apiService.fetchUpcomingAppointment(),
          apiService.fetchAppointments(),
        ]);
        setState((prev) => ({
          ...prev,
          user: userData,
          upcomingAppointment: upcomingData,
          appointments: appointmentsData,
          loading: false,
        }));
      } catch (error) {
        console.error("Error loading data:", error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    setSearchQuery: (query) =>
      setState((prev) => ({ ...prev, searchQuery: query })),
    cancelAppointment: (id) => {
      setState((prev) => ({
        ...prev,
        appointments: prev.appointments.map((apt) =>
          apt.id === id ? { ...apt, status: "cancelled" } : apt
        ),
        upcomingAppointment:
          prev.upcomingAppointment?.id === id
            ? { ...prev.upcomingAppointment, status: "cancelled" }
            : prev.upcomingAppointment,
      }));
    },
  };

  return (
    <DashboardContext.Provider value={{ state, actions }}>
      {children}
    </DashboardContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                               Components                                   */
/* -------------------------------------------------------------------------- */
const Sidebar: React.FC = () => {
  const { state } = useDashboard();
  const { user } = state;

  return (
    <div className="w-80 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a] text-white flex flex-col sticky top-40 h-full rounded-md">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-8">Dashboard Pasien</h1>

        <div className="bg-[#e8f0fe] rounded-xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-14 h-14">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-blue-500 text-white">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-base">
                {user?.name}
              </h3>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {user?.email}
              </p>
            </div>
          </div>
          <Button className="w-full bg-[#5b9cff] hover:bg-[#4a8ce8] text-white text-sm">
            Daftar VIP
          </Button>
        </div>

        <nav className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-white/5 transition-colors text-sm">
            <Calendar className="w-4 h-4" />
            <span>Riwayat Konsultasi</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-white/5 transition-colors text-sm">
            <User className="w-4 h-4" />
            <span>Daftar Profil</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-white/5 transition-colors text-sm">
            <Settings className="w-4 h-4" />
            <span>Pengaturan</span>
          </button>
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-white/5 transition-colors text-sm">
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

const DataSourceToggle: React.FC = () => {
  const { state, actions } = useDashboard();
  const { dataSource, loading } = state;

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 mb-6">
      <Button
        variant={dataSource === "mock" ? "default" : "ghost"}
        size="sm"
        onClick={actions.loadMockData}
        disabled={loading}
        className={dataSource === "mock" ? "bg-[#0a0e27]" : ""}
      >
        Mock Data
      </Button>
      <Button
        variant={dataSource === "api" ? "default" : "ghost"}
        size="sm"
        onClick={actions.loadApiData}
        disabled={loading}
        className={dataSource === "api" ? "bg-[#0a0e27]" : ""}
      >
        API Data
      </Button>
    </div>
  );
};

interface AppointmentCardProps {
  appointment: Appointment;
  isUpcoming?: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  isUpcoming = false,
}) => {
  const { actions } = useDashboard();

  const getStatusBadge = () => {
    const statusMap: Record<AppointmentStatus, string> = {
      upcoming: "bg-blue-500",
      completed: "bg-green-500",
      cancelled: "bg-red-500",
    };
    return (
      <Badge className={`${statusMap[appointment.status]} text-white text-xs`}>
        {appointment.status === "upcoming"
          ? "Mendatang"
          : appointment.status === "completed"
          ? "Selesai"
          : "Batal"}
      </Badge>
    );
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="w-12 h-12 mt-1">
              <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                {appointment.doctor.split(" ")[1]?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-base mb-0.5">
                {appointment.doctor}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {appointment.specialty}
              </p>
              <p className="text-sm text-blue-600">{appointment.location}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                <span>
                  {appointment.date}, {appointment.time}
                </span>
              </div>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">No Antrian</span>
            <span className="font-bold text-2xl text-gray-900">
              {appointment.queueNumber}
            </span>
          </div>
          {appointment.status === "completed" && appointment.rating && (
            <div className="flex items-center gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < appointment.rating!
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          {isUpcoming && appointment.status === "upcoming" && (
            <>
              <Button
                variant="outline"
                className="flex-1 text-sm h-9"
                onClick={() => actions.cancelAppointment(appointment.id)}
              >
                Batalkan
              </Button>
              <Button className="flex-1 bg-[#0a0e27] hover:bg-[#1a1f3a] text-white text-sm h-9">
                Check In
              </Button>
            </>
          )}
          {appointment.status === "completed" && (
            <Button variant="outline" className="w-full text-sm h-9">
              Jadwalkan Ulang
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardContent: React.FC = () => {
  const { state, actions } = useDashboard();
  const { upcomingAppointment, appointments, loading, searchQuery } = state;

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex-1 bg-white p-8 overflow-auto">
      <div className="max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Agenda Terkini
        </h2>

        <DataSourceToggle />

        {upcomingAppointment && (
          <div className="mb-8">
            <AppointmentCard appointment={upcomingAppointment} isUpcoming />
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Riwayat</h3>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari riwayat"
                className="pl-10 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => actions.setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {filteredAppointments.length} Riwayat Janji Temu
          </p>

          <div className="grid grid-cols-2 gap-4">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */
const DashboardPage: React.FC = () => {
  const { actions } = useDashboard();

  useEffect(() => {
    actions.loadMockData();
  }, []);

  return (
    <div className="flex h-full mt-24 bg-white max-w-7xl mx-auto py-20">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default function DashboardWrapper() {
  return (
    <DashboardProvider>
      <DashboardPage />
    </DashboardProvider>
  );
}
