"use client";
export default function RelativeTime({ datetime, children, ...props }: { datetime: string; children?: React.ReactNode } & Record<string, any>) {
  {/* @ts-ignore */}
  return <relative-time datetime={datetime} precision="auto" tense="auto" {...props}>{children}</relative-time>;
}