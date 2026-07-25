import Loader from "@/components/common/Loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50">
      <Loader text="Loading CORE..." />
    </div>
  );
}