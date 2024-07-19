import { create } from "zustand";

import axios from "axios";
import { articleAPIEndPoint, articleAPIKEY } from "../config";
import moment from "moment";

interface NewsSource {
  id: string;
  name: string;
}

interface NewsArticle {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface articleState {
  articles: NewsArticle[];
  keyword: string;
  keywordHistory: string[];
  startDate: Date;
  sortBy: "relevancy" | "popularity" | "publishedAt";
  sortByOptions: string[];
  loading: boolean;
  // setter
  setArticles: (articles: NewsArticle[]) => void;
  setKeyword: (keyword: string) => void;
  setStartDate: (startDate: Date) => void;
  setSortBy: (sortBy: "relevancy" | "popularity" | "publishedAt") => void;

  getArticles: () => void;
  updateKeywordHistory: (newKeyword: string) => void;
}

export const createArticleStore = create<articleState>((set, get) => ({
  articles: [],
  keyword: "",
  keywordHistory: [],
  startDate: new Date(),
  sortBy: "popularity",
  sortByOptions: ["relevancy", "popularity", "publishedAt"],
  loading: false,

  updateKeywordHistory: (newKeyword: string) => {
    const { keywordHistory } = get();
    if (!keywordHistory.includes(newKeyword)) {
      const updatedHistory = [newKeyword, ...keywordHistory].slice(0, 10); // Store last 10 keywords
      set({ keywordHistory: updatedHistory });
    }
  },

  setArticles: (articles: NewsArticle[]) => set({ articles }),
  setKeyword: (keyword: string) => set({ keyword }),
  setStartDate: (startDate: Date) => set({ startDate }),
  setSortBy: (sortBy: "relevancy" | "popularity" | "publishedAt") =>
    set({ sortBy }),
  getArticles: async () => {
    try {
      const { keyword, sortBy, startDate } = get();

      set({ loading: true, articles: [] });

      const result = await axios.get(
        `${articleAPIEndPoint}?q=${keyword}&from=${moment(startDate).format(
          "YYYY-MM-DD"
        )}&sortBy=${sortBy}&apiKey=${articleAPIKEY}`
      );
      const { articles } = result.data;

      set({ articles, loading: false });
    } catch (e) {
      console.log(e);
    }
  },
}));
