import { Loader } from 'lucide-react';

function pendingComponent({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 pt-10 text-muted-foreground">
      <Loader className="size-10 animate-spin" />
      <p className="font-semibold">{message}</p>
    </div>
  );
}

export default pendingComponent;
