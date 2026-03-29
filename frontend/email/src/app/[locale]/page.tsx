"use client";

import { EmailSection } from "@/components/EmailSection";
import { FeatureSection } from "@/components/FeatureSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col gap-7xl overflow-x-hidden">
        <EmailSection />
        <div>
          <FeatureSection />
        </div>
      </div>
    </QueryClientProvider>
  );
}
