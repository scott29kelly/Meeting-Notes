import { formatMeetingDate } from '../utils/date';

interface Props {
  meetingDate: Date;
}

export function Header({ meetingDate }: Props) {
  return (
    <header className="px-5 lg:px-10 pt-8 pb-10 lg:pt-12 lg:pb-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-paper-rule pb-8">
        <div>
          <p className="text-mono-label">Bucks Church &middot; Operations</p>
          <h1 className="mt-2 font-serif text-[2.2rem] leading-[1.1] tracking-[-0.015em] lg:text-[2.6rem]">
            Staff Meeting Notes
          </h1>
        </div>
        <div className="flex flex-col gap-1 lg:items-end">
          <span className="text-mono-label">For the meeting on</span>
          <span className="font-serif text-xl text-ink">
            {formatMeetingDate(meetingDate)}
          </span>
        </div>
      </div>
    </header>
  );
}
