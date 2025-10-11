import { useMemo, useRef, useState, useEffect } from "react";
import type { DataItem, DataListProps } from "./types";
import "./style.css";

const deburr = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "");

export function DataListMobile<T extends DataItem>({
  items,
  loading,
  error,
  selectedId,
  onSelect,
  config,
}: DataListProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectedItem = useMemo(
    () => ((items ?? []).find((item) => item.id === selectedId)) ?? null,
    [items, selectedId]
  );

  useEffect(() => {
    if (selectedItem) setQuery(config.getDisplayText(selectedItem));
  }, [selectedItem, config]);

  const filtered = useMemo(() => {
    const q = deburr(query).toLowerCase().trim();
    if (!q) return items ?? [];
    return (items ?? []).filter((item) =>
      deburr(config.getSearchText(item)).toLowerCase().includes(q)
    );
  }, [items, query, config]);

  const {
    searchPlaceholder,
    loadingText = "Chargement…",
    emptyText = "Aucun élément disponible.",
    errorText = "Erreur lors du chargement.",
    getDisplayText,
  } = config;

  return (
    <aside aria-busy={loading || undefined}>
      <div className="mselect__combobox">
        <div
          className={`mselect__control ${open ? "is-open" : ""}`}
          role="combobox"
          aria-haspopup="listbox"
          aria-owns="data-options"
          aria-expanded={open}
        >
          <input
            id="data-combobox"
            ref={inputRef}
            type="text"
            className="mselect__input"
            placeholder={loading ? loadingText : searchPlaceholder}
            aria-autocomplete="list"
            aria-controls="data-options"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!open) setOpen(true);
            }}
            onFocus={() => {
              if (!open) setOpen(true);
            }}
            disabled={loading}
          />

          {selectedItem && (
            <button
              type="button"
              className="mselect__clear"
              aria-label="Effacer la sélection"
              onClick={() => {
                onSelect(null);
                setQuery("");
                setOpen(true);
                inputRef.current?.focus();
              }}
            >
              ×
            </button>
          )}
        </div>

        {open && (
          <>
            {loading ? (
              <div className="mselect__status" role="status">
                <span className="mselect__spinner" aria-hidden="true" /> {loadingText}
              </div>
            ) : error ? (
              <p className="mselect__error" role="alert">
                {errorText}
              </p>
            ) : (items ?? []).length === 0 ? (
              <p className="mselect__empty">{emptyText}</p>
            ) : filtered.length === 0 ? (
              <p className="mselect__empty">Aucun résultat pour « {query} ».</p>
            ) : (
              <ul id="data-options" className="mselect__list" role="listbox">
                {filtered.map((item) => (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={selectedId === item.id}
                    className={`mselect__option ${
                      selectedId === item.id ? "is-selected" : ""
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onSelect(item.id);
                      setQuery(getDisplayText(item));
                      setOpen(false);
                    }}
                  >
                    {getDisplayText(item)}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
