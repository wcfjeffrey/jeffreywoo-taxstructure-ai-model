import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text, Line, Group, Arrow, RegularPolygon } from 'react-konva';
import { Entity, Relationship, EntityType, RelationshipType, EntityShape, LineType } from '../types';
import { Building2, User, Landmark, Users, HelpCircle, Info } from 'lucide-react';
import Konva from 'konva';

interface CanvasProps {
  entities: Entity[];
  relationships: Relationship[];
  onEntityMove: (id: string, x: number, y: number) => void;
  onEntitySelect: (entity: Entity | null) => void;
  onRelationshipSelect: (rel: Relationship | null) => void;
  selectedId: string | null;
}

const ENTITY_COLORS = {
  [EntityType.JOINT_STOCK_COMPANY]: '#3b82f6',
  [EntityType.INDIVIDUAL]: '#f59e0b',
  [EntityType.PARTNERSHIP]: '#8b5cf6',
  [EntityType.FOUNDATION]: '#ec4899',
  [EntityType.JOINT_VENTURE]: '#06b6d4',
  [EntityType.BRANCH]: '#6366f1',
  [EntityType.REPRESENTATIVE_OFFICE]: '#14b8a6',
  [EntityType.SPV]: '#f43f5e',
  [EntityType.SOCIETY]: '#84cc16',
  [EntityType.SOLE_PROPRIETORSHIP]: '#eab308',
  [EntityType.LISTED_COMPANY]: '#2563eb',
  [EntityType.LIMITED_COMPANY]: '#3b82f6',
  [EntityType.UNLIMITED_COMPANY]: '#ef4444',
  [EntityType.COOPERATIVE]: '#f97316',
  [EntityType.LPF]: '#6366f1',
  [EntityType.OFC]: '#3b82f6',
  [EntityType.UNIT_TRUST]: '#10b981',
  [EntityType.DISCRETIONARY_TRUST]: '#059669',
  [EntityType.HYBRID_TRUST]: '#0d9488',
  [EntityType.CHARITABLE_TRUST]: '#0891b2',
  [EntityType.CHARITABLE_COMPANY]: '#0e7490',
  [EntityType.VENTURE_CAPITAL]: '#4f46e5',
};

