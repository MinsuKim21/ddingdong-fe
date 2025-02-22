import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import Image from 'next/image';
import Camera from '@/assets/camera.svg';
import ImageInput from '@/assets/imageInput.svg';
import { deptCaptionColor } from '@/constants/color';
import { ClubDetail } from '@/types/club';

type AdminClubHeadingProps = {
  clubName: string;
  category: string;
  tag: string;
  profileImage: File | null;
  isEditing: boolean;
  profileImageUrls: string[];
  setValue: Dispatch<SetStateAction<ClubDetail>>;
  setProfileImage: Dispatch<SetStateAction<File | null>>;
};

export default function AdminClubHeading({
  clubName,
  category,
  tag,
  profileImage,
  isEditing,
  profileImageUrls,
  setValue,
  setProfileImage,
}: AdminClubHeadingProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setProfileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
    }
  }
  useEffect(() => {
    if (profileImage) {
      const imageUrl = window.URL.createObjectURL(profileImage);
      setPreviewImageUrl(imageUrl);
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    } else {
      setPreviewImageUrl('');
    }
  }, [profileImage]);

  const parsedImg =
    profileImageUrls &&
    profileImageUrls[0]?.slice(0, 8) + profileImageUrls[0]?.slice(9);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  function handleImageReset() {
    setPreviewImageUrl('');
    setValue((prev) => ({
      ...prev,
      profileImageUrls: [],
    }));
  }
  return (
    <>
      <div className=" relative flex flex-row items-center">
        {parsedImg || previewImageUrl ? (
          <>
            <Image
              src={parsedImg ? parsedImg : previewImageUrl}
              width={100}
              height={100}
              alt="image"
              className="m-auto h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
            />
            {isEditing && (
              <div className="absolute start-16 top-0.5 md:start-18">
                <Image
                  src={Camera}
                  width={20}
                  height={20}
                  className="cursor-pointer opacity-40"
                  onClick={handleImageReset}
                  alt="재사용"
                />
              </div>
            )}
          </>
        ) : (
          <label
            htmlFor="uploadFiles"
            className=" text-md flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white p-3 font-medium text-gray-300 outline-none md:h-24 md:w-24"
          >
            <div className="flex flex-col items-center px-4 py-2.5  outline-none md:px-5">
              <Image src={ImageInput} width={35} height={35} alt="사진 선택" />
            </div>
            <input
              id="uploadFiles"
              name="uploadFiles"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e)}
              disabled={!isEditing}
            />
          </label>
        )}
        <div className=" ml-4 text-base">
          <div className="rounded-lg text-xl font-semibold md:text-3xl">
            {clubName}
          </div>
          <div className="flex items-center md:mt-0.5">
            <div
              className={`rounded-lg text-sm font-semibold md:text-lg ${deptCaptionColor[category]}`}
            >
              {category}
            </div>
            <div className="px-1.5 text-sm font-medium text-gray-300 md:text-lg">
              |
            </div>
            <div className="rounded-lg text-sm font-semibold text-gray-500 md:text-lg">
              <input
                name="tag"
                type="text"
                spellCheck={false}
                className={`rounded-xl ${
                  isEditing
                    ? `border border-gray-100 bg-gray-50 px-4 py-2.5 opacity-100 outline-none md:px-5 `
                    : `bg-white`
                } w-[50%]  `}
                value={tag}
                onChange={(e) => handleChange(e)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
