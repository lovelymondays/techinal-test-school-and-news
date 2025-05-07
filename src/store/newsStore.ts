import { create } from "zustand";
import { fetchNews, fetchNewsSourcesAndCategories } from "@/services/api";

interface NewsItem {
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
}

interface NewsData {
  link: string;
  image: string;
  description: string;
  title: string;
  posts: NewsItem[];
}

interface FormattedNewsItem extends NewsItem {
  formattedDate: string;
  category: string;
}

interface NewsStore {
  sources: Array<{
    name: string;
    paths: Array<{ name: string; link: string }>;
  }>;
  currentSource: string;
  currentCategory: string;
  newsData: NewsData | null;
  allPosts: { [category: string]: FormattedNewsItem[] };
  searchQuery: string;
  loading: boolean;
  error: string | null;
  setSearchQuery: (query: string) => void;
  setCurrentSource: (source: string) => void;
  setCurrentCategory: (category: string) => void;
  fetchNewsSources: () => Promise<void>;
  fetchNewsData: () => Promise<void>;
  fetchAllCategoryPosts: () => Promise<void>;
  formattedNews: FormattedNewsItem[];
}

export const useNewsStore = create<NewsStore>((set, get) => ({
  sources: [],
  currentSource: "antara",
  currentCategory: "terbaru",
  newsData: null,
  allPosts: {},
  searchQuery: "",
  loading: false,
  error: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentSource: (source) => {
    set({ currentSource: source, currentCategory: "terbaru", allPosts: {} });
    get().fetchAllCategoryPosts();
  },
  setCurrentCategory: (category) => {
    set({ currentCategory: category });
    get().fetchNewsData();
  },

  fetchNewsSources: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchNewsSourcesAndCategories();
      set({ sources: data.endpoints });
      get().fetchAllCategoryPosts();
    } catch (error) {
      set({ error: "Failed to fetch news sources" });
    } finally {
      set({ loading: false });
    }
  },

  fetchNewsData: async () => {
    const { currentSource, currentCategory } = get();
    set({ loading: true, error: null });
    try {
      const data = await fetchNews(currentSource, currentCategory);
      set({ newsData: data.data });
    } catch (error) {
      set({ error: "Failed to fetch news" });
    } finally {
      set({ loading: false });
    }
  },

  fetchAllCategoryPosts: async () => {
    const { currentSource, sources } = get();
    const currentSourceData = sources.find(
      (source) => source.name === currentSource
    );
    if (!currentSourceData) return;

    set({ loading: true, error: null, allPosts: {} });

    try {
      const allPosts: { [category: string]: FormattedNewsItem[] } = {};

      // Fetch posts for each category
      for (const path of currentSourceData.paths) {
        const data = await fetchNews(currentSource, path.name);
        if (data.data && data.data.posts) {
          allPosts[path.name] = data.data.posts.map((post:any) => ({
            ...post,
            category: path.name,
            formattedDate: formatDate(post.pubDate),
          }));
        }
      }

      set({ allPosts });
    } catch (error) {
      set({ error: "Failed to fetch category posts" });
    } finally {
      set({ loading: false });
    }
  },

  get formattedNews() {
    const { newsData, searchQuery } = get();
    if (!newsData) return [];

    const formattedPosts = newsData.posts.map((post) => ({
      ...post,
      category: get().currentCategory,
      formattedDate: formatDate(post.pubDate),
    }));

    if (!searchQuery.trim()) return formattedPosts;

    const query = searchQuery.toLowerCase();
    return formattedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
    );
  },
}));

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
