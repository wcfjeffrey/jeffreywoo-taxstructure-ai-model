import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Save, 
  Trash2, 
  Download, 
  Layout, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  FileText,
  History,
  Settings,
  Share2,
  Building2,
  User,
  Landmark,
  Users,
  ArrowRightLeft,
  Loader2,
  CheckCircle2,
  Briefcase,
  Globe,
  Shield,
  Scale,
  Store,
  TrendingUp,
  Lock,
  Unlock,
  Handshake,
  PieChart,
  CircleDot,
  Layers,
  Fingerprint,
  Combine,
  Heart,
  Rocket,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from './components/Canvas';
import Konva from 'konva';
import { CountrySelector } from './components/CountrySelector';
import { Entity, Relationship, EntityType, RelationshipType, EntityShape, LineType, Structure, StructureData } from './types';
import { 
  HK_HOLDING_TEMPLATE, 
  HK_OFFSHORE_TEMPLATE, 
  HK_TRUST_TEMPLATE,
  HK_CAYMAN_TEMPLATE,
  HK_DELAWARE_TEMPLATE,
  HK_SINGAPORE_TEMPLATE,
  HK_LUXEMBOURG_TEMPLATE,
  HK_MAURITIUS_TEMPLATE,
  HK_NETHERLANDS_TEMPLATE,
  DOUBLE_IRISH_TEMPLATE,
  DUTCH_SANDWICH_TEMPLATE,
  LUX_FINANCING_TEMPLATE,
  SWISS_PRINCIPAL_TEMPLATE,
  SG_IP_BOX_TEMPLATE,
  MAURITIUS_CYPRUS_TEMPLATE,
  DUTCH_CV_BV_TEMPLATE,
  DELAWARE_LLC_TEMPLATE,
  OFFSHORE_CHAIN_TEMPLATE
} from './templates';
import { analyzeStructure } from './services/geminiService';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const stageRef = useRef<Konva.Stage>(null);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'build' | 'analyze' | 'library'>('build');
  const [selectedShape, setSelectedShape] = useState<EntityShape>(EntityShape.RECTANGLE);
  const [batchSourceId, setBatchSourceId] = useState<string>('');
  const [batchTargetIds, setBatchTargetIds] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [structures, setStructures] = useState<any[]>([]);
  const [currentStructureName, setCurrentStructureName] = useState('Untitled Structure');
  const [currentId, setCurrentId] = useState<string>(crypto.randomUUID());

  useEffect(() => {
    fetchStructures();
    
    // Check for ID in URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      loadStructure(id);
    }
  }, []);

  const fetchStructures = async () => {
    try {
      const res = await fetch('/api/structures');
      const data = await res.json();
      setStructures(data);
    } catch (err) {
      console.error('Failed to fetch structures', err);
    }
  };

  const handleSave = async () => {
    const data = { entities, relationships };
    setIsSaving(true);
    try {
      await fetch('/api/structures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentId, name: currentStructureName, data }),
      });
      fetchStructures();
      // Show temporary success state
      setTimeout(() => setIsSaving(false), 2000);
    } catch (err) {
      console.error('Failed to save', err);
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    if (!stageRef.current) return;
    
    // Get the data URL from the stage
    const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 }); // Higher quality
    
    const link = document.createElement('a');
    link.download = `${currentStructureName.replace(/\s+/g, '_')}_Diagram.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      // In a real app, this might generate a unique shareable URL
      // For now, we'll copy the current URL with the structure ID if possible
      const shareUrl = `${window.location.origin}/?id=${currentId}`;
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (err) {
      console.error('Failed to share', err);
    }
  };

  const loadStructure = async (id: string) => {
    try {
      const res = await fetch(`/api/structures/${id}`);
      const structure = await res.json();
      const data = JSON.parse(structure.data);
      setEntities(data.entities);
      setRelationships(data.relationships);
      setCurrentStructureName(structure.name);
      setCurrentId(structure.id);
      setSelectedId(null);
      setAnalysis(null);
    } catch (err) {
      console.error('Failed to load', err);
    }
  };

  const addEntity = (type: EntityType) => {
    const newEntity: Entity = {
      id: crypto.randomUUID(),
      type,
      shape: selectedShape,
      name: `New ${type.toLowerCase()}`,
      incorporationJurisdiction: 'Hong Kong',
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
    };
    setEntities([...entities, newEntity]);
    setSelectedId(newEntity.id);
  };

  const addRelationship = () => {
    if (entities.length < 2) return;
    const newRel: Relationship = {
      id: crypto.randomUUID(),
      fromId: entities[0].id,
      toId: entities[1].id,
      type: RelationshipType.EQUITY,
      label: 'Equity',
      percentage: 100,
    };
    setRelationships([...relationships, newRel]);
    setSelectedId(newRel.id);
  };

  const updateEntity = (id: string, updates: Partial<Entity>) => {
    setEntities(entities.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const updateRelationship = (id: string, updates: Partial<Relationship>) => {
    setRelationships(relationships.map(r => {
      if (r.id === id) {
        const newRel = { ...r, ...updates };
        // If type is updated, also update label to match
        if (updates.type) {
          newRel.label = updates.type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
        }
        return newRel;
      }
      return r;
    }));
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setEntities(entities.filter(e => e.id !== selectedId));
    setRelationships(relationships.filter(r => r.id !== selectedId && r.fromId !== selectedId && r.toId !== selectedId));
    setSelectedId(null);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setActiveTab('analyze');
    try {
      const result = await analyzeStructure({ entities, relationships });
      setAnalysis(result);
    } catch (err) {
      console.error('Analysis failed', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadAnalysis = () => {
    if (!analysis) return;
    
    const report = `