export const Canvas = React.forwardRef<Konva.Stage, CanvasProps>(({
  entities,
  relationships,
  onEntityMove,
  onEntitySelect,
  onRelationshipSelect,
  selectedId,
}, ref) => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getEntityPos = (id: string) => {
    const entity = entities.find((e) => e.id === id);
    return entity ? { x: entity.x, y: entity.y } : { x: 0, y: 0 };
  };

  const getIntersectionPoint = (from: { x: number; y: number }, to: { x: number; y: number }, shape?: EntityShape) => {
    let w = 140;
    let h = 80;

    if (shape === EntityShape.CIRCLE) {
      w = 100;
      h = 100;
    } else if (shape === EntityShape.DIAMOND) {
      w = 143;
      h = 110;
    } else if (shape === EntityShape.TRIANGLE) {
      w = 120;
      h = 100;
    }
    
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    
    if (dx === 0 && dy === 0) return to;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    
    const scaleX = (w / 2) / absDx;
    const scaleY = (h / 2) / absDy;
    
    const scale = Math.min(scaleX, scaleY);
    
    return {
      x: to.x - dx * scale,
      y: to.y - dy * scale
    };
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-[#f8f9fa] relative overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />
      
      <Stage width={dimensions.width} height={dimensions.height} draggable ref={ref}>
        <Layer>
          {/* Legend */}
          <Group x={20} y={20}>
            <Rect
              width={140}
              height={140}
              fill="white"
              stroke="#e2e8f0"
              cornerRadius={8}
              shadowBlur={5}
              shadowOpacity={0.05}
            />
            <Text
              text="Legend"
              fontSize={12}
              fontStyle="bold"
              fontFamily="Inter"
              fill="#1e293b"
              x={10}
              y={10}
            />
            <Group x={10} y={35}>
              <Rect width={12} height={12} fill="#3b82f6" cornerRadius={2} />
              <Text text="Corporate" fontSize={10} fontFamily="Inter" fill="#64748b" x={20} y={1} />
            </Group>
            <Group x={10} y={55}>
              <Rect width={12} height={12} fill="#f43f5e" cornerRadius={2} />
              <Text text="SPV" fontSize={10} fontFamily="Inter" fill="#64748b" x={20} y={1} />
            </Group>
            <Group x={10} y={75}>
              <Rect width={12} height={12} fill="#10b981" cornerRadius={2} />
              <Text text="Trust" fontSize={10} fontFamily="Inter" fill="#64748b" x={20} y={1} />
            </Group>
            <Group x={10} y={95}>
              <Rect width={12} height={12} fill="#f59e0b" cornerRadius={2} />
              <Text text="Individual/Partnership" fontSize={10} fontFamily="Inter" fill="#64748b" x={20} y={1} />
            </Group>
            <Group x={10} y={115}>
              <Rect width={12} height={12} fill="#ec4899" cornerRadius={2} />
              <Text text="Other" fontSize={10} fontFamily="Inter" fill="#64748b" x={20} y={1} />
            </Group>
          </Group>

          {/* Entities */}
          {entities.map((entity) => {
            const isSelected = selectedId === entity.id;
            const color = ENTITY_COLORS[entity.type];
            const shape = entity.shape || EntityShape.RECTANGLE;

            return (
              <Group
                key={entity.id}
                x={entity.x}
                y={entity.y}
                draggable
                onDragEnd={(e) => {
                  onEntityMove(entity.id, e.target.x(), e.target.y());
                }}
                onClick={() => onEntitySelect(entity)}
              >
                {shape === EntityShape.RECTANGLE && (
                  <>
                    <Rect
                      width={140}
                      height={80}
                      fill="white"
                      stroke={isSelected ? '#2563eb' : '#e2e8f0'}
                      strokeWidth={isSelected ? 2 : 1}
                      cornerRadius={8}
                      shadowBlur={isSelected ? 10 : 2}
                      shadowOpacity={0.1}
                      offsetX={70}
                      offsetY={40}
                    />
                    <Rect
                      width={140}
                      height={4}
                      fill={color}
                      cornerRadius={[8, 8, 0, 0]}
                      offsetX={70}
                      offsetY={40}
                    />
                  </>
                )}

                {shape === EntityShape.CIRCLE && (
                  <Circle
                    radius={50}
                    fill="white"
                    stroke={isSelected ? '#2563eb' : color}
                    strokeWidth={isSelected ? 3 : 2}
                    shadowBlur={isSelected ? 10 : 2}
                    shadowOpacity={0.1}
                  />
                )}

                {shape === EntityShape.TRIANGLE && (
                  <RegularPolygon
                    sides={3}
                    radius={60}
                    fill="white"
                    stroke={isSelected ? '#2563eb' : color}
                    strokeWidth={isSelected ? 3 : 2}
                    shadowBlur={isSelected ? 10 : 2}
                    shadowOpacity={0.1}
                    rotation={0}
                  />
                )}

                {shape === EntityShape.DIAMOND && (
                  <RegularPolygon
                    sides={4}
                    radius={55}
                    fill="white"
                    stroke={isSelected ? '#2563eb' : color}
                    strokeWidth={isSelected ? 3 : 2}
                    shadowBlur={isSelected ? 10 : 2}
                    shadowOpacity={0.1}
                    rotation={45}
                    scaleX={1.3}
                  />
                )}

                <Text
                  text={entity.name}
                  fontSize={12}
                  fontStyle="bold"
                  fontFamily="Inter"
                  fill="#1e293b"
                  align="center"
                  width={120}
                  offsetX={60}
                  offsetY={shape === EntityShape.RECTANGLE ? 20 : 10}
                />
                <Text
                  text={entity.incorporationJurisdiction}
                  fontSize={10}
                  fontFamily="Inter"
                  fill="#64748b"
                  align="center"
                  width={120}
                  offsetX={60}
                  offsetY={shape === EntityShape.RECTANGLE ? 0 : -10}
                />
                <Text
                  text={entity.type}
                  fontSize={8}
                  fontFamily="JetBrains Mono"
                  fill={color}
                  align="center"
                  width={120}
                  offsetX={60}
                  offsetY={shape === EntityShape.RECTANGLE ? -20 : -25}
                />
              </Group>
            );
          })}

          {/* Relationships */}
          {relationships.map((rel, idx) => {
            const fromEntity = entities.find(e => e.id === rel.fromId);
            const toEntity = entities.find(e => e.id === rel.toId);
            
            if (!fromEntity || !toEntity) return null;

            const fromCenter = { x: fromEntity.x, y: fromEntity.y };
            const toCenter = { x: toEntity.x, y: toEntity.y };
            
            // Find all relationships between these two entities (in either direction)
            const siblings = relationships.filter(r => 
              (r.fromId === rel.fromId && r.toId === rel.toId) ||
              (r.fromId === rel.toId && r.toId === rel.fromId)
            );
            
            const siblingIndex = siblings.findIndex(r => r.id === rel.id);
            const totalSiblings = siblings.length;
            
            // Calculate offset for parallel lines
            const offsetStep = 20;
            const offset = (siblingIndex - (totalSiblings - 1) / 2) * offsetStep;
            
            // Calculate perpendicular vector for offset
            const dx = toCenter.x - fromCenter.x;
            const dy = toCenter.y - fromCenter.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            
            const nx = length === 0 ? 0 : -dy / length;
            const ny = length === 0 ? 0 : dx / length;
            
            const adjustedFromCenter = {
              x: fromCenter.x + nx * offset,
              y: fromCenter.y + ny * offset
            };
            const adjustedToCenter = {
              x: toCenter.x + nx * offset,
              y: toCenter.y + ny * offset
            };

            const from = getIntersectionPoint(adjustedToCenter, adjustedFromCenter, fromEntity.shape);
            const to = getIntersectionPoint(adjustedFromCenter, adjustedToCenter, toEntity.shape);
            
            const isSelected = selectedId === rel.id;
            const relColor = rel.color || (isSelected ? '#2563eb' : '#94a3b8');
            
            let dash: number[] | undefined = undefined;
            if (rel.lineType === LineType.DASHED) dash = [10, 5];
            if (rel.lineType === LineType.DOTTED) dash = [2, 2];

            // Calculate mid point for label
            const midX = (adjustedFromCenter.x + adjustedToCenter.x) / 2;
            const midY = (adjustedFromCenter.y + adjustedToCenter.y) / 2;

            // Apply offset to label as well to prevent overlap
            const labelOffsetX = nx * offset * 0.5;
            const labelOffsetY = ny * offset * 0.5;

            const displayText = rel.percentage !== undefined ? `${rel.percentage}% ${rel.label}` : rel.label;

            return (
              <Group key={rel.id} onClick={() => onRelationshipSelect(rel)}>
                <Arrow
                  points={[from.x, from.y, to.x, to.y]}
                  stroke={relColor}
                  strokeWidth={isSelected ? 3 : 2}
                  fill={relColor}
                  pointerLength={12}
                  pointerWidth={12}
                  dash={dash}
                />
                <Group x={midX + labelOffsetX} y={midY + labelOffsetY}>
                  <Rect
                    width={80}
                    height={20}
                    fill="white"
                    stroke="#e2e8f0"
                    cornerRadius={4}
                    offsetX={40}
                    offsetY={10}
                  />
                  <Text
                    text={displayText}
                    fontSize={10}
                    fontFamily="Inter"
                    fill="#475569"
                    align="center"
                    width={80}
                    offsetX={40}
                    offsetY={5}
                  />
                </Group>
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
});

Canvas.displayName = 'Canvas';
