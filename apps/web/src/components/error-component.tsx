function ErrorComponent({ error }: { error: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
      <p className="font-semibold">{error}</p>
    </div>
  );
}

export default ErrorComponent;
