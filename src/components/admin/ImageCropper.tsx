"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

type Area = { x: number; y: number; width: number; height: number };

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", reject);
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas is empty"));
    }, "image/jpeg", 0.92);
  });
}

type Props = {
  imageSrc: string;
  aspectRatio?: number;
  onConfirm: (blob: Blob) => void;
  onCancel: () => void;
};

export default function ImageCropper({ imageSrc, aspectRatio = 16 / 9, onConfirm, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  async function handleConfirm() {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
    onConfirm(blob);
    setProcessing(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#0D2418]">Ajustar imagem</h3>
            <p className="text-xs text-gray-400 mt-0.5">Arraste para reposicionar · Use o zoom para enquadrar</p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>

        {/* Cropper area */}
        <div className="relative w-full" style={{ height: 360, background: "#111" }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={true}
            style={{
              containerStyle: { borderRadius: 0 },
              cropAreaStyle: { border: "2px solid #4CAF50" },
            }}
          />
        </div>

        {/* Zoom slider */}
        <div className="px-5 py-4 border-t bg-gray-50">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-10">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-[#4CAF50]"
            />
            <span className="text-xs text-gray-500 w-8 text-right">{zoom.toFixed(1)}×</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-4 border-t flex justify-end gap-3">
          <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={processing}
            className="text-sm bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-semibold px-6 py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            {processing ? "Processando..." : "Confirmar corte"}
          </button>
        </div>
      </div>
    </div>
  );
}
