import React from "react";
import { ThemeConfig } from "@/types/theme";

interface ThemeContainerProps {
  theme: ThemeConfig;
  children: React.ReactNode;
  className?: string;
}

export function ThemeContainer({ theme, children, className = "" }: ThemeContainerProps) {
  const cssVars = {
    "--theme-primary": theme.colors.primary,
    "--theme-accent": theme.colors.accent,
    "--theme-bg-base": theme.colors.bgBase,
    "--theme-bg-surface": theme.colors.bgSurface,
    "--theme-bg-card": theme.colors.bgCard,
    "--theme-border": theme.colors.border,
    "--theme-text-primary": theme.colors.textPrimary,
    "--theme-text-secondary": theme.colors.textSecondary,
    "--theme-text-muted": theme.colors.textMuted,
    "--theme-glow": theme.colors.glow,
  } as React.CSSProperties;

  return (
    <div
      className={`theme-root relative w-full ${className}`}
      style={cssVars}
      data-theme-id={theme.id}
      data-theme-variant={theme.variant}
    >
      {children}
    </div>
  );
}
