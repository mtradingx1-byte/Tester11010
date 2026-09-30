import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { aether: { bg: '#07080C', surface:'#0E1118', line:'#1C2330', text:'#E8EDF5', muted:'#8B97A8', gold:'#C6A15B', teal:'#3EE0C6', red:'#FF5A6A' } } } },
  plugins: []
} satisfies Config;
