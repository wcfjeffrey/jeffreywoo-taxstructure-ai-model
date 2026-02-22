import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { COUNTRIES } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCountries = COUNTRIES.filter(c => 
    c.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {label && <label className="text-[10px] font-mono uppercase block mb-1">{label}</label>}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 text-sm border border-line rounded bg-transparent flex items-center justify-between cursor-pointer hover:bg-bg/50 transition-colors"
      >
        <span className={cn(!value && "text-ink/40")}>
          {value || "Select country..."}
        </span>
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-line rounded shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 border-b border-line bg-bg/20 flex items-center gap-2">
            <Search size={14} className="text-ink/40" />
            <input 
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search countries..."
              className="bg-transparent border-none focus:ring-0 text-sm w-full p-0"
            />
            {search && (
              <button onClick={() => setSearch('')}>
                <X size={14} className="text-ink/40 hover:text-ink" />
              </button>
            )}
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map(country => (
                <div 
                  key={country}
                  onClick={() => {
                    onChange(country);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={cn(
                    "p-2 text-sm cursor-pointer hover:bg-bg transition-colors",
                    value === country && "bg-bg font-medium"
                  )}
                >
                  {country}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-ink/40 italic">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
