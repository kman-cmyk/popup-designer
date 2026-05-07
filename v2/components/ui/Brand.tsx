export function Brand({ size = 15 }: { size?: number }) {
  return (
    <div className="brand" style={{ fontSize: size }}>
      <span className="brand-mark" />
      MAKE YOUR PLACE
    </div>
  );
}
