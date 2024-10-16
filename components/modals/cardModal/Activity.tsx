"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";

interface ActivityProps {
  items: AuditLog[];
}

export const Activity = ({ items }: ActivityProps) => {
  return (
    <div>
      <div>Activity</div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-8 w-10 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};
