"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ListFilter } from 'lucide-react';
import PropTypes from "prop-types";

const styles = {
  trigger: {
    width: "224px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    background: "linear-gradient(135deg, rgba(255, 248, 240, 0.9) 0%, rgba(254, 243, 230, 0.9) 100%)",
    border: "2px solid #f3e5d3",
    borderRadius: "12px",
    color: "#b45309",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.08)",
    height: "40px",
  },
  icon: {
    width: "18px",
    height: "18px",
    color: "#f59e0b"
  },
  content: {
    background: "linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(254, 243, 230, 0.95) 100%)",
    border: "1.5px solid rgba(245, 158, 11, 0.3)",
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.15)"
  },
  item: {
    padding: "10px 12px",
    borderRadius: "6px",
    color: "#b45309",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease"
  }
};

function SortSelect({ sortBy, setSortBy }) {
  return (
    <Select value={sortBy} onValueChange={(v) => setSortBy(v)}>
      <SelectTrigger style={styles.trigger}>
        <ListFilter style={styles.icon} />
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent style={styles.content}>
        <SelectItem value="featured" style={styles.item}>Featured</SelectItem>
        <SelectItem value="price-low" style={styles.item}>Price: Low to High</SelectItem>
        <SelectItem value="price-high" style={styles.item}>Price: High to Low</SelectItem>
        <SelectItem value="rating" style={styles.item}>Rating: High to Low</SelectItem>
        <SelectItem value="name" style={styles.item}>Name: A-Z</SelectItem>
      </SelectContent>
    </Select>
  );
}

SortSelect.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default SortSelect;
