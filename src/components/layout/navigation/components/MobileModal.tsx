import { FC } from 'react';
import { Icon } from '@components/ui/icon';

const MobileModal: FC = () => {
  return (
    <>
      <div className="">
        <Icon icon="hamburguer" className="w-18 h-12" />
        <a className="flex items-center justify-center gap-8 text-2xl font-bold">
          <img alt="Fios da Ria Logo" width={32} height={32} src="/logo.png" />
          Fios da Ria
        </a>
      </div>
    </>
  );
};

export default MobileModal;
