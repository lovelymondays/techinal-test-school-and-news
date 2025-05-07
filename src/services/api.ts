const SCHOOL_API = "https://api-sekolah-indonesia.vercel.app/sekolah";
const NEWS_API = "https://api-berita-indonesia.vercel.app";

export interface NewsEndpoint {
  name: string;
  path: string;
}

export interface NewsSource {
  name: string;
  paths: NewsSource[];
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  image: string;
}

export interface NewsAPIResponse {
  maintainer: string;
  github: string;
  endpoints: NewsSource[];
}

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

export interface SchoolAPIResponse {
  creator: string;
  status: string;
  dataSekolah: School[];
  total_data: number;
  page: number;
  per_page: number;
}

export async function fetchSchools(
  page: number = 1,
  perPage: number = 10
): Promise<SchoolAPIResponse> {
  try {
    const response = await fetch(SCHOOL_API);
    if (!response.ok) {
      throw new Error("Failed to fetch schools");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
}

/**
 * News API
 */

export async function fetchNews(
  source: string = "antara",
  category: string = "terbaru"
) {
  try {
    const endpoint = `${NEWS_API}/${source}/${category}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

export async function fetchNewsSourcesAndCategories(): Promise<NewsAPIResponse> {
  try {
    const response = await fetch(NEWS_API);
    if (!response.ok) {
      throw new Error("Failed to fetch news sources");
      console.log("Fetched news data:", response);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching news sources:", error);
    console.log("Fetch failed:", error);
    throw error;
  }
}
