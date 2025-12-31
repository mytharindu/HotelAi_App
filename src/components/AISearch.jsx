import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setQuery, clearSearch } from "@/lib/features/searchSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, MapPin, Compass, Zap } from 'lucide-react'

const styles = {
  container: "w-full max-w-4xl mx-auto px-3 sm:px-4",
  wrapper: "space-y-6",
  searchForm: "relative",
  searchContainer: "relative flex items-center gap-2 rounded-lg shadow-sm transition-all duration-300 overflow-hidden border-2",
  searchContainerDefault: "bg-white/95 border-amber-200 focus-within:shadow-lg focus-within:border-amber-500",
  searchIcon: "pl-4 flex-shrink-0",
  sparkleIcon: "w-5 h-5 text-amber-600",
  input: "flex-1 border-0 bg-transparent text-slate-900 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:outline-none py-4 px-0",
  clearButton: "mr-2 p-2 rounded-md hover:bg-amber-50 transition-colors",
  clearIcon: "w-4 h-4 text-slate-400 hover:text-slate-600",
  submitButton: "gap-2 h-10 px-6 rounded-md text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0",
  suggestedLabel: "text-xs font-medium text-slate-500 uppercase tracking-wide",
  suggestedGrid: "grid grid-cols-1 sm:grid-cols-3 gap-3",
  suggestedCard: "relative group flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 text-left cursor-pointer",
  suggestedIconBox: "p-2 rounded-md bg-amber-200/50 group-hover:bg-amber-300/50 transition-colors flex-shrink-0",
  suggestedIcon: "w-4 h-4 text-amber-700",
  suggestedTitle: "text-sm font-semibold text-slate-900 truncate",
  suggestedDesc: "text-xs text-slate-600 truncate",
  footer: "pt-2 text-center",
  footerText: "text-xs text-slate-600",
}

const suggestedSearches = [
  { icon: MapPin, text: "Beach Resorts", description: "Tropical getaways" },
  { icon: Compass, text: "Mountain Retreats", description: "Adventure awaits" },
  { icon: Zap, text: "Trending Now", description: "Most booked" },
]

export default function AISearch() {
  const dispatch = useDispatch();

  const { query, isSearchMode } = useSelector((state) => state.search);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setValue(query);
  }, [query]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isSearchMode) {
        handleClear();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSearchMode]);

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!value.trim()) return

    setIsLoading(true)
    try {
      if (!value.trim()) return;
      dispatch(setQuery(value));
      const resultsSection = document.getElementById("hotel-listings");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedSearch = (text) => {
    setValue(text)
  }

  function handleClear() {
    setValue("");
    dispatch(clearSearch());
  }

    function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={styles.container}
    >
      <div className={styles.wrapper}>
        <motion.form
          onSubmit={handleSearch}
          animate={{ scale: isFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
          className={styles.searchForm}
        >
          <div className={`${styles.searchContainer} ${styles.searchContainerDefault}`}>
            <div className={styles.searchIcon}>
              <motion.div
                animate={{ rotate: isLoading ? 360 : 0 }}
                transition={{ duration: 1, repeat: isLoading ? Number.POSITIVE_INFINITY : 0 }}
              >
                <Sparkles className={styles.sparkleIcon} />
              </motion.div>
            </div>

            <Input
              type="text"
              placeholder="Where would you like to stay?"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className={styles.input}
            />

            <AnimatePresence>
              {value && !isLoading && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleClear()}
                  className={styles.clearButton}
                  aria-label="Clear search"
                >
                  <X className={styles.clearIcon} />
                </motion.button>
              )}
            </AnimatePresence>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pr-1"
            >
              <Button
                type="submit"
                disabled={isLoading || !query.trim()}
                size="sm"
                className={styles.searchButton}
              >
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{isLoading ? "Searching..." : "Search"}</span>
              </Button>
            </motion.div>
          </div>
        </motion.form>

        <AnimatePresence>
          {!value && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <p className={styles.suggestedLabel}>Suggested Searches</p>
              <div className={styles.suggestedGrid}>
                {suggestedSearches.map((search, idx) => {
                  const IconComponent = search.icon
                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ translateY: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestedSearch(search.text)}
                      className={styles.suggestedCard}
                    >
                      <div className={styles.suggestedIconBox}>
                        <IconComponent className={styles.suggestedIcon} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={styles.suggestedTitle}>{search.text}</p>
                        <p className={styles.suggestedDesc}>{search.description}</p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={styles.aiPoweredSearch}
        >
          <p className={styles.aiPoweredSearchText}>
            ✨ AI-powered search • Find your perfect stay in seconds
          </p>
        </motion.div>
      </div>
    </motion.div>

  );
}
