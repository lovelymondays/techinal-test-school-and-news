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
  perPage: number = 10,
  query: string = ""
): Promise<SchoolAPIResponse> {
  try {
    // Add query parameter if search query exists
    let url = `${SCHOOL_API}?page=${page}&perPage=${perPage}`;

    // Note: The actual API might not support search via URL parameters
    // If the API supports search, uncomment this code
    // if (query) {
    //   url += `&search=${encodeURIComponent(query)}`;
    // }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch schools");
    }

    let data = await response.json();

    // If the API doesn't support search via URL, we need to filter client-side
    if (query && data.dataSekolah) {
      const queryLower = query.toLowerCase();
      data.dataSekolah = data.dataSekolah.filter(
        (school: School) =>
          school.sekolah.toLowerCase().includes(queryLower) ||
          school.npsn.includes(queryLower) ||
          school.alamat_jalan.toLowerCase().includes(queryLower) ||
          school.propinsi.toLowerCase().includes(queryLower) ||
          school.kabupaten_kota.toLowerCase().includes(queryLower) ||
          school.kecamatan.toLowerCase().includes(queryLower)
      );

      // Adjust total_data to reflect the filtered count
      data.total_data = data.dataSekolah.length;
    }

    return data;
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