TAX STRUCTURE ANALYSIS REPORT
Generated on: ${new Date().toLocaleString()}
Structure: ${currentStructureName}

1. INVESTOR CONSIDERATIONS
${analysis.investorConsiderations.map((c: string) => `- ${c}`).join('\n')}

2. STRUCTURE RISKS & CONSIDERATIONS
${analysis.structureConsiderations.map((c: string) => `- ${c}`).join('\n')}

3. STEP-BY-STEP IMPLEMENTATION PLAN
${analysis.stepPlan.map((s: any) => `Step ${s.step}: ${s.action}\n   Impact: ${s.taxImpact}`).join('\n\n')}

4. AI REFINEMENTS & SUGGESTIONS
${analysis.refinements.map((r: string) => `- ${r}`).join('\n')}

---
Disclaimer: This report is generated by AI for informational purposes only and does not constitute professional tax or legal advice.
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentStructureName.replace(/\s+/g, '_')}_Analysis.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const applyTemplate = (template: StructureData) => {
    setEntities(template.entities.map(e => ({ ...e, id: crypto.randomUUID() + e.id })));
    // Need to map IDs correctly for relationships
    // Simplified for now: just replace
    setEntities(template.entities);
    setRelationships(template.relationships);
    setAnalysis(null);
  };

  const handleBatchConnect = (mode: 'one-to-many' | 'many-to-one') => {
    if (!batchSourceId || batchTargetIds.length === 0) return;
    
    const newRels: Relationship[] = batchTargetIds.map(targetId => ({
      id: crypto.randomUUID(),
      fromId: mode === 'one-to-many' ? batchSourceId : targetId,
      toId: mode === 'one-to-many' ? targetId : batchSourceId,
      type: RelationshipType.EQUITY,
      label: 'Equity',
      percentage: 100,
    }));
    
    setRelationships([...relationships, ...newRels]);
    setBatchTargetIds([]);
    setBatchSourceId('');
  };

  const selectedEntity = entities.find(e => e.id === selectedId);
  const selectedRel = relationships.find(r => r.id === selectedId);

  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden">
      {/* Left Sidebar - Tools & Library */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 320 : 0 }}
        className="bg-white border-r border-line flex flex-col overflow-hidden relative"
      >
        <div className="p-4 border-b border-line flex items-center justify-between min-w-[320px]">
          <h1 className="font-serif italic text-xl">JeffreyWooTaxStructure</h1>
          <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-bg rounded">
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="flex border-b border-line min-w-[320px]">
          <button 
            onClick={() => setActiveTab('build')}
            className={cn("flex-1 py-2 text-xs font-mono uppercase tracking-widest", activeTab === 'build' && "bg-ink text-bg")}
          >
            Build
          </button>
          <button 
            onClick={() => setActiveTab('analyze')}
            className={cn("flex-1 py-2 text-xs font-mono uppercase tracking-widest", activeTab === 'analyze' && "bg-ink text-bg")}
          >
            Analyze
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            className={cn("flex-1 py-2 text-xs font-mono uppercase tracking-widest", activeTab === 'library' && "bg-ink text-bg")}
          >
            Library
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-w-[320px]">
          {activeTab === 'build' && (
            <div className="p-4 space-y-6">
              <section>
                <h3 className="col-header mb-3">Corporate Entities</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => addEntity(EntityType.JOINT_STOCK_COMPANY)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Building2 size={14} /> Joint Stock Co.
                  </button>
                  <button onClick={() => addEntity(EntityType.LIMITED_COMPANY)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Lock size={14} /> Limited Co.
                  </button>
                  <button onClick={() => addEntity(EntityType.LISTED_COMPANY)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <TrendingUp size={14} /> Listed Co.
                  </button>
                  <button onClick={() => addEntity(EntityType.UNLIMITED_COMPANY)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Unlock size={14} /> Unlimited Co.
                  </button>
                  <button onClick={() => addEntity(EntityType.JOINT_VENTURE)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Handshake size={14} /> Joint Venture
                  </button>
                  <button onClick={() => addEntity(EntityType.COOPERATIVE)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Users size={14} /> Cooperative
                  </button>
                </div>
              </section>

              <section>
                <h3 className="col-header mb-3">Special Vehicles & Offices</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => addEntity(EntityType.SPV)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Zap size={14} /> SPV
                  </button>
                  <button onClick={() => addEntity(EntityType.BRANCH)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Briefcase size={14} /> Branch
                  </button>
                  <button onClick={() => addEntity(EntityType.REPRESENTATIVE_OFFICE)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Globe size={14} /> Rep. Office
                  </button>
                </div>
              </section>

              <section>
                <h3 className="col-header mb-3">Trusts & Funds</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => addEntity(EntityType.UNIT_TRUST)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Layers size={14} /> Unit Trust
                  </button>
                  <button onClick={() => addEntity(EntityType.DISCRETIONARY_TRUST)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Fingerprint size={14} /> Discretionary Trust
                  </button>
                  <button onClick={() => addEntity(EntityType.HYBRID_TRUST)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Combine size={14} /> Hybrid Trust
                  </button>
                  <button onClick={() => addEntity(EntityType.CHARITABLE_TRUST)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Heart size={14} /> Charitable Trust
                  </button>
                  <button onClick={() => addEntity(EntityType.LPF)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <PieChart size={14} /> LPF
                  </button>
                  <button onClick={() => addEntity(EntityType.OFC)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <CircleDot size={14} /> OFC
                  </button>
                  <button onClick={() => addEntity(EntityType.VENTURE_CAPITAL)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Rocket size={14} /> Venture Capital
                  </button>
                </div>
              </section>

              <section>
                <h3 className="col-header mb-3">Individuals & Partnerships</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => addEntity(EntityType.INDIVIDUAL)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <User size={14} /> Individual
                  </button>
                  <button onClick={() => addEntity(EntityType.SOLE_PROPRIETORSHIP)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Store size={14} /> Sole Prop.
                  </button>
                  <button onClick={() => addEntity(EntityType.PARTNERSHIP)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Users size={14} /> Partnership
                  </button>
                </div>
              </section>

              <section>
                <h3 className="col-header mb-3">Other Entities</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => addEntity(EntityType.FOUNDATION)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Shield size={14} /> Foundation
                  </button>
                  <button onClick={() => addEntity(EntityType.SOCIETY)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Scale size={14} /> Society
                  </button>
                  <button onClick={() => addEntity(EntityType.CHARITABLE_COMPANY)} className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg">
                    <Building2 size={14} /> Charitable Co.
                  </button>
                </div>
              </section>

              <section>
                <h3 className="col-header mb-3">Relationships</h3>
                <div className="space-y-4">
                  <button 
                    onClick={addRelationship}
                    className="w-full flex items-center justify-center gap-2 p-2 text-sm border border-line rounded hover:bg-bg"
                  >
                    <ArrowRightLeft size={16} /> Add Single Connection
                  </button>

                  <div className="p-3 border border-line rounded bg-bg/30 space-y-3">
                    <h4 className="text-[10px] font-mono uppercase text-ink/60">Batch Connection</h4>
                    
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Pivot Entity</label>
                      <select 
                        value={batchSourceId}
                        onChange={(e) => setBatchSourceId(e.target.value)}
                        className="w-full p-2 text-xs border border-line rounded bg-white"
                      >
                        <option value="">Select entity...</option>
                        {entities.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Connected Entities</label>
                      <div className="max-h-32 overflow-y-auto border border-line rounded p-2 bg-white space-y-1">
                        {entities.filter(e => e.id !== batchSourceId).map(e => (
                          <label key={e.id} className="flex items-center gap-2 text-[11px] cursor-pointer hover:bg-bg p-1 rounded">
                            <input 
                              type="checkbox" 
                              checked={batchTargetIds.includes(e.id)}
                              onChange={(ev) => {
                                if (ev.target.checked) setBatchTargetIds([...batchTargetIds, e.id]);
                                else setBatchTargetIds(batchTargetIds.filter(id => id !== e.id));
                              }}
                              className="rounded border-line"
                            />
                            {e.name}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        disabled={!batchSourceId || batchTargetIds.length === 0}
                        onClick={() => handleBatchConnect('one-to-many')}
                        className="p-2 text-[10px] font-mono uppercase border border-line rounded bg-white hover:bg-bg disabled:opacity-50"
                      >
                        1 to Many
                      </button>
                      <button 
                        disabled={!batchSourceId || batchTargetIds.length === 0}
                        onClick={() => handleBatchConnect('many-to-one')}
                        className="p-2 text-[10px] font-mono uppercase border border-line rounded bg-white hover:bg-bg disabled:opacity-50"
                      >
                        Many to 1
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="col-header mb-3">Income Flows (DTA)</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: RelationshipType.DIVIDEND, label: 'Dividends' },
                    { type: RelationshipType.INTEREST, label: 'Interest' },
                    { type: RelationshipType.ROYALTY, label: 'Royalties' },
                    { type: RelationshipType.RENTAL_INCOME, label: 'Rental Income' },
                    { type: RelationshipType.CAPITAL_GAIN, label: 'Capital Gains' },
                    { type: RelationshipType.BUSINESS_PROFIT, label: 'Business Profits' },
                    { type: RelationshipType.PENSION_ANNUITY, label: 'Pensions' },
                    { type: RelationshipType.SOCIAL_SECURITY, label: 'Social Security' },
                    { type: RelationshipType.INDEPENDENT_SERVICE, label: 'Ind. Services' },
                  ].map(flow => (
                    <button 
                      key={flow.type}
                      onClick={() => {
                        if (entities.length < 2) return;
                        const newRel: Relationship = {
                          id: crypto.randomUUID(),
                          fromId: entities[0].id,
                          toId: entities[1].id,
                          type: flow.type,
                          label: flow.label,
                          color: '#10b981', // Default green for income flows
                        };
                        setRelationships([...relationships, newRel]);
                        setSelectedId(newRel.id);
                      }}
                      className="flex items-center gap-2 p-2 text-[11px] border border-line rounded hover:bg-bg"
                    >
                      <ArrowRightLeft size={14} className="text-emerald-600" /> {flow.label}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="col-header mb-3">Templates</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase text-ink/60 mb-2">Standard HK Chains</h4>
                    <div className="space-y-1">
                      <button onClick={() => applyTemplate(HK_HOLDING_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">HK Holding Structure</button>
                      <button onClick={() => applyTemplate(HK_OFFSHORE_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">HK-BVI Offshore Setup</button>
                      <button onClick={() => applyTemplate(OFFSHORE_CHAIN_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg font-medium text-emerald-700">HK/BVI/Cayman Chain</button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase text-ink/60 mb-2">International Tax Planning</h4>
                    <div className="space-y-1">
                      <button onClick={() => applyTemplate(DOUBLE_IRISH_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">Double Irish</button>
                      <button onClick={() => applyTemplate(DUTCH_SANDWICH_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">Double Irish + Dutch Sandwich</button>
                      <button onClick={() => applyTemplate(LUX_FINANCING_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">Luxembourg Financing</button>
                      <button onClick={() => applyTemplate(SWISS_PRINCIPAL_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">Swiss Principal Company</button>
                      <button onClick={() => applyTemplate(SG_IP_BOX_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">Singapore IP Box / Hub</button>
                      <button onClick={() => applyTemplate(MAURITIUS_CYPRUS_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">Mauritius / Cyprus Gateway</button>
                      <button onClick={() => applyTemplate(DUTCH_CV_BV_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">Netherlands CV/BV</button>
                      <button onClick={() => applyTemplate(DELAWARE_LLC_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">Delaware LLC / Check-the-Box</button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase text-ink/60 mb-2">Regional Offshore Setups</h4>
                    <div className="grid grid-cols-1 gap-1">
                      <button onClick={() => applyTemplate(HK_CAYMAN_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg truncate">HK-Cayman</button>
                      <button onClick={() => applyTemplate(HK_DELAWARE_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg truncate">HK-Delaware</button>
                      <button onClick={() => applyTemplate(HK_SINGAPORE_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg truncate">HK-Singapore</button>
                      <button onClick={() => applyTemplate(HK_LUXEMBOURG_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg truncate">HK-Luxembourg</button>
                      <button onClick={() => applyTemplate(HK_MAURITIUS_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg truncate">HK-Mauritius</button>
                      <button onClick={() => applyTemplate(HK_NETHERLANDS_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg truncate">HK-Netherlands</button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase text-ink/60 mb-2">Private Wealth</h4>
                    <button onClick={() => applyTemplate(HK_TRUST_TEMPLATE)} className="w-full text-left p-2 text-[11px] border border-line rounded hover:bg-bg">HK Family Trust</button>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="col-header mb-3">Custom Templates</h3>
                <button 
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 p-2 text-sm border border-line rounded hover:bg-bg"
                >
                  <Save size={16} /> Save Current as Template
                </button>
              </section>
            </div>
          )}

          {activeTab === 'analyze' && (
            <div className="p-4 space-y-6">
              {!analysis && !isAnalyzing && (
                <div className="text-center py-12 space-y-4">
                  <Zap className="mx-auto text-ink/20" size={48} />
                  <p className="text-sm text-ink/60">Ready to analyze your structure for tax implications.</p>
                  <button 
                    onClick={handleAnalyze}
                    className="px-6 py-2 bg-ink text-bg rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Run AI Analysis
                  </button>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-12 space-y-4">
                  <Loader2 className="mx-auto animate-spin text-ink" size={32} />
                  <p className="text-sm font-mono uppercase tracking-widest">Consulting Gemini...</p>
                </div>
              )}

              {analysis && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between border-b border-line pb-4">
                    <h2 className="font-serif italic text-lg">Analysis Result</h2>
                    <button 
                      onClick={handleDownloadAnalysis}
                      className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono uppercase border border-line rounded hover:bg-bg transition-colors"
                    >
                      <Download size={12} /> Download Report
                    </button>
                  </div>
                  
                  <section>
                    <h3 className="col-header mb-2">Investor Considerations</h3>
                    <ul className="space-y-2">
                      {analysis.investorConsiderations.map((item: string, i: number) => (
                        <li key={i} className="text-sm flex gap-2">
                          <span className="text-ink/40">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="col-header mb-2">Structure Risks</h3>
                    <ul className="space-y-2">
                      {analysis.structureConsiderations.map((item: string, i: number) => (
                        <li key={i} className="text-sm flex gap-2">
                          <span className="text-ink/40">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="col-header mb-2">Step Plan</h3>
                    <div className="space-y-3">
                      {analysis.stepPlan.map((step: any, i: number) => (
                        <div key={i} className="p-3 border border-line rounded bg-bg/50">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-mono uppercase">Step {step.step}</span>
                          </div>
                          <p className="text-sm font-medium">{step.action}</p>
                          <p className="text-xs text-ink/60 mt-1 italic">{step.taxImpact}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="col-header mb-2">AI Refinements</h3>
                    <ul className="space-y-2">
                      {analysis.refinements.map((item: string, i: number) => (
                        <li key={i} className="text-sm flex gap-2 p-2 bg-emerald-50 border border-emerald-100 rounded text-emerald-900">
                          <CheckCircle2 size={14} className="shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              )}
            </div>
          )}

          {activeTab === 'library' && (
            <div className="p-4 space-y-2">
              <h3 className="col-header mb-4">Saved Structures</h3>
              {structures.map((s) => (
                <div 
                  key={s.id} 
                  onClick={() => loadStructure(s.id)}
                  className="data-row"
                >
                  <div className="flex items-center justify-center">
                    <FileText size={16} />
                  </div>
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="data-value text-[10px] text-right">
                    {new Date(s.updated_at).toLocaleDateString()}
                  </div>
                  <div className="flex justify-end">
                    <ChevronRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Top Header */}
        <header className="h-16 border-b border-line bg-white flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-bg rounded">
                <ChevronRight size={20} />
              </button>
            )}
            <input 
              value={currentStructureName}
              onChange={(e) => setCurrentStructureName(e.target.value)}
              className="font-serif italic text-lg bg-transparent border-none focus:ring-0 w-64"
            />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm border border-line rounded transition-all",
                isSaving ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "hover:bg-bg"
              )}
            >
              {isSaving ? <CheckCircle2 size={16} /> : <Save size={16} />}
              {isSaving ? 'Saved' : 'Save'}
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-line rounded hover:bg-bg transition-colors"
            >
              <Download size={16} /> Export
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-ink text-bg rounded hover:opacity-90 transition-colors"
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="flex-1 relative">
          <Canvas 
            ref={stageRef}
            entities={entities}
            relationships={relationships}
            onEntityMove={(id, x, y) => updateEntity(id, { x, y })}
            onEntitySelect={(e) => setSelectedId(e?.id || null)}
            onRelationshipSelect={(r) => setSelectedId(r?.id || null)}
            selectedId={selectedId}
          />

          {/* Floating Properties Panel */}
          <AnimatePresence>
            {selectedId && (
              <motion.div 
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="absolute top-6 right-6 w-80 glass-panel p-6 z-20"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="col-header">Properties</h2>
                  <button onClick={() => setSelectedId(null)} className="text-ink/40 hover:text-ink">
                    <Trash2 size={16} onClick={deleteSelected} />
                  </button>
                </div>

                {selectedEntity && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Entity Shape</label>
                      <div className="grid grid-cols-4 gap-2">
                        {Object.values(EntityShape).map(shape => (
                          <button
                            key={shape}
                            onClick={() => updateEntity(selectedEntity.id, { shape })}
                            className={cn(
                              "p-2 border rounded flex items-center justify-center hover:bg-bg transition-colors",
                              selectedEntity.shape === shape || (!selectedEntity.shape && shape === EntityShape.RECTANGLE)
                                ? "border-ink bg-bg" 
                                : "border-line"
                            )}
                            title={shape}
                          >
                            {shape === EntityShape.RECTANGLE && <div className="w-4 h-3 border border-current" />}
                            {shape === EntityShape.CIRCLE && <div className="w-4 h-4 border border-current rounded-full" />}
                            {shape === EntityShape.TRIANGLE && <div className="w-0 h-0 border-x-[8px] border-x-transparent border-b-[14px] border-b-current" />}
                            {shape === EntityShape.DIAMOND && <div className="w-3 h-3 border border-current rotate-45 inline-block" />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Name</label>
                      <input 
                        value={selectedEntity.name}
                        onChange={(e) => updateEntity(selectedEntity.id, { name: e.target.value })}
                        className="w-full p-2 text-sm border border-line rounded bg-transparent"
                      />
                    </div>
                    <CountrySelector 
                      label="Incorporation Jurisdiction"
                      value={selectedEntity.incorporationJurisdiction}
                      onChange={(val) => updateEntity(selectedEntity.id, { incorporationJurisdiction: val })}
                    />
                    <CountrySelector 
                      label="Tax Residency"
                      value={selectedEntity.taxResidency || ''}
                      onChange={(val) => updateEntity(selectedEntity.id, { taxResidency: val })}
                    />
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Registration Location</label>
                      <input 
                        value={selectedEntity.registrationLocation || ''}
                        onChange={(e) => updateEntity(selectedEntity.id, { registrationLocation: e.target.value })}
                        className="w-full p-2 text-sm border border-line rounded bg-transparent"
                        placeholder="City / State"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Industry</label>
                      <input 
                        value={selectedEntity.industry || ''}
                        onChange={(e) => updateEntity(selectedEntity.id, { industry: e.target.value })}
                        className="w-full p-2 text-sm border border-line rounded bg-transparent"
                        placeholder="e.g. Technology, Finance"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-mono uppercase block mb-1">Status</label>
                        <select 
                          value={selectedEntity.status || 'Active'}
                          onChange={(e) => updateEntity(selectedEntity.id, { status: e.target.value })}
                          className="w-full p-2 text-sm border border-line rounded bg-transparent"
                        >
                          <option>Active</option>
                          <option>Dormant</option>
                          <option>In Liquidation</option>
                          <option>Dissolved</option>
                          <option>Proposed</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase block mb-1">Tax Status</label>
                        <select 
                          value={selectedEntity.taxStatus || 'Taxable'}
                          onChange={(e) => updateEntity(selectedEntity.id, { taxStatus: e.target.value })}
                          className="w-full p-2 text-sm border border-line rounded bg-transparent"
                        >
                          <option>Taxable</option>
                          <option>Exempt</option>
                          <option>Transparent</option>
                          <option>Offshore Claim</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Tax Number (e.g. BRN / CRN / HKID)</label>
                      <input 
                        value={selectedEntity.taxNumber || ''}
                        onChange={(e) => updateEntity(selectedEntity.id, { taxNumber: e.target.value })}
                        className="w-full p-2 text-sm border border-line rounded bg-transparent"
                        placeholder="Enter number..."
                      />
                    </div>
                    <div className="flex gap-4 py-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={selectedEntity.isCTC || false}
                          onChange={(e) => updateEntity(selectedEntity.id, { isCTC: e.target.checked })}
                          className="rounded border-line text-ink focus:ring-ink"
                        />
                        <span className="text-[10px] font-mono uppercase">CTC</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={selectedEntity.isFamilyOffice || false}
                          onChange={(e) => updateEntity(selectedEntity.id, { isFamilyOffice: e.target.checked })}
                          className="rounded border-line text-ink focus:ring-ink"
                        />
                        <span className="text-[10px] font-mono uppercase">Family Office</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={selectedEntity.isCFC || false}
                          onChange={(e) => updateEntity(selectedEntity.id, { isCFC: e.target.checked })}
                          className="rounded border-line text-ink focus:ring-ink"
                        />
                        <span className="text-[10px] font-mono uppercase">CFC</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={selectedEntity.isDLRI || false}
                          onChange={(e) => updateEntity(selectedEntity.id, { isDLRI: e.target.checked })}
                          className="rounded border-line text-ink focus:ring-ink"
                        />
                        <span className="text-[10px] font-mono uppercase">DLRI</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={selectedEntity.isSection88 || false}
                          onChange={(e) => updateEntity(selectedEntity.id, { isSection88: e.target.checked })}
                          className="rounded border-line text-ink focus:ring-ink"
                        />
                        <span className="text-[10px] font-mono uppercase">Section 88</span>
                      </label>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Notes</label>
                      <textarea 
                        value={selectedEntity.notes || ''}
                        onChange={(e) => updateEntity(selectedEntity.id, { notes: e.target.value })}
                        className="w-full p-2 text-sm border border-line rounded bg-transparent h-24"
                        placeholder="Tax residency details, etc."
                      />
                    </div>
                  </div>
                )}

                {selectedRel && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Label</label>
                      <input 
                        value={selectedRel.label}
                        onChange={(e) => updateRelationship(selectedRel.id, { label: e.target.value })}
                        className="w-full p-2 text-sm border border-line rounded bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Type</label>
                      <select 
                        value={selectedRel.type}
                        onChange={(e) => updateRelationship(selectedRel.id, { type: e.target.value as RelationshipType })}
                        className="w-full p-2 text-sm border border-line rounded bg-transparent"
                      >
                        {Object.values(RelationshipType).map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Percentage (%)</label>
                      <input 
                        type="number"
                        value={selectedRel.percentage || ''}
                        onChange={(e) => updateRelationship(selectedRel.id, { percentage: Number(e.target.value) })}
                        className="w-full p-2 text-sm border border-line rounded bg-transparent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-[10px] font-mono uppercase block mb-1">From</label>
                        <select 
                          value={selectedRel.fromId}
                          onChange={(e) => updateRelationship(selectedRel.id, { fromId: e.target.value })}
                          className="w-full p-2 text-xs border border-line rounded bg-transparent"
                        >
                          {entities.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] font-mono uppercase block mb-1">To</label>
                        <select 
                          value={selectedRel.toId}
                          onChange={(e) => updateRelationship(selectedRel.id, { toId: e.target.value })}
                          className="w-full p-2 text-xs border border-line rounded bg-transparent"
                        >
                          {entities.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Color</label>
                      <div className="flex gap-2">
                        {['#94a3b8', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map(c => (
                          <button
                            key={c}
                            onClick={() => updateRelationship(selectedRel.id, { color: c })}
                            className={cn(
                              "w-6 h-6 rounded-full border border-line",
                              selectedRel.color === c && "ring-2 ring-ink ring-offset-2"
                            )}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Line Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.values(LineType).map(lt => (
                          <button
                            key={lt}
                            onClick={() => updateRelationship(selectedRel.id, { lineType: lt })}
                            className={cn(
                              "p-2 text-[10px] border rounded hover:bg-bg transition-colors",
                              (selectedRel.lineType === lt || (!selectedRel.lineType && lt === LineType.SOLID)) ? "border-ink bg-bg" : "border-line"
                            )}
                          >
                            {lt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase block mb-1">Notes</label>
                      <textarea 
                        value={selectedRel.notes || ''}
                        onChange={(e) => updateRelationship(selectedRel.id, { notes: e.target.value })}
                        className="w-full p-2 text-sm border border-line rounded bg-transparent h-24"
                        placeholder="Nature of relationship, tax treatment, etc."
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
