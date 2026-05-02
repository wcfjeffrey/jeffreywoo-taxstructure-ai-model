<div align="center">
<img src="assets/JeffreyWooTaxStructure.png" alt="JeffreyWooTaxStructureBanner" width="1200" height="900" />
</div>

## 📊 Overview

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)
![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-886FBF?logo=googlegemini&logoColor=fff)

> **Not your typical diagramming tool!**

**JeffreyWooTaxStructure** is an innovative AI-powered tax structuring canvas app designed for tax professionals to design, analyze, and iterate complex tax structures on a single interactive canvas.

## ✨ What It Does
- 🏗️ **Entity Mapping** — drag-and-drop entities (equity, trust, debt, etc.) onto a free canvas  
- 🔗 **Relationship Design** — connect entities visually and logically to reflect ownership, funding, and control structures  
- 📑 **Step-by-Step Structuring** — build structuring plans progressively, not just end-state diagrams  
- 🧾 **Assumption Capture** — record key assumptions and tax considerations directly alongside visuals  
- ⚖️ **Tax Overlay** — surface tax implications directly on the chart for clarity and compliance  
- 📂 **Pre-Built Templates** — start quickly with common Hong Kong and international tax structures  
- 🌍 **International Tax Planning Templates** — access a comprehensive suite of cross-border structures, Double Taxation Agreement/Arrangement (DTA) treaty layers, and multi-jurisdictional planning models  
- 💾 **My Structures Library** — save, edit, and reuse structures for future projects  
- 📤 **Export Options** — generate outputs in PNG, or share via link for the structure diagram, and TXT for the AI tax analysis result  

## 🤖 AI-Native Capabilities
- 📊 Analyze tax structure diagrams to highlight:
  - Investor considerations  
  - Structure considerations  
  - Downstream implications  
  - Draft step plans  
- 🧠 Suggest refinements based on Hong Kong tax rules and international DTA treaty frameworks  
- 🌍 Expand to multi-jurisdictional entities, cross-border financing, and DTA treaty optimization  

## 💡 Finance Transformation Impact
This project demonstrates how technology can reshape professional tax workflows by:  
• Digitizing complex structuring processes with interactive canvas design & visualization overlays.  
• Enhancing compliance & transparency through AI‑driven analysis aligned with HK regulations & international guidelines (OECD/UN Models, BEPS).  
• Improving efficiency & collaboration with editable libraries, exportable outputs & scenario‑based templates.  
• Driving digital transformation in tax advisory by turning manual processes into scalable & intelligent workflows.  
• Promoting responsible innovation with secure handling of sensitive tax data & assumptions.

## 🚀 Why Choose JeffreyWooTaxStructure?
Most tools only draw charts. **JeffreyWooTaxStructure** goes further — combining visual design, tax analysis, and structured documentation in one intelligent workspace. With built-in **Hong Kong and international tax planning templates**, it empowers professionals to handle both local and cross-border structuring needs with clarity and speed.

## 💰 Professional Tax Regulations/Concepts Applied
This app automates the visualization and analysis of complex cross-border tax structures, embedding Hong Kong and PRC tax regimes into an interactive, compliance-ready framework. It demonstrates both technical innovation and deep domain knowledge by incorporating:  
• 	**Corporate Treasury Centre (CTC)** — Profits tax concession for qualifying CTC, enabling multinational groups to centralize treasury operations, optimize liquidity, and enhance funding efficiency under the Inland Revenue (Amendment) (No.2) Ordinance 2016.  
• 	**Family-owned Investment Holding Vehicles (FIHV) / Family-owned Special Purpose Entities (FSPE)** — Profits tax concession regime under the Inland Revenue (Amendment) Ordinance 2023, strengthening Hong Kong’s position as a global family office and wealth management hub.  
• 	**Wholly Foreign-Owned Enterprise (WFOE)** — PRC market entry vehicle benefiting from tax concessions and regulatory compliance, essential for cross-border structuring under PRC Company Law, Foreign Investment Law (effective 2020), and the Wholly Foreign-Owned Enterprises Law (revised 2000).  
• 	**Controlled Foreign Corporations (CFC) Regime** — Anti-deferral rules addressing passive income and offshore profit shifting, particularly relevant for PRC outbound investment, under Enterprise Income Tax (EIT) Law, Article 45, and State Administration of Taxation (SAT) Circulars (2009, 2014, 2015).  
• 	**Designated Local Research Institution (DLRI)** — Enhanced tax deduction incentives for R&D activities in Hong Kong, supporting innovation and sustainable growth under the Inland Revenue Ordinance, Sections 16B (for in-house R&D) and 16C (for outsourced R&D), and Schedule 45.  
• 	**Charitable Organization Under Section 88 of the Inland Revenue Ordinance (IRO)** — Charitable exemptions providing tax relief for recognized charitable organization, integrating philanthropy into tax planning.

