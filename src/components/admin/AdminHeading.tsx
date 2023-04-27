type AdminHeadingProps = {
  clubName: string;
  clubScore?: number;
};

export default function AdminHeading({
  clubName,
  clubScore = 0,
}: AdminHeadingProps) {
  const isClub = true;

  return (
    <div className="flex w-full items-end justify-between">
      <div className="mt-7 text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
        <div className="md:mr-1.5">안녕하세요,</div>
        <span className="text-blue-500">{clubName}</span>
        <span className="ml-1 md:ml-1.5">님</span>
      </div>
      {isClub && (
        <div className="rounded-xl bg-sky-100 px-2.5 py-1.5 text-lg font-bold text-blue-500 md:px-3 md:py-2 md:text-xl">
          {clubScore}점
        </div>
      )}
    </div>
  );
}
