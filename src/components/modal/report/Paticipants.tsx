import { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import ParticipantSelect from '@/components/report/ParticipantSelect';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { StudentInfo } from '@/types';
import { NewReport, ReportDetail } from '@/types/report';
const participant = {
  name: '',
  studentId: '',
  department: '',
};
type Props = {
  data: StudentInfo[];
  setData:
    | Dispatch<SetStateAction<ReportDetail[]>>
    | Dispatch<SetStateAction<NewReport>>
    | undefined;
  closeModal: () => void;
};
export default function Participants({ data, setData, closeModal }: Props) {
  const [{ token }] = useCookies(['token']);

  const {
    data: { data: clubData },
  } = useMyClub(token);

  const [participants, setParticipants] = useState<Array<StudentInfo>>(
    data ?? [participant, participant, participant, participant, participant],
  );

  function handleSubmit() {
    setParticipants(participants);
    setData && setData((prev: any) => ({ ...prev, participants }));
    closeModal();
  }

  return (
    <div>
      <div className="grid grid-cols-3  rounded-xl text-gray-500">
        <label className="inline-block px-4 pb-2 font-semibold">이름</label>
      </div>

      {participants.map((participant, index) => (
        <div
          key={`report-participants-${index}`}
          className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 "
        >
          <ParticipantSelect
            name={participant.name}
            setData={setParticipants}
            list={clubData?.clubMembers}
            id={index}
          />
        </div>
      ))}

      <div className="flex items-center justify-center text-xs text-gray-400 md:pt-2 md:text-sm ">
        명단이 보여지지 않는다면
        <Link href="/member" className="pl-2 text-purple-500">
          동아리원 수정
        </Link>
        을 진행해주세요
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:mt-5 sm:py-4 sm:text-lg "
      >
        등록하기
      </button>
    </div>
  );
}
