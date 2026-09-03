import assert from "node:assert/strict";
import test from "node:test";
import {
  CONSENSUS_SOURCE,
  INDICATION_REFERENCES,
} from "../src/indicationReferences.ts";

test("contains all three indication groups and thirteen recommendations", () => {
  assert.deepEqual(
    INDICATION_REFERENCES.map((group) => group.title),
    ["胰腺癌", "结直肠癌", "胆道恶性肿瘤 / 胃或胃食管结合部癌"],
  );
  assert.equal(
    INDICATION_REFERENCES.reduce((total, group) => total + group.recommendations.length, 0),
    13,
  );
});

test("every recommendation has the fields required by the mobile reference card", () => {
  for (const group of INDICATION_REFERENCES) {
    for (const recommendation of group.recommendations) {
      assert.ok(recommendation.id);
      assert.ok(recommendation.stage);
      assert.ok(recommendation.regimen);
      assert.ok(recommendation.population);
      assert.ok(recommendation.dose);
      assert.ok(recommendation.evidence);
      assert.ok(recommendation.strengthLabel);
    }
  }
});

test("consensus citation is pinned to the verified DOI", () => {
  assert.equal(CONSENSUS_SOURCE.doi, "10.3760/cma.j.cn112137-20250806-01991");
  assert.match(CONSENSUS_SOURCE.journal, /2025;105\(40\):3620-3633/);
});
