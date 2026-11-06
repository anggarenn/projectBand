"use client";

import React from "react";
import type { MerchProduct } from "@/lib/supabase";
import { ArrowUpRightIcon, CloseIcon, WhatsAppIcon } from "./Icons";

interface OrderModalProps {
  item: MerchProduct;
  selectedSize: string;
  sizeError: boolean;
  onSelectSize: (size: string) => void;
  onClose: () => void;
  onOrder: () => void;
}

export function OrderModal({
  item,
  selectedSize,
  sizeError,
  onSelectSize,
  onClose,
  onOrder,
}: OrderModalProps) {
  const hasSizes = (item.sizes?.length ?? 0) > 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md px-4 snv-modal-backdrop"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="relative w-full max-w-[460px] bg-[#282828] border border-white/15 shadow-2xl snv-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 flex items-center justify-center text-black/45 hover:text-black transition-colors cursor-pointer"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        <div
          className="bg-[#D9D9D9] w-full flex items-center justify-center px-6 py-5"
          style={{ height: "280px" }}
        >
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="font-bebas text-2xl text-black/30 uppercase tracking-widest text-center">
              {item.title}
            </span>
          )}
        </div>

        <div className="px-6 sm:px-7 py-6 space-y-5">
          <div className="space-y-1">
            <div className="text-lg sm:text-xl font-sans font-bold text-white tracking-wide">
              {item.price}
            </div>
            <div className="text-[11px] sm:text-[12px] font-sans text-white/70 uppercase tracking-wider leading-relaxed">
              {item.title}
            </div>
          </div>

          {hasSizes && (
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-white/45 block mb-2.5">
                Pilih ukuran
              </span>
              <div className="flex gap-2 flex-wrap">
                {(item.sizes ?? []).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => onSelectSize(size)}
                    className={`min-w-[44px] h-9 px-3.5 text-[12px] font-sans uppercase tracking-wider border transition-all duration-150 cursor-pointer ${
                      selectedSize === size
                        ? "bg-white border-white text-[#1A1A1A] font-semibold"
                        : "border-white/30 text-white/80 hover:border-white/75 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-red-400 text-[11px] mt-2">
                  Pilih ukuran terlebih dahulu.
                </p>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={onOrder}
            className="group w-full flex items-center justify-between px-4 py-3 border border-white/40 hover:border-white/85 text-white hover:bg-white/[0.06] transition-all duration-150 text-[12px] sm:text-[13px] font-sans tracking-wide cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span className="font-normal">Pesan via WhatsApp</span>
            </span>
            <ArrowUpRightIcon className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
