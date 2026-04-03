"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";

interface ContactOption {
  id: string;
  name: string;
  email: string;
}

interface SegmentOption {
  id: string;
  name: string;
  contactCount: number;
}

interface IssueAssessmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: IssueAssessmentPayload) => void;
  contacts: ContactOption[];
  segments: SegmentOption[];
  assessmentName: string;
}

export interface IssueAssessmentPayload {
  targetType: "individual" | "segment";
  contactIds: string[];
  segmentId: string | null;
  deadlineDate: string;
  reminderIntervals: number[];
  customMessage: string;
}

const REMINDER_OPTIONS = [
  { value: 7, label: "7 days before deadline" },
  { value: 3, label: "3 days before deadline" },
  { value: 1, label: "1 day before deadline" },
] as const;

export function IssueAssessmentDialog({
  isOpen,
  onClose,
  onSubmit,
  contacts,
  segments,
  assessmentName,
}: IssueAssessmentDialogProps): React.JSX.Element | null {
  const [targetType, setTargetType] = useState<"individual" | "segment">("individual");
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>("");
  const [deadlineDate, setDeadlineDate] = useState<string>("");
  const [reminderIntervals, setReminderIntervals] = useState<number[]>([7, 3, 1]);
  const [customMessage, setCustomMessage] = useState<string>("");

  if (!isOpen) return null;

  const handleReminderToggle = (value: number) => {
    setReminderIntervals((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value].sort((a, b) => b - a)
    );
  };

  const handleContactToggle = (contactId: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      targetType,
      contactIds: targetType === "individual" ? selectedContactIds : [],
      segmentId: targetType === "segment" ? selectedSegmentId : null,
      deadlineDate,
      reminderIntervals,
      customMessage,
    });
  };

  const isValid =
    deadlineDate &&
    ((targetType === "individual" && selectedContactIds.length > 0) ||
      (targetType === "segment" && selectedSegmentId));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Issue Assessment</h2>
          <p className="mt-0.5 text-sm text-slate-500">{assessmentName}</p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          {/* Target Type */}
          <fieldset className="mb-5">
            <legend className="mb-2 text-sm font-medium text-slate-700">Send to</legend>
            <div className="flex gap-3">
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors",
                  targetType === "individual"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                )}>
                <input
                  type="radio"
                  name="targetType"
                  value="individual"
                  checked={targetType === "individual"}
                  onChange={() => setTargetType("individual")}
                  className="sr-only"
                />
                Individual Contacts
              </label>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors",
                  targetType === "segment"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                )}>
                <input
                  type="radio"
                  name="targetType"
                  value="segment"
                  checked={targetType === "segment"}
                  onChange={() => setTargetType("segment")}
                  className="sr-only"
                />
                Segment
              </label>
            </div>
          </fieldset>

          {/* Contact / Segment Selection */}
          {targetType === "individual" ? (
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">Select Contacts</label>
              <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-200">
                {contacts.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-slate-400">No contacts available</p>
                ) : (
                  contacts.map((contact) => (
                    <label
                      key={contact.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 border-b border-slate-50 px-4 py-2.5 text-sm transition-colors last:border-0 hover:bg-slate-50",
                        selectedContactIds.includes(contact.id) && "bg-slate-50"
                      )}>
                      <input
                        type="checkbox"
                        checked={selectedContactIds.includes(contact.id)}
                        onChange={() => handleContactToggle(contact.id)}
                        className="h-4 w-4 rounded border-slate-300 text-slate-900"
                      />
                      <div>
                        <p className="font-medium text-slate-900">{contact.name}</p>
                        <p className="text-xs text-slate-500">{contact.email}</p>
                      </div>
                    </label>
                  ))
                )}
              </div>
              {selectedContactIds.length > 0 && (
                <p className="mt-1.5 text-xs text-slate-500">
                  {selectedContactIds.length} contact{selectedContactIds.length !== 1 ? "s" : ""} selected
                </p>
              )}
            </div>
          ) : (
            <div className="mb-5">
              <label htmlFor="segment-select" className="mb-2 block text-sm font-medium text-slate-700">
                Select Segment
              </label>
              <select
                id="segment-select"
                value={selectedSegmentId}
                onChange={(e) => setSelectedSegmentId(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400">
                <option value="">Choose a segment...</option>
                {segments.map((segment) => (
                  <option key={segment.id} value={segment.id}>
                    {segment.name} ({segment.contactCount} contacts)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Deadline */}
          <div className="mb-5">
            <label htmlFor="deadline-date" className="mb-2 block text-sm font-medium text-slate-700">
              Deadline
            </label>
            <input
              id="deadline-date"
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
          </div>

          {/* Reminder Intervals */}
          <fieldset className="mb-5">
            <legend className="mb-2 text-sm font-medium text-slate-700">Reminders</legend>
            <div className="flex flex-col gap-2">
              {REMINDER_OPTIONS.map((option) => (
                <label key={option.value} className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={reminderIntervals.includes(option.value)}
                    onChange={() => handleReminderToggle(option.value)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900"
                  />
                  <span className="text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Custom Message */}
          <div className="mb-5">
            <label htmlFor="custom-message" className="mb-2 block text-sm font-medium text-slate-700">
              Custom Message <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="custom-message"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Add a personal note to the assessment invitation..."
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors",
                isValid
                  ? "bg-slate-900 hover:bg-slate-800"
                  : "cursor-not-allowed bg-slate-300"
              )}>
              Send Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
