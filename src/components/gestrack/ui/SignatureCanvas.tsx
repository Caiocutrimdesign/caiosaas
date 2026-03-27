import React, { useRef, useState, useEffect } from 'react';
import { GestrackButton } from './GestrackButton';
import { Eraser, Check } from 'lucide-react';

interface SignatureCanvasProps {
  onSave: (signature: string) => void;
  onClear?: () => void;
}

export const SignatureCanvas = ({ onSave, onClear }: SignatureCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setIsEmpty(false);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    setIsEmpty(true);
    if (onClear) onClear();
  };

  const handleConfirm = () => {
    const canvas = canvasRef.current;
    if (!canvas || isEmpty) return;
    onSave(canvas.toDataURL());
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-zinc-950 border-2 border-zinc-900 rounded-3xl h-64 overflow-hidden touch-none group hover:border-zinc-800 transition-all">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair"
        />
        {isEmpty && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-[10px] text-zinc-700 font-black uppercase tracking-widest italic">Área de Assinatura Digital</p>
           </div>
        )}
      </div>
      <div className="flex gap-3">
        <GestrackButton 
          variant="outline" 
          onClick={clearCanvas}
          className="flex-1 h-12 border-zinc-800 text-zinc-500 gap-2 hover:bg-zinc-900"
        >
          <Eraser className="w-4 h-4" /> Limpar
        </GestrackButton>
        <GestrackButton 
          disabled={isEmpty}
          onClick={handleConfirm}
          className="flex-1 h-12 bg-blue-600 text-white gap-2"
        >
          <Check className="w-4 h-4" /> Confirmar
        </GestrackButton>
      </div>
    </div>
  );
};
