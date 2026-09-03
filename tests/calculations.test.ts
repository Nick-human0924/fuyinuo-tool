import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateBsa, calculateDose } from "../src/calculations.ts";

const closeTo = (actual: number | undefined | null, expected: number, tolerance: number) => {
  assert.ok(actual != null && Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);
};

describe("Mosteller BSA", () => {
  it("calculates BSA for 170 cm and 65 kg", () => {
    closeTo(calculateBsa(170, 65), 1.75, 0.01);
  });

  it("does not calculate with zero or negative values", () => {
    assert.equal(calculateBsa(0, 65), null);
    assert.equal(calculateBsa(170, -1), null);
  });
});

describe("dose calculations", () => {
  it("calculates the 70 mg/m² standard regimen", () => {
    const result = calculateDose(170, 65, 70);
    closeTo(result?.totalDoseMg, 122.64, 0.01);
    closeTo(result?.rawVials, 2.85, 0.01);
    assert.equal(result?.recommendedVials, 3);
  });

  it("calculates the 50 mg/m² special regimen", () => {
    const result = calculateDose(170, 65, 50);
    closeTo(result?.totalDoseMg, 87.6, 0.1);
    closeTo(result?.rawVials, 2.04, 0.01);
    assert.equal(result?.recommendedVials, 2);
  });

  it("applies both vial threshold rules at the boundary", () => {
    const height = 180;
    const bsa70 = (2.5 * 43) / 70;
    const weight70 = (bsa70 ** 2 * 3600) / height;
    assert.equal(calculateDose(height, weight70, 70)?.recommendedVials, 3);

    const bsa50 = (1.5 * 43) / 50;
    const weight50 = (bsa50 ** 2 * 3600) / height;
    assert.equal(calculateDose(height, weight50, 50)?.recommendedVials, 2);
  });
});