**Note:** Through AI-assisted analysis of CTC and FIHV structures, it helps multinational enterprises significantly reduce their effective tax rate and optimize group funding efficiency. Additionally, it automates complex CFC compliance processes, reducing the risk of penalties in cross-border operations.

## 📝 Main International Tax Planning Strategies

<img src="assets/JeffreyWooTaxStructure5.png" alt="JeffreyWooTaxStructure5" width="1100" height="800" />

## 📐Data Flow and Logic Sequence

The following diagram illustrates how the system transforms a user's visual design into AI-powered tax analysis and exportable outputs — from canvas interactions to Gemini API analysis to saved structures.

> **How to read this diagram:** The flowchart shows three phases:  
> Phase 1 (Visual Design) captures user input.  
> Phase 2 (AI Analysis) processes it through Gemini API.  
> Phase 3 (Output & Storage) delivers results.  
> Arrows show the forward progression; there is no loop back to Phase 1 in this simplified view.

```mermaid
flowchart TD
    subgraph DESIGN["Phase 1: Visual Design"]
        direction TB
        D1["Drag and Drop Entities"] --> D2["Connect Relationships"]
        D2 --> D3["Capture Assumptions"]
        D3 --> D4["Use Pre-built Templates"]
    end

    subgraph AI["Phase 2: AI Analysis"]
        direction TB
        A1["Send to Gemini API"] --> A2["Analyze Tax Structure"]
        A2 --> A3["Highlight Investor Considerations"]
        A3 --> A4["Identify Structure Considerations"]
        A4 --> A5["Generate Draft Step Plans"]
    end

    subgraph OUTPUT["Phase 3: Output & Storage"]
        direction TB
        O1["Display Tax Overlay on Canvas"] --> O2["Export PNG or Share Link"]
        O2 --> O3["Save to My Structures Library"]
        O3 --> O4["Export TXT for Analysis Results"]
    end

    D4 --> A1
    A5 --> O1
```

## ⭐ Finance Skills Strengthened
• Full‑stack architecture for interactive tax structuring applications.  
• Secure handling of sensitive tax data, assumptions & environment variables.  
• AI model integration into real‑world tax analysis workflows based on HK & international guidelines.  
• Parsing & interpreting complex entity diagrams & multi‑jurisdictional templates.  
• Interactive canvas design, visualization overlays & state management in React.

## 🤖 Tech Stack
- **Language** — TypeScript, HTML  
- **Framework** — React (with Vite as the build tool)  
- **UI** — Standard React components (interactive canvas, drag-and-drop entities)
- **Runtime** — Node.js

## 📦 Getting Started
1. Clone the repository and install dependencies.  
2. Launch the app to access the interactive canvas.  
3. Drag-and-drop entities, connect relationships, and capture assumptions.  
4. Apply Hong Kong or international tax templates to accelerate structuring.  
5. Let the AI surface tax implications and suggest refinements.  
6. Export your structure to PDF, PNG, or save it in **My Structures** for future use.  

## ⚙️ Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) file after you create [.env.local](.env.local) file
3. Run the app:
   `npm run dev`

## 📋 Sample

<img src="assets/JeffreyWooTaxStructure1.png" alt="JeffreyWooTaxStructure1" width="1200" height="1800" />
<img src="assets/JeffreyWooTaxStructure2.png" alt="JeffreyWooTaxStructure2" width="1200" height="900" />
<img src="assets/JeffreyWooTaxStructure3.png" alt="JeffreyWooTaxStructure3" width="1200" height="1800" />
<img src="assets/JeffreyWooTaxStructure4.png" alt="JeffreyWooTaxStructure4" width="1200" height="900" />

**Note:** Actively monitoring and systematically incorporating the evolving tax regulations, including BEPS 2.0 and other tax regulation updates from Hong Kong and other major jurisdictions, to ensure forward-thinking compliance and proactive risk management.

## References

**1. Hong Kong Tax Regulations & Concessions**

**Corporate Treasury Centre (CTC) profits tax concession**

