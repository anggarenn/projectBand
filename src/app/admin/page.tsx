"use client";

import React from "react";
import type { MerchProduct } from "@/lib/supabase";

const ALL_SIZES = ["S", "M", "L", "XL", "XXL"];
const LEGACY_KEYS = ["snv_admin_logged", "snv_admin_session"];

function formatRemainingTime(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function BagIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function PlusIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function TrashIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function EditIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function LogoutIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function UploadIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ExternalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function LoginScreen({
  pinInput,
  pinError,
  submitting,
  onChange,
  onSubmit,
}: {
  pinInput: string;
  pinError: string;
  submitting: boolean;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div
      style={{ background: "#0A0A0A" }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div
        style={{
          background: "#161616",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        className="w-full max-w-sm p-8 rounded-sm flex flex-col gap-6"
      >
        <div className="text-center">
          <h1
            className="font-bebas text-4xl sm:text-[42px] tracking-wider leading-none"
            style={{ color: "#D4E627" }}
          >
            SILLY N VALLEY ADMIN
          </h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="password"
            value={pinInput}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="current-password"
            placeholder="Password"
            disabled={submitting}
            style={{
              background: "#0A0A0A",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
            }}
            className="w-full px-4 py-3 rounded-sm text-sm outline-none focus:border-[#D4E627] transition-colors placeholder:text-white/30 disabled:opacity-50"
          />
          {pinError && <p className="text-red-400 text-xs">{pinError}</p>}
          <button
            type="submit"
            disabled={submitting}
            style={{ background: "#D4E627", color: "#000" }}
            className="w-full py-3 rounded-sm font-bebas tracking-widest text-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
          >
            {submitting ? "MEMERIKSA..." : "MASUK"}
          </button>
        </form>
      </div>
    </div>
  );
}

function DeleteModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div
        style={{
          background: "#161616",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        className="rounded-sm p-8 w-full max-w-xs flex flex-col gap-6"
      >
        <p className="text-white text-center font-semibold">
          Hapus merch ini?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            className="flex-1 py-2 rounded-sm text-white text-sm hover:bg-white/5 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-sm bg-red-600 text-white text-sm hover:bg-red-700 transition-colors cursor-pointer"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

function MerchFormModal({
  editingItem,
  formTitle,
  formPrice,
  formSizes,
  formActive,
  formImageFile,
  formImagePreview,
  saving,
  onClose,
  onSave,
  setFormTitle,
  setFormPrice,
  setFormSizes,
  setFormActive,
  setFormImageFile,
  setFormImagePreview,
}: {
  editingItem: MerchProduct | null;
  formTitle: string;
  formPrice: string;
  formSizes: string[];
  formActive: boolean;
  formImageFile: File | null;
  formImagePreview: string;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  setFormTitle: (v: string) => void;
  setFormPrice: (v: string) => void;
  setFormSizes: (v: string[]) => void;
  setFormActive: (v: boolean) => void;
  setFormImageFile: (v: File | null) => void;
  setFormImagePreview: (v: string) => void;
}) {
  const fileRef = React.useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setFormImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setFormImagePreview("");
    }
  }

  function toggleSize(size: string) {
    setFormSizes(
      formSizes.includes(size)
        ? formSizes.filter((s) => s !== size)
        : [...formSizes, size]
    );
  }

  const previewSrc = formImagePreview || (editingItem?.image_url ?? "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div
        style={{
          background: "#161616",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        className="w-full max-w-lg rounded-sm flex flex-col max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="font-bebas text-2xl tracking-widest text-white">
            {editingItem ? "EDIT MERCH" : "TAMBAH MERCH"}
          </h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-xs uppercase tracking-widest">
              Upload Foto (PNG / JPG / WebP, Maks 5 MB)
            </label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              style={{
                border: "1px dashed rgba(255,255,255,0.2)",
                background: "#0A0A0A",
              }}
              className="relative w-full h-40 rounded-sm flex flex-col items-center justify-center gap-2 hover:border-[#D4E627]/60 transition-colors overflow-hidden cursor-pointer"
            >
              {previewSrc ? (
                <img
                  src={previewSrc}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <>
                  <UploadIcon size={24} className="text-white/40" />
                  <span className="text-white/40 text-xs">
                    Klik untuk upload gambar
                  </span>
                </>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
            {formImageFile && (
              <p className="text-white/40 text-xs truncate">
                {formImageFile.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-xs uppercase tracking-widest">
              Judul Produk
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              maxLength={160}
              placeholder="Nama produk"
              style={{
                background: "#0A0A0A",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
              className="px-4 py-2.5 rounded-sm text-sm outline-none focus:border-[#D4E627] transition-colors placeholder:text-white/30"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-xs uppercase tracking-widest">
              Harga
            </label>
            <input
              type="text"
              value={formPrice}
              onChange={(e) => setFormPrice(e.target.value)}
              maxLength={60}
              placeholder="Rp 150,000"
              style={{
                background: "#0A0A0A",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
              className="px-4 py-2.5 rounded-sm text-sm outline-none focus:border-[#D4E627] transition-colors placeholder:text-white/30"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-white/60 text-xs uppercase tracking-widest">
                Ukuran Tersedia
              </label>
              <button
                type="button"
                onClick={() =>
                  setFormSizes(
                    formSizes.length === ALL_SIZES.length ? [] : [...ALL_SIZES]
                  )
                }
                className="text-[11px] text-[#D4E627]/80 hover:text-[#D4E627] transition-colors cursor-pointer"
              >
                {formSizes.length === ALL_SIZES.length
                  ? "Kosongkan (Non-Baju)"
                  : "Pilih Semua"}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((size) => {
                const active = formSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    style={
                      active
                        ? {
                            background: "#D4E627",
                            color: "#000",
                            border: "1px solid #D4E627",
                          }
                        : {
                            background: "transparent",
                            color: "rgba(255,255,255,0.6)",
                            border: "1px solid rgba(255,255,255,0.2)",
                          }
                    }
                    className="px-4 py-1.5 rounded-sm text-xs font-semibold tracking-wider transition-all cursor-pointer"
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <p className="text-white/30 text-[11px]">
              Kosongkan semua ukuran untuk produk non-apparel (seperti kaset pita).
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/60 text-xs uppercase tracking-widest">
              Status
            </span>
            <button
              type="button"
              onClick={() => setFormActive(!formActive)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                style={{
                  background: formActive ? "#D4E627" : "rgba(255,255,255,0.1)",
                  transition: "background 0.2s",
                }}
                className="relative w-10 h-5 rounded-full"
              >
                <span
                  style={{
                    transform: formActive
                      ? "translateX(20px)"
                      : "translateX(2px)",
                    background: formActive ? "#000" : "rgba(255,255,255,0.5)",
                    transition: "transform 0.2s",
                  }}
                  className="absolute top-0.5 w-4 h-4 rounded-full block"
                />
              </div>
              <span
                className={`text-xs font-semibold ${
                  formActive ? "text-[#D4E627]" : "text-white/40"
                }`}
              >
                {formActive ? "Active" : "Inactive"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            className="flex-1 py-2.5 rounded-sm text-white text-sm hover:bg-white/5 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            style={{ background: "#D4E627", color: "#000" }}
            className="flex-1 py-2.5 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <span className="animate-pulse">Menyimpan...</span>
            ) : (
              <>
                <CheckIcon size={16} />
                Simpan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authChecking, setAuthChecking] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [sessionExpiresAt, setSessionExpiresAt] = React.useState<number | null>(
    null
  );
  const [remainingTime, setRemainingTime] = React.useState("15:00");
  const [pinInput, setPinInput] = React.useState("");
  const [pinError, setPinError] = React.useState("");
  const [loginSubmitting, setLoginSubmitting] = React.useState(false);

  const [merch, setMerch] = React.useState<MerchProduct[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [showForm, setShowForm] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<MerchProduct | null>(
    null
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState<
    string | null
  >(null);
  const [toast, setToast] = React.useState("");

  const [formTitle, setFormTitle] = React.useState("");
  const [formPrice, setFormPrice] = React.useState("");
  const [formSizes, setFormSizes] = React.useState<string[]>([]);
  const [formActive, setFormActive] = React.useState(true);
  const [formImageFile, setFormImageFile] = React.useState<File | null>(null);
  const [formImagePreview, setFormImagePreview] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const forceExpireLogout = React.useCallback((message?: string) => {
    fetch("/api/admin/auth", { method: "DELETE" }).catch(() => {});
    setSessionExpiresAt(null);
    setIsAuthenticated(false);
    setShowForm(false);
    setShowDeleteConfirm(null);
    setPinInput("");
    if (message) setPinError(message);
  }, []);

  // Verify HttpOnly session cookie on mount and purge any legacy localStorage keys
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      for (const key of LEGACY_KEYS) {
        try {
          localStorage.removeItem(key);
        } catch {}
      }
    }

    let cancelled = false;
    fetch("/api/admin/auth", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return null;
        return (await res.json()) as {
          authenticated?: boolean;
          expiresAt?: number;
        };
      })
      .then((data) => {
        if (cancelled) return;
        const expiresAt = Number(data?.expiresAt ?? 0);
        if (data?.authenticated && expiresAt > Date.now()) {
          setSessionExpiresAt(expiresAt);
          setRemainingTime(formatRemainingTime(expiresAt - Date.now()));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsAuthenticated(false);
      })
      .finally(() => {
        if (!cancelled) setAuthChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Countdown + auto-logout after 15 minutes
  React.useEffect(() => {
    if (!isAuthenticated || !sessionExpiresAt) return;

    const checkExpiry = () => {
      const diff = sessionExpiresAt - Date.now();
      if (diff <= 0) {
        forceExpireLogout(
          "Sesi admin (15 menit) telah berakhir. Silakan login kembali."
        );
        return;
      }
      setRemainingTime(formatRemainingTime(diff));
    };

    checkExpiry();
    const timer = window.setInterval(checkExpiry, 1000);
    const onVisibilityOrFocus = () => checkExpiry();

    document.addEventListener("visibilitychange", onVisibilityOrFocus);
    window.addEventListener("focus", onVisibilityOrFocus);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityOrFocus);
      window.removeEventListener("focus", onVisibilityOrFocus);
    };
  }, [isAuthenticated, sessionExpiresAt, forceExpireLogout]);

  const loadMerch = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/merch", { cache: "no-store" });
      if (res.status === 401) {
        forceExpireLogout(
          "Sesi admin (15 menit) telah berakhir. Silakan login kembali."
        );
        return;
      }
      if (res.ok) {
        const data = (await res.json()) as { items?: MerchProduct[] };
        setMerch(Array.isArray(data.items) ? data.items : []);
      }
    } finally {
      setLoading(false);
    }
  }, [forceExpireLogout]);

  React.useEffect(() => {
    if (isAuthenticated) {
      loadMerch();
    }
  }, [isAuthenticated, loadMerch]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  }

  async function handleLogin() {
    if (!pinInput.trim() || loginSubmitting) return;
    setLoginSubmitting(true);
    setPinError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pinInput }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        authenticated?: boolean;
        expiresAt?: number;
        error?: string;
      };

      if (!res.ok || !data.authenticated) {
        setPinError(data.error || "Password salah. Coba lagi.");
        return;
      }

      const expiresAt = Number(data.expiresAt ?? Date.now() + 15 * 60 * 1000);
      setSessionExpiresAt(expiresAt);
      setRemainingTime(formatRemainingTime(expiresAt - Date.now()));
      setIsAuthenticated(true);
      setPinInput("");
      setPinError("");
    } catch {
      setPinError("Gagal menghubungi server. Coba lagi.");
    } finally {
      setLoginSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" }).catch(() => {});
    setSessionExpiresAt(null);
    setIsAuthenticated(false);
    setPinInput("");
    setPinError("");
  }

  function resetForm() {
    setFormTitle("");
    setFormPrice("");
    setFormSizes([...ALL_SIZES]);
    setFormActive(true);
    setFormImageFile(null);
    setFormImagePreview("");
    setEditingItem(null);
  }

  function openAdd() {
    resetForm();
    setShowForm(true);
  }

  function openEdit(item: MerchProduct) {
    setEditingItem(item);
    setFormTitle(item.title ?? "");
    setFormPrice(item.price ?? "");
    setFormSizes(item.sizes ?? []);
    setFormActive(item.is_active ?? true);
    setFormImageFile(null);
    setFormImagePreview("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    resetForm();
  }

  async function uploadImageViaServer(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
    });

    if (res.status === 401) {
      forceExpireLogout(
        "Sesi admin (15 menit) telah berakhir. Silakan login kembali."
      );
      return null;
    }

    const data = (await res.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
    };

    if (!res.ok || !data.url) {
      showToast(data.error || "Gagal mengunggah foto.");
      return null;
    }

    return data.url;
  }

  async function handleSave() {
    if (!formTitle.trim()) {
      showToast("Judul produk wajib diisi.");
      return;
    }
    if (!formPrice.trim()) {
      showToast("Harga produk wajib diisi.");
      return;
    }
    setSaving(true);
    try {
      let imageUrl = editingItem?.image_url ?? "";
      if (formImageFile) {
        const uploaded = await uploadImageViaServer(formImageFile);
        if (!uploaded) return;
        imageUrl = uploaded;
      }

      if (editingItem) {
        const res = await fetch("/api/admin/merch", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            title: formTitle.trim(),
            price: formPrice.trim(),
            sizes: formSizes,
            is_active: formActive,
            ...(formImageFile ? { image_url: imageUrl } : {}),
          }),
        });

        if (res.status === 401) {
          forceExpireLogout(
            "Sesi admin (15 menit) telah berakhir. Silakan login kembali."
          );
          return;
        }

        if (!res.ok) {
          const err = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          showToast(err.error || "Gagal memperbarui merch di database.");
          return;
        }
        showToast("Merch berhasil diperbarui.");
      } else {
        const res = await fetch("/api/admin/merch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle.trim(),
            price: formPrice.trim(),
            sizes: formSizes,
            is_active: formActive,
            image_url: imageUrl,
          }),
        });

        if (res.status === 401) {
          forceExpireLogout(
            "Sesi admin (15 menit) telah berakhir. Silakan login kembali."
          );
          return;
        }

        if (!res.ok) {
          const err = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          showToast(err.error || "Gagal menambahkan merch ke database.");
          return;
        }
        showToast("Merch berhasil ditambahkan.");
      }

      closeForm();
      await loadMerch();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setShowDeleteConfirm(null);
    const res = await fetch(
      `/api/admin/merch?id=${encodeURIComponent(id)}`,
      { method: "DELETE" }
    );

    if (res.status === 401) {
      forceExpireLogout(
        "Sesi admin (15 menit) telah berakhir. Silakan login kembali."
      );
      return;
    }

    if (!res.ok) {
      showToast("Gagal menghapus merch.");
      return;
    }

    showToast("Merch berhasil dihapus.");
    await loadMerch();
  }

  if (authChecking) {
    return (
      <div
        style={{ background: "#0A0A0A" }}
        className="min-h-screen flex items-center justify-center"
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen
        pinInput={pinInput}
        pinError={pinError}
        submitting={loginSubmitting}
        onChange={setPinInput}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <div
      style={{ background: "#0A0A0A" }}
      className="min-h-screen flex flex-col md:flex-row font-sans"
    >
      <aside
        style={{
          background: "#111111",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
        className="w-full md:w-[240px] md:fixed md:inset-y-0 md:left-0 flex flex-col z-30 border-b md:border-b-0 border-white/10"
      >
        <div className="px-6 pt-6 md:pt-8 pb-5 md:pb-6 border-b border-white/5 flex items-center justify-between md:block">
          <div>
            <p
              style={{ color: "#D4E627" }}
              className="font-bebas text-lg tracking-widest leading-none"
            >
              SILLY N VALLEY
            </p>
            <p className="text-white/40 text-xs tracking-widest mt-0.5">
              ADMIN PANEL
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center gap-1 text-xs text-white/60 hover:text-[#D4E627] transition-colors"
          >
            Web <ExternalIcon size={14} />
          </a>
        </div>

        <nav className="flex-1 px-3 py-3 md:py-4 space-y-1">
          <button
            style={{ background: "rgba(212,230,39,0.08)", color: "#D4E627" }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-semibold tracking-wide"
          >
            <BagIcon size={16} />
            MERCH
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex w-full items-center justify-between px-3 py-2.5 rounded-sm text-white/50 text-sm hover:bg-white/5 hover:text-white transition-colors"
          >
            <span>Lihat Website</span>
            <ExternalIcon size={14} />
          </a>
        </nav>

        <div className="p-3 border-t border-white/5 space-y-1.5">
          <div className="px-3 flex items-center justify-between text-[11px] text-white/35">
            <span>Sesi aktif</span>
            <span className="font-mono text-white/55">{remainingTime}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-white/50 text-sm hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            <LogoutIcon size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-[240px] p-5 sm:p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bebas text-5xl tracking-widest text-white">
            MERCH
          </h1>
          <button
            onClick={openAdd}
            style={{ background: "#D4E627", color: "#000" }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            <PlusIcon size={16} />
            TAMBAH MERCH
          </button>
        </div>

        {loading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: "#161616",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                className="h-20 rounded-sm animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && merch.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <BagIcon size={40} className="text-white/20" />
            <p className="text-white/30 text-sm">
              Belum ada merch. Tambahkan yang pertama!
            </p>
          </div>
        )}

        {!loading && merch.length > 0 && (
          <div className="flex flex-col gap-3">
            {merch.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#161616",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                className="flex items-center gap-4 px-4 py-3 rounded-sm hover:bg-white/[0.02] transition-colors"
              >
                <div
                  style={{
                    background: "#1A1A1A",
                    width: 60,
                    height: 60,
                    flexShrink: 0,
                  }}
                  className="rounded-sm overflow-hidden flex items-center justify-center"
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <BagIcon size={20} className="text-white/20" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {item.title}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">{item.price}</p>
                  {item.sizes && item.sizes.length > 0 && (
                    <p className="text-white/30 text-xs mt-0.5">
                      {item.sizes.join(", ")}
                    </p>
                  )}
                </div>

                <span
                  style={
                    item.is_active
                      ? {
                          background: "rgba(34,197,94,0.15)",
                          color: "#22c55e",
                          border: "1px solid rgba(34,197,94,0.3)",
                        }
                      : {
                          background: "rgba(239,68,68,0.15)",
                          color: "#ef4444",
                          border: "1px solid rgba(239,68,68,0.3)",
                        }
                  }
                  className="px-2.5 py-0.5 rounded-sm text-xs font-semibold tracking-wide flex-shrink-0"
                >
                  {item.is_active ? "Active" : "Inactive"}
                </span>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(item)}
                    style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                    className="p-2 rounded-sm text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <EditIcon size={14} />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(item.id)}
                    style={{ border: "1px solid rgba(239,68,68,0.3)" }}
                    className="p-2 rounded-sm text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Hapus"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <MerchFormModal
          editingItem={editingItem}
          formTitle={formTitle}
          formPrice={formPrice}
          formSizes={formSizes}
          formActive={formActive}
          formImageFile={formImageFile}
          formImagePreview={formImagePreview}
          saving={saving}
          onClose={closeForm}
          onSave={handleSave}
          setFormTitle={setFormTitle}
          setFormPrice={setFormPrice}
          setFormSizes={setFormSizes}
          setFormActive={setFormActive}
          setFormImageFile={setFormImageFile}
          setFormImagePreview={setFormImagePreview}
        />
      )}

      {showDeleteConfirm && (
        <DeleteModal
          onCancel={() => setShowDeleteConfirm(null)}
          onConfirm={() => handleDelete(showDeleteConfirm)}
        />
      )}

      {toast && (
        <div
          style={{ background: "#D4E627", color: "#000" }}
          className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-sm font-semibold text-sm shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
