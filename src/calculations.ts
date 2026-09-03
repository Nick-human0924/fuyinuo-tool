export const VIAL_DOSE_MG = 43;
export const VIAL_VOLUME_ML = 10;
export const CONCENTRATION_MG_PER_ML = 4.3;

export type DoseLevel = 70 | 50;

export type DoseResult = {
  bsa: number;
  totalDoseMg: number;
  rawVials: number;
  recommendedVials: number;
  drawVolumeMl: number;
  roundedVialDoseMg: number;
  doseDifferencePercent: number;
};

export function calculateBsa(heightCm: number, weightKg: number) {
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg) || heightCm <= 0 || weightKg <= 0) {
    return null;
  }

  return Math.sqrt((heightCm * weightKg) / 3600);
}

export function calculateDose(heightCm: number, weightKg: number, doseLevel: DoseLevel): DoseResult | null {
  const bsa = calculateBsa(heightCm, weightKg);
  if (bsa === null) return null;

  const totalDoseMg = bsa * doseLevel;
  const rawVials = totalDoseMg / VIAL_DOSE_MG;
  const recommendedVials = doseLevel === 70
    ? (rawVials > 3.4 ? 4 : rawVials >= 2.5 ? 3 : 2)
    : (rawVials >= 1.5 ? 2 : 1);
  const roundedVialDoseMg = recommendedVials * VIAL_DOSE_MG;

  return {
    bsa,
    totalDoseMg,
    rawVials,
    recommendedVials,
    drawVolumeMl: totalDoseMg / CONCENTRATION_MG_PER_ML,
    roundedVialDoseMg,
    doseDifferencePercent: ((roundedVialDoseMg - totalDoseMg) / totalDoseMg) * 100,
  };
}

export function formatFixed(value: number | null | undefined, digits: number) {
  return value == null || !Number.isFinite(value) ? "—" : value.toFixed(digits);
}

export function formatPercent(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "—";
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}