- [Hong Kong Special Administrative Region. (2016). Inland Revenue (Amendment) (No. 2) Ordinance 2016 (Ordinance No. 11 of 2016). Government of the Hong Kong SAR.](https://www.elegislation.gov.hk/hk/2016/11)

**Family-owned Investment Holding Vehicles (FIHV) / Family-owned Special Purpose Entities (FSPE) profits tax regime**

- [Hong Kong Special Administrative Region. (2023). Inland Revenue (Amendment) Ordinance 2023 (Ordinance No. 14 of 2023). Government of the Hong Kong SAR.](https://www.elegislation.gov.hk/hk/2023/14)

**Designated Local Research Institution (DLRI) enhanced tax deduction for R&D activities**

- [Hong Kong Special Administrative Region. (2018). Inland Revenue Ordinance (Cap. 112). Sections 16B and 16C (Research and Development Expenditure). Government of the Hong Kong SAR.](https://www.elegislation.gov.hk/hk/cap112?xpid=ID_1438402580439_001)

**Charitable Organization tax exemptions under Section 88 of the IRO**

- [Hong Kong Special Administrative Region. (2008). Inland Revenue Ordinance (Cap. 112). Section 88 (Charitable Exemptions). Government of the Hong Kong SAR.](https://www.elegislation.gov.hk/hk/cap112?xpid=ID_1438402585244_004)

**2. PRC Tax & Legal Frameworks**

**Wholly Foreign-Owned Enterprise (WFOE) market entry vehicle**

- [National People's Congress. (2019). Foreign Investment Law of the People's Republic of China (Effective January 1, 2020). Government of the PRC.](https://en.ndrc.gov.cn/policies/202105/t20210527_1281403.html)
- [National People's Congress. (2023). Company Law of the People's Republic of China (2023 Revision). Government of the PRC.](https://www.registrationchina.com/articles/law/company-law-of-the-peoples-republic-of-china-2023-revision/)
- [National People's Congress. (2000). Wholly Foreign-Owned Enterprises Law of the People's Republic of China (Revised 2000). Government of the PRC.](http://en.moj.gov.cn/2021-06/22/c_634956.htm)

**Controlled Foreign Corporations (CFC) Regime anti-deferral rules**

- [National People's Congress. (2007). Enterprise Income Tax Law of the People's Republic of China (EIT Law). Article 45 (Controlled Foreign Corporations). Government of the PRC.](https://www.china-tax.net/static/upload/files/Corporation%20income%20tax%20(China)/PRC_CIT%20Law%202008.pdf)
- [State Administration of Taxation (SAT). (2009). Circular on Strengthening the Administration of Controlled Foreign Corporations. SAT Circular 82/2009.](http://en.sx.gov.cn/art/2010/3/30/art_1501440_18650602.html)
- [State Administration of Taxation (SAT). (2023). Circular on Optimizing Taxpayer Services and Streamlining the Reporting Forms for Resident Enterprises’ Overseas Investments and Income Information. SAT Circular 17/2023 (Controlled Foreign Corporations).](http://beijing.chinatax.gov.cn/bjswj/sszc/zxwj/202309/ce0c81a1859b4cd6a418fba66e2f7369.shtml)

**3. International Tax Frameworks & AI Model**

**International tax planning frameworks (referenced in transformation impact)**

- [OECD/G20 Base Erosion and Profit Shifting (BEPS) Project. (2015). Base Erosion and Profit Shifting (BEPS) Action Plan. Organisation for Economic Co-operation and Development (OECD) Publishing.](https://www.oecd.org/tax/beps/)

**AI-powered tax analysis (the app sends tax structure data to Gemini API for analysis)**

- [Gemini Team, Google. (2025). Gemini API. (Large language model API).](https://ai.google.dev/gemini-api/docs)

## ⚖️ Disclaimer

**JeffreyWooTaxStructure** provides AI-driven insights for **informational, educational and demonstration purposes** only. It does not replace professional tax, legal, or financial advice. 

Tax laws and regulations vary by jurisdiction and change frequently. The AI‑generated recommendations and analyses may not be accurate, complete, or applicable to your specific situation.

Users should always consult Chartered Tax Advisers (CTAs) before implementing any tax structures or making any tax‑related decisions/transactions. The developer assumes no liability for any losses, penalties, or damages arising from the use of this app.

Use at your own risk.

## 📄 License

**GNU Affero General Public License v3.0 (AGPL‑3.0)** — JeffreyWooTaxStructure 

- ✅ You are free to use, modify, and distribute this software, provided that any derivative works are also licensed under AGPL‑3.0.
- ✅ If you run or deploy this software over a network (e.g., as a web service), you must make the source code of your modified version available to all users who interact with it.
- ✅ This ensures transparency, collaboration, and continued open‑source availability of improvements.
- ❌ The software is provided “as is”, without warranties of any kind.

For full details, see the [LICENSE](./LICENSE) file.

## 👤 About the Author
Jeffrey Woo — Finance Manager | Strategic FP&A, AI Automation & Cost Optimization | MBA | FCCA | CTA | FTIHK | SAP Financial Accounting (FI) Certified Application Associate | Xero Advisor Certified

📧 Email: jeffreywoocf@gmail.com  
💼 LinkedIn: https://www.linkedin.com/in/wcfjeffrey/  
🐙 GitHub: https://github.com/wcfjeffrey/
