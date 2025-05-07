import { create } from "zustand";
import {
  fetchNews,
  fetchNewsSourcesAndCategories,
  NewsSource,
} from "@/services/api";

interface News {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  // Add more fields as per API response
}

interface NewsStore {
  news: News[];
  sources: NewsSource[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  currentSource: string;
  currentCategory: string;
  setNews: (news: News[]) => void;
  setSources: (sources: NewsSource[]) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentSource: (source: string) => void;
  setCurrentCategory: (category: string) => void;
  fetchNewsData: () => Promise<void>;
  fetchNewsSources: () => Promise<void>;

  // Computed properties
  filteredNews: News[];
  formattedNews: (News & { formattedDate: string })[];
  availableCategories: string[];
}

export const useNewsStore = create<NewsStore>((set, get) => ({
  news: [],
  sources: [],
  searchQuery: "",
  loading: false,
  error: null,
  currentSource: "antara",
  currentCategory: "terbaru",

  setNews: (news) => set({ news }),
  setSources: (sources) => set({ sources }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setCurrentSource: (source) => {
    set({ currentSource: source, currentCategory: "terbaru" });
    get().fetchNewsData();
  },
  setCurrentCategory: (category) => {
    set({ currentCategory: category });
    get().fetchNewsData();
  },

  fetchNewsData: async () => {
    const { currentSource, currentCategory } = get();
    set({ loading: true, error: null });
    try {
      const data = await fetchNews(currentSource, currentCategory);
      set({ news: data.data || [] });
    } catch (error) {
      set({ error: "Failed to fetch news" });
    } finally {
      set({ loading: false });
    }
  },

  fetchNewsSources: async () => {
    try {
      const data = await fetchNewsSourcesAndCategories();
      set({ sources: data.endpoints });
    } catch (error) {
      set({ error: "Failed to fetch news sources" });
    }
  },

  // Computed property for filtered news
  get filteredNews() {
    const { news, searchQuery } = get();
    if (!searchQuery.trim()) return news;

    return news.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },

  // Computed property for formatted dates
  get formattedNews() {
    const { filteredNews } = get();
    return filteredNews.map((news) => ({
      ...news,
      formattedDate: new Date(news.pubDate).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));
  },

  // Computed property for available categories
  get availableCategories() {
    const { sources, currentSource } = get();
    const source = sources.find((s) => s.name === currentSource);
    return source ? source.paths.map((p) => p.name) : [];
  },
}));
