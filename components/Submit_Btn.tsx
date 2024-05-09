import React from 'react';
import { useFormStatus } from 'react-dom';
import { Lock } from 'lucide-react';

interface Submit_BtnProps {
  onClick: () => void;
}

const Submit_Btn: React.FC<Submit_BtnProps> = ({ onClick }) => {
  const { pending } = useFormStatus();
  return (
    <button
      onClick={onClick}
      className="bg-white border-2 border-purple-600 group hover:bg-purple-600 hover:scale-110 active:scale-105 transition-all duration-200 rounded-lg p-2 items-center  w-[fit-content]"
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-purple-600"></div>
      ) : (
        <div className="flex items-center gap-[25px] ">
          <Lock size={25} color="purple" />
          <span className="font-Azeret font-semibold text-[12px] text-purple-600 group-hover:text-white sm:text-[16px]">
            Unlock with passphrase
          </span>
        </div>
      )}
    </button>
  );
};
export default Submit_Btn;
