export type RecommendationStrength = "A" | "B" | "C" | "未形成正式推荐";

export type IndicationRecommendation = {
  id: string;
  stage: string;
  regimen: string;
  population: string;
  dose: string;
  evidence: string;
  strength: RecommendationStrength;
  strengthLabel: string;
};

export type IndicationReference = {
  id: string;
  title: string;
  shortTitle: string;
  recommendations: IndicationRecommendation[];
};

export const CONSENSUS_SOURCE = {
  title: "伊立替康脂质体在消化系统肿瘤中应用的专家共识（2025版）",
  journal: "中华医学杂志. 2025;105(40):3620-3633.",
  doi: "10.3760/cma.j.cn112137-20250806-01991",
  url: "https://doi.org/10.3760/cma.j.cn112137-20250806-01991",
};

export const INDICATION_REFERENCES: IndicationReference[] = [
  {
    id: "pancreatic-cancer",
    title: "胰腺癌",
    shortTitle: "胰腺癌",
    recommendations: [
      {
        id: "pancreatic-first-line-nalirifox",
        stage: "一线治疗",
        regimen: "NALIRIFOX：伊立替康脂质体 + 5-FU/LV + 奥沙利铂",
        population: "不可切除的晚期胰腺癌",
        dose: "伊立替康脂质体 50 mg/m² + 5-FU 2,400 mg/m² + LV 400 mg/m² + 奥沙利铂 60 mg/m²；第1天给药，每2周1次。",
        evidence: "NAPOLI-3 / HE072-CSP-004研究：mOS 11.1～12.9个月，mPFS 7.4～7.7个月，ORR 30.8%，安全性可控。",
        strength: "A",
        strengthLabel: "A级 · 强推荐",
      },
      {
        id: "pancreatic-first-line-nasox",
        stage: "一线治疗",
        regimen: "三药方案：伊立替康脂质体 + 奥沙利铂 + S-1",
        population: "局部晚期或转移性胰腺癌",
        dose: "伊立替康脂质体起始剂量 50 mg/m²；第1天给药，每2周1次。",
        evidence: "NASOX研究：mOS 11.4个月，mPFS 6.5个月，ORR 58.5%，安全性可控。",
        strength: "B",
        strengthLabel: "B级 · 中推荐（建议参加临床研究）",
      },
      {
        id: "pancreatic-second-line-napoli1",
        stage: "二线治疗",
        regimen: "伊立替康脂质体 + 5-FU/LV",
        population: "含吉西他滨方案治疗失败的晚期胰腺癌",
        dose: "伊立替康脂质体 70 mg/m² + 5-FU 2,400 mg/m² + LV 400 mg/m²；第1天给药，每2周1次。",
        evidence: "NAPOLI-1研究：mOS 6.1个月，mPFS 3.1个月，ORR 16%，安全性可控。",
        strength: "A",
        strengthLabel: "A级 · 强推荐",
      },
      {
        id: "pancreatic-second-line-s1",
        stage: "二线治疗",
        regimen: "两药方案：伊立替康脂质体 + S-1",
        population: "含吉西他滨方案治疗失败的转移性胰腺癌",
        dose: "伊立替康脂质体起始剂量 70 mg/m²；第1天给药，每2周1次。",
        evidence: "Ⅰ/Ⅱ期研究：mOS 10.3个月，mPFS 5.7个月，ORR 20.4%，安全性可控。",
        strength: "B",
        strengthLabel: "B级 · 中推荐（建议参加临床研究）",
      },
      {
        id: "pancreatic-perioperative",
        stage: "围手术期辅助/新辅助",
        regimen: "NALIRIFOX：伊立替康脂质体 + 5-FU/LV + 奥沙利铂",
        population: "可切除或临界可切除胰腺癌",
        dose: "伊立替康脂质体 50 mg/m² + 5-FU 2,400 mg/m² + LV 400 mg/m² + 奥沙利铂 60 mg/m²；第1天给药，每2周1次。",
        evidence: "nITRO研究：R0切除率65.3%，DCR 85%，mDFS 31.3个月，mOS 44.9个月；NEO-Nal-IRI研究：R0切除率90%，ORR 45%，安全性可控。",
        strength: "C",
        strengthLabel: "C级 · 弱推荐（需谨慎评估，建议参加临床研究）",
      },
    ],
  },
  {
    id: "colorectal-cancer",
    title: "结直肠癌",
    shortTitle: "结直肠癌",
    recommendations: [
      {
        id: "colorectal-first-line-targeted",
        stage: "一线治疗",
        regimen: "NALIRIFOX + 靶向药物",
        population: "不可切除和转移性结直肠癌（根据患者肿瘤基因突变情况选用）",
        dose: "伊立替康脂质体 50 mg/m² + 5-FU 2,400 mg/m² + LV 400 mg/m² + 奥沙利铂 75～85 mg/m²，联合贝伐珠单抗 5 mg/kg 或西妥昔单抗 500 mg/m²；第1天给药，每2周1次。",
        evidence: "剂量递增及扩展研究：ORR 82.5%，DCR 100%；接受手术的9例中7例实现R0切除。",
        strength: "B",
        strengthLabel: "B级 · 中推荐",
      },
      {
        id: "colorectal-first-line-bevacizumab",
        stage: "一线治疗",
        regimen: "伊立替康脂质体 + 5-FU/LV ± 贝伐珠单抗",
        population: "不可切除和转移性结直肠癌（RAS/BRAF基因突变或原发灶位于右侧）",
        dose: "图中剂量栏：伊立替康脂质体 70 mg/m² + 5-FU 2,400 mg/m² + LV 400 mg/m² + 奥沙利铂 75～85 mg/m² ± 贝伐珠单抗 5 mg/kg；第1天给药，每2周1次。",
        evidence: "Ⅱ期单臂研究：ORR 63.6%，DCR 100%。",
        strength: "B",
        strengthLabel: "B级 · 中推荐",
      },
      {
        id: "colorectal-second-line-bevacizumab",
        stage: "二线治疗",
        regimen: "伊立替康脂质体 + 5-FU/LV + 贝伐珠单抗",
        population: "一线治疗失败的转移性结直肠癌",
        dose: "图中剂量栏：伊立替康脂质体 70 mg/m² + 5-FU 2,400 mg/m² + LV 400 mg/m² + 奥沙利铂 75～85 mg/m² ± 贝伐珠单抗 5 mg/kg；第1天给药，每2周1次。",
        evidence: "PEPCOL研究（Ⅱ期）：疗效相当，3/4级腹泻、中性粒细胞减少症等AE发生率更低；IRIS研究（Ⅱ期，中国）：ORR 20.5%，DCR 84.6%，安全性可控。",
        strength: "B",
        strengthLabel: "B级 · 中推荐",
      },
      {
        id: "colorectal-later-line-tas102",
        stage: "后线治疗",
        regimen: "伊立替康脂质体 + TAS-102",
        population: "至少一线治疗失败的转移性结直肠癌",
        dose: "原图未列出推荐剂量；请核对共识全文及具体研究方案。",
        evidence: "Ⅱ期研究：ORR 15%，DCR 75%，mPFS 9.7个月，mOS 10.1个月。",
        strength: "未形成正式推荐",
        strengthLabel: "证据有限 · 未形成正式推荐意见",
      },
      {
        id: "colorectal-neoadjuvant",
        stage: "新辅助治疗",
        regimen: "NALIRIFOX 序贯放化疗",
        population: "局部进展期直肠癌",
        dose: "原图未列出推荐剂量；请核对共识全文及具体研究方案。",
        evidence: "Ⅱ期单臂研究：pCR率36.7%，安全性可控。",
        strength: "C",
        strengthLabel: "C级 · 弱推荐（证据尚不充分，可酌情使用或参加临床研究）",
      },
    ],
  },
  {
    id: "biliary-gastric-cancer",
    title: "胆道恶性肿瘤 / 胃或胃食管结合部癌",
    shortTitle: "胆道 / 胃食管结合部",
    recommendations: [
      {
        id: "biliary-first-line-nife",
        stage: "一线治疗",
        regimen: "伊立替康脂质体 + 5-FU/LV",
        population: "晚期不可切除胆道恶性肿瘤",
        dose: "伊立替康脂质体 70 mg/m² + 5-FU 2,400 mg/m² + LV 400 mg/m²；第1天给药，每2周1次。",
        evidence: "NIFE研究（Ⅱ期）：4个月无进展生存率51%，mPFS 6个月，mOS 15.9个月；其中肝外胆管癌患者mPFS 9.6个月、mOS 18.2个月，安全性可控。",
        strength: "B",
        strengthLabel: "B级 · 中推荐",
      },
      {
        id: "biliary-second-line-nifty",
        stage: "二线治疗",
        regimen: "伊立替康脂质体 + 5-FU/LV",
        population: "既往一线标准治疗失败的晚期胆道恶性肿瘤",
        dose: "伊立替康脂质体 70 mg/m² + 5-FU 2,400 mg/m² + LV 400 mg/m²；第1天给药，每2周1次。",
        evidence: "NIFTY研究（Ⅱb期，更新分析）：mPFS 4.2个月，mOS 8.6个月，安全性可控。",
        strength: "B",
        strengthLabel: "B级 · 中推荐",
      },
      {
        id: "gastric-second-line",
        stage: "二线治疗",
        regimen: "伊立替康脂质体单药或联合方案",
        population: "一线治疗失败的晚期胃或胃食管结合部癌",
        dose: "起始剂量 120 mg/m²，允许增加剂量水平至 150 mg/m²。",
        evidence: "Ⅱ期研究：mPFS 2.7个月，mOS 7.3个月，ORR 13.6%；安全性仍值得进一步评估。",
        strength: "C",
        strengthLabel: "C级 · 弱推荐（可酌情考虑，建议参加临床研究）",
      },
    ],
  },
];

export const CLINICAL_ABBREVIATIONS = [
  ["5-FU/LV", "氟尿嘧啶 / 亚叶酸"],
  ["S-1", "替吉奥"],
  ["mOS", "中位总生存期"],
  ["mPFS", "中位无进展生存期"],
  ["ORR", "客观缓解率"],
  ["DCR", "疾病控制率"],
  ["mDFS", "手术切除患者的中位无病生存期"],
  ["pCR", "病理完全缓解"],
  ["AE", "不良事件"],
  ["R0切除", "镜下切缘阴性的完整切除"],
] as const;
