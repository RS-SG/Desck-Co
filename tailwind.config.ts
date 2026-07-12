import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#0A0A0A', charcoal: '#111111', graphite: '#161616', silver: '#C9C9C5', gold: '#B79D6A' }, letterSpacing: { display: '-.055em' } } }, plugins: [] } satisfies Config;
