import MotionCard from "./MotionCard.jsx";

export default function SubmissionCard({ submission }) {
  return (
    <MotionCard>
      <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
        <span className="font-semibold text-brand-600">{submission.name || "Anonymous"}</span>
        <time dateTime={submission.createdAt}>{new Date(submission.createdAt).toLocaleDateString()}</time>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{submission.title}</h3>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700">{submission.body}</p>
    </MotionCard>
  );
}
