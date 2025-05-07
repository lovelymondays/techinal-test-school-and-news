import { create } from "zustand";
import { fetchSchools } from "@/services/api";

export interface School {
  id: string;
  npsn: string;
  sekolah: string;
  bentuk: string;
  status: string;
  alamat_jalan: string;
  lintang: string;
  bujur: string;
  kode_prop: string;
  propinsi: string;
  kode_kab_kota: string;
  kabupaten_kota: string;
  kode_kec: string;
  kecamatan: string;
}

interface SchoolStore {
  schools: School[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalData: number;
  perPage: number;
  setSchools: (schools: School[]) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  setTotalData: (total: number) => void;
  fetchSchoolData: (page?: number) => Promise<void>;

  // Computed properties
  filteredSchools: School[];
  groupedSchools: { [key: string]: School[] };
}

export const useSchoolStore = create<SchoolStore>((set, get) => ({
  schools: [],
  searchQuery: "",
  loading: false,
  error: null,
  currentPage: 1,
  totalData: 0,
  perPage: 10,

  setSchools: (schools) => set({ schools }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setCurrentPage: (page) => {
    set({ currentPage: page });
    get().fetchSchoolData(page);
  },
  setTotalData: (total) => set({ totalData: total }),

  fetchSchoolData: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchSchools(page);
      set({
        schools: response.dataSekolah,
        totalData: response.total_data,
        currentPage: page,
      });
    } catch (error) {
      set({ error: "Failed to fetch schools" });
    } finally {
      set({ loading: false });
    }
  },

  // Computed property for filtered schools
  get filteredSchools() {
    const { schools, searchQuery } = get();
    if (!searchQuery.trim()) return schools;

    const query = searchQuery.toLowerCase();
    return schools.filter(
      (school) =>
        school.sekolah.toLowerCase().includes(query) ||
        school.npsn.includes(query) ||
        school.alamat_jalan.toLowerCase().includes(query) ||
        school.propinsi.toLowerCase().includes(query) ||
        school.kabupaten_kota.toLowerCase().includes(query) ||
        school.kecamatan.toLowerCase().includes(query)
    );
  },

  // Computed property for grouped schools by province
  get groupedSchools() {
    const { filteredSchools } = get();
    return filteredSchools.reduce((acc, school) => {
      const province = school.propinsi.replace("Prov. ", "");
      if (!acc[province]) {
        acc[province] = [];
      }
      acc[province].push(school);
      return acc;
    }, {} as { [key: string]: School[] });
  },
}));
