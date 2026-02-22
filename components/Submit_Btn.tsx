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
      disabled={pending}
      className="bg-purple-900/50 backdrop-blur-md border border-purple-500/50 group hover:border-yellow-400 hover:bg-yellow-500/10 active:scale-95 transition-all duration-300 rounded-xl px-8 py-4 flex items-center justify-center w-full shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(234,179,8,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-b-2 border-yellow-400"></div>
          <span className="font-lexend font-bold text-yellow-400 tracking-wide">Unlocking...</span>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Lock className="w-5 h-5 text-purple-300 group-hover:text-yellow-400 transition-colors" />
          <span className="font-lexend font-bold text-purple-100 group-hover:text-yellow-400 tracking-wide text-lg transition-colors">
            Unlock Wallet
          </span>
        </div>
      )}
    </button>
  );
};
export default Submit_Btn;
