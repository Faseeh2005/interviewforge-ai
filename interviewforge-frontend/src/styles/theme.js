// Shared with src/index.css — keep these two files in sync if the palette
// or temper bands ever change.

export const colors = {
    forge950: "#100d0b",
    forge900: "#1a1512",
    forge800: "#241d18",
    forge700: "#34291f",

    cinder100: "#fff4e8",
    cinder300: "#d8c9b8",
    cinder500: "#a3927d",

    ember400: "#ff8552",
    ember500: "#ff6b35",
    ember600: "#e0501f",

    temperStraw: "#f2c14e",
    temperBronze: "#c1702f",
    temperPurple: "#8a4f9e",
    temperBlue: "#3d6f9e",
};

// The same four-stage vocabulary toolmakers use to read a temper color,
// borrowed to describe an interview score at a glance.
const TEMPER_BANDS = [
    { max: 40, label: "Straw", color: colors.temperStraw },
    { max: 70, label: "Bronze", color: colors.temperBronze },
    { max: 90, label: "Purple", color: colors.temperPurple },
    { max: 101, label: "Blue", color: colors.temperBlue },
];

export function temperFor(score = 0) {
    const clamped = Math.max(0, Math.min(100, score));
    const band = TEMPER_BANDS.find((b) => clamped < b.max) || TEMPER_BANDS[TEMPER_BANDS.length - 1];
    return { ...band, score: clamped };
}