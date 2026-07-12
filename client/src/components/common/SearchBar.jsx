import { useEffect, useState } from "react";

const SearchBar = ({ value = "", onSearch, placeholder = "Search...", debounceMs = 400 }) => {
  const [term, setTerm] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (term !== value) onSearch(term);
    }, debounceMs);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  return (
    <input
      type="search"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      placeholder={placeholder}
      className="bg-surface text-text border border-border/10 rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors w-full"
    />
  );
};

export default SearchBar;
