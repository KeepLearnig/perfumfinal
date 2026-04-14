import { useSite } from '@/context/SiteContext';

interface EditableLogoProps {
  dark?: boolean;
  size?: 'sm' | 'md';
}

export function EditableLogo({ dark = false, size = 'md' }: EditableLogoProps) {
  const { logo } = useSite();
  const isCircle = logo.shape === 'circle';
  const box = size === 'sm' ? 'w-12 h-12' : 'w-16 h-16 md:w-20 md:h-20';
  const topSize = size === 'sm' ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm';
  const bottomSize = size === 'sm' ? 'text-[7px] md:text-[8px]' : 'text-[8px] md:text-[10px]';

  return (
    <div
      className={`${box} ${dark ? 'bg-black text-white' : 'bg-white text-black'} ${isCircle ? 'rounded-full' : 'rounded-2xl'} flex items-center justify-center`}
      style={{ fontFamily: logo.fontFamily }}
    >
      <div className="text-center px-1 leading-tight">
        <div className={`${topSize} font-bold uppercase tracking-wide`}>{logo.textTop}</div>
        <div className={`${bottomSize} uppercase tracking-wide`}>{logo.textBottom}</div>
      </div>
    </div>
  );
}
