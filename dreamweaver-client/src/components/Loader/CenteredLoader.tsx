import { Loader2 } from "lucide-react";

export const CenteredLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
    </div>
  );
};