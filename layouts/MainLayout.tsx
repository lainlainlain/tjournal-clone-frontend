import React from 'react';
import clsx from 'clsx';
import { LeftMenu } from '../components/LeftMenu';
import { SideComments } from '../components/SideComments';
import { useAppSelector } from '@/redux/hooks';
import { selectLeftMenuActive } from '@/redux/slices/left-menu';

interface MainLayoutProps {
  contentFullWidth?: boolean;
  className?: string;
  children?: any;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  contentFullWidth,
  className,
}) => {
  const hideMenu = useAppSelector(selectLeftMenuActive);
  return (
    <div className={clsx('wrapper', className)}>
      {hideMenu && (
        <div className="leftSide">
          <LeftMenu />
        </div>
      )}
      <div className={clsx('content', { 'content--full': contentFullWidth })}>{children}</div>

      <div className="rightSide">
        <SideComments />
      </div>
    </div>
  );
};
