import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  CheckCircledIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import {
  CONCENTRATION_MG_PER_ML,
  VIAL_DOSE_MG,
  VIAL_VOLUME_ML,
  calculateDose,
  formatFixed,
  formatPercent,
  type DoseLevel,
} from "./calculations";
import {
  CLINICAL_ABBREVIATIONS,
  CONSENSUS_SOURCE,
  INDICATION_REFERENCES,
  type IndicationRecommendation,
} from "./indicationReferences";

type MeasurementFieldProps = {
  id: string;
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

function normalizePositiveNumber(nextValue: string) {
  if (nextValue.includes("-")) return "";
  const normalized = nextValue.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
  if (normalized === "") return "";
  const numericValue = Number(normalized);
  return Number.isFinite(numericValue) && numericValue > 0 ? normalized : "";
}

function MeasurementField({ id, label, unit, value, onChange, hint }: MeasurementFieldProps) {
  return (
    <div className="measurement-wrap">
      <label className="measurement-field" htmlFor={id}>
        <span className="measurement-label">{label}</span>
        <span className="measurement-input-row">
          <input
            id={id}
            data-testid={`${id}-input`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value}
            placeholder="—"
            aria-describedby={hint ? `${id}-hint` : undefined}
            onChange={(event) => onChange(normalizePositiveNumber(event.target.value))}
          />
          <span className="measurement-unit">{unit}</span>
        </span>
      </label>
      {hint ? <p className="input-hint" id={`${id}-hint`}>{hint}</p> : null}
    </div>
  );
}

function ResultRow({ label, value, unit, emphasis = false }: { label: string; value: string; unit?: string; emphasis?: boolean }) {
  return (
    <div className={`result-row${emphasis ? " result-row--emphasis" : ""}`}>
      <span>{label}</span>
      <strong>{value}{unit && value !== "—" ? <small> {unit}</small> : null}</strong>
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: IndicationRecommendation }) {
  const strengthClass = recommendation.strength === "A"
    ? "strength-a"
    : recommendation.strength === "B"
      ? "strength-b"
      : "strength-c";

  return (
    <article className="recommendation-card">
      <div className="recommendation-meta">
        <span>{recommendation.stage}</span>
        <strong className={strengthClass}>{recommendation.strengthLabel}</strong>
      </div>
      <h4>{recommendation.regimen}</h4>
      <dl>
        <div>
          <dt>适用人群</dt>
          <dd>{recommendation.population}</dd>
        </div>
        <div className="dose-reference-row">
          <dt>用法用量</dt>
          <dd>{recommendation.dose}</dd>
        </div>
      </dl>
      <details className="evidence-detail">
        <summary>核心循证数据 <ChevronDownIcon /></summary>
        <p>{recommendation.evidence}</p>
      </details>
    </article>
  );
}

export default function Prototype() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [doseLevel, setDoseLevel] = useState<DoseLevel>(70);
  const [infoOpen, setInfoOpen] = useState(false);
  const [roundingOpen, setRoundingOpen] = useState(false);

  const heightNumber = Number(height);
  const weightNumber = Number(weight);
  const result = useMemo(
    () => calculateDose(heightNumber, weightNumber, doseLevel),
    [heightNumber, weightNumber, doseLevel],
  );

  const heightHint = height && (heightNumber < 100 || heightNumber > 250)
    ? "该身高数值较少见，请确认输入是否正确。"
    : undefined;
  const weightHint = weight && (weightNumber < 25 || weightNumber > 300)
    ? "该体重数值较少见，请确认输入是否正确。"
    : undefined;

  return (
    <div className="app-screen">
      <main className="calculator" data-testid="dose-calculator">
        <header className="hero-header">
          <h1>复依诺<sup>®</sup> 用量速算</h1>
          <p className="hero-subtitle">输入身高体重，即刻计算体表面积与用药参考</p>
        </header>

        <section className="measurement-grid" aria-label="患者身体数据">
          <MeasurementField id="height" label="身高" unit="cm" value={height} onChange={setHeight} hint={heightHint} />
          <MeasurementField id="weight" label="体重" unit="kg" value={weight} onChange={setWeight} hint={weightHint} />
        </section>

        <section className="bsa-card" aria-live="polite">
          <div>
            <h2>体表面积 BSA</h2>
            <p>Mosteller公式</p>
          </div>
          <strong>{formatFixed(result?.bsa, 2)}{result ? <small> m²</small> : null}</strong>
        </section>

        <section className="dose-selector" aria-label="剂量方案">
          <button
            type="button"
            className={doseLevel === 70 ? "is-selected" : ""}
            aria-pressed={doseLevel === 70}
            onClick={() => setDoseLevel(70)}
          >
            <strong>70 mg/m²</strong>
            <span>标准方案</span>
          </button>
          <div className={`dose-option-with-info${doseLevel === 50 ? " is-selected" : ""}`}>
            <button
              type="button"
              className="dose-option-main"
              aria-pressed={doseLevel === 50}
              onClick={() => setDoseLevel(50)}
            >
              <strong>50 mg/m²</strong>
              <span>特殊起始/调整场景</span>
            </button>
            <button
              type="button"
              className="info-button"
              aria-label="查看50 mg/m²方案说明"
              onClick={() => setInfoOpen(true)}
            >
              <InfoCircledIcon />
            </button>
          </div>
        </section>

        <p className="product-spec">
          <span>固定规格</span>
          每瓶 {VIAL_VOLUME_ML} mL · 含伊立替康 {VIAL_DOSE_MG} mg · {CONCENTRATION_MG_PER_ML} mg/mL
        </p>

        <section className="result-card" aria-live="polite" data-testid="result-card">
          <p className="result-badge"><CheckCircledIcon />{doseLevel === 70 ? "标准剂量 70 mg/m²" : "50 mg/m² 特殊场景"}</p>
          <div className="primary-result">
            <span>理论剂量</span>
            <strong>{formatFixed(result?.totalDoseMg, 1)}{result ? <small> mg</small> : null}</strong>
          </div>
          <div className="result-table">
            <ResultRow label="体表面积" value={formatFixed(result?.bsa, 2)} unit="m²" />
            <ResultRow label="理论对应" value={formatFixed(result?.rawVials, 2)} unit="支" />
            <ResultRow label="支数参考" value={result ? String(result.recommendedVials) : "—"} unit="支" emphasis />
            <ResultRow label="理论抽取体积" value={formatFixed(result?.drawVolumeMl, 1)} unit="mL" />
          </div>
        </section>

        <aside className="safety-note">
          <ExclamationTriangleIcon aria-hidden="true" />
          <p>支数参考不替代按体表面积计算的实际给药剂量。实际处方、配制及剂量调整应由医疗专业人员依据经批准说明书及患者具体情况决定。</p>
        </aside>

        <section className="disclosure-card compact-disclosure">
          <button type="button" aria-expanded={roundingOpen} onClick={() => setRoundingOpen((open) => !open)}>
            <span>整支剂量差异</span>
            <ChevronDownIcon className={roundingOpen ? "is-open" : ""} />
          </button>
          {roundingOpen ? (
            <div className="disclosure-content rounding-content">
              <ResultRow label="按整支计算对应剂量" value={formatFixed(result?.roundedVialDoseMg, 0)} unit="mg" />
              <ResultRow label="与理论剂量差异" value={formatPercent(result?.doseDifferencePercent)} />
              <p>此数据仅作信息展示，不自动判断医学上是否允许舍入。</p>
            </div>
          ) : null}
        </section>

        <section className="disclosure-card references">
          <details>
            <summary>剂量依据与参考文献 <ChevronDownIcon /></summary>
            <div className="references-content">
              <ol>
                <li>
                  <strong>盐酸伊立替康脂质体注射液说明书（批复版）</strong>
                  <p>标准方案：本品70 mg/m²静脉输注90分钟，随后LV 400 mg/m²及5-FU 2,400 mg/m²，每2周一次。</p>
                </li>
                <li>
                  <strong>已知UGT1A1*28纯合子患者</strong>
                  <p>起始剂量建议50 mg/m²；后续耐受时可考虑增加至70 mg/m²。</p>
                </li>
                <li><strong>产品规格</strong><p>10 mL:43 mg。</p></li>
                <li>
                  <strong>BSA</strong>
                  <p>Mosteller RD. Simplified calculation of body-surface area. N Engl J Med. 1987;317:1098. DOI:10.1056/NEJM198710223171717</p>
                </li>
              </ol>
            </div>
          </details>
        </section>

        <section className="indication-reference" aria-labelledby="indication-reference-title">
          <header className="indication-reference-header">
            <span>专家共识参考 · 2025</span>
            <h2 id="indication-reference-title">伊立替康脂质体在不同适应症的用法用量参考信息</h2>
            <p>按适应症与治疗阶段整理，点击下方条目查看方案、人群、剂量及核心循证数据。</p>
          </header>

          <aside className="consensus-caution">
            <ExclamationTriangleIcon aria-hidden="true" />
            <p><strong>重要说明：</strong>以下内容整理自专家共识及相关临床研究，仅作专业信息索引。部分适应症、联合方案及剂量可能超出经批准说明书或尚处研究阶段，不作为处方建议，也不与上方计算结果联动。实际用药请依据最新版说明书、指南及医嘱。</p>
          </aside>

          <div className="indication-accordions">
            {INDICATION_REFERENCES.map((indication) => (
              <details className="indication-accordion" key={indication.id}>
                <summary>
                  <span>
                    <strong>{indication.title}</strong>
                    <small>{indication.recommendations.length} 条共识参考</small>
                  </span>
                  <ChevronDownIcon />
                </summary>
                <div className="recommendation-list">
                  {indication.recommendations.map((recommendation) => (
                    <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                  ))}
                </div>
              </details>
            ))}
          </div>

          <details className="abbreviation-card">
            <summary>缩写释义 <ChevronDownIcon /></summary>
            <dl>
              {CLINICAL_ABBREVIATIONS.map(([term, definition]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
          </details>

          <div className="consensus-source">
            <strong>资料来源</strong>
            <p>{CONSENSUS_SOURCE.title}</p>
            <p>{CONSENSUS_SOURCE.journal}</p>
            <a href={CONSENSUS_SOURCE.url} target="_blank" rel="noreferrer">DOI: {CONSENSUS_SOURCE.doi}</a>
          </div>
        </section>

        <footer className="professional-footer">
          <strong>仅供医疗卫生专业人士参考</strong>
          <p>本工具用于辅助计算，不替代完整药品说明书、临床判断或医师处方。</p>
          <p>请仔细阅读经批准的最新版药品说明书并在医师指导下使用。</p>
          <span>所有计算均在本地完成，不采集、上传或保存患者数据。</span>
        </footer>
      </main>

      <Dialog.Root open={infoOpen} onOpenChange={setInfoOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="info-dialog-overlay" />
          <Dialog.Content className="info-dialog-content">
            <span className="info-dialog-handle" aria-hidden="true" />
            <Dialog.Title>50 mg/m² 特殊起始/调整场景</Dialog.Title>
            <Dialog.Description className="info-dialog-description">UGT1A1*28纯合子患者起始剂量说明</Dialog.Description>
            <p className="sheet-medical-copy">已知UGT1A1*28纯合子患者，起始剂量建议减至50 mg/m²；如后续治疗周期耐受，可考虑增加至70 mg/m²。其他剂量调整请依据最新版说明书及医嘱。</p>
            <Dialog.Close asChild>
              <button className="info-dialog-close" type="button">知道了</button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
