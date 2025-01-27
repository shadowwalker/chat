'use client';

import { MobileNavBar, MobileNavBarTitle } from '@lobehub/ui';
import { Tag } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useActiveSettingsKey } from '@/hooks/useActiveTabKey';
import { useQueryRoute } from '@/hooks/useQueryRoute';
import { useShowMobileWorkspace } from '@/hooks/useShowMobileWorkspace';
import { SettingsTabs } from '@/store/global/initialState';
import { useSessionStore } from '@/store/session';
import { useUserStore } from '@/store/user';
import { authSelectors } from '@/store/user/selectors';
import { mobileHeaderSticky } from '@/styles/mobileHeader';

const Header = memo(() => {
  const { t } = useTranslation('setting');

  const router = useQueryRoute();
  const showMobileWorkspace = useShowMobileWorkspace();
  const activeSettingsKey = useActiveSettingsKey();
  const isSessionActive = useSessionStore((s) => !!s.activeId);
  const enableAuth = useUserStore(authSelectors.enabledAuth);

  const handleBackClick = () => {
    if (isSessionActive && showMobileWorkspace) {
      router.push('/chat');
    } else {
      router.push(enableAuth ? '/me/settings' : '/me');
    }
  };
  return (
    <MobileNavBar
      center={
        <MobileNavBarTitle
          title={
            <Flexbox align={'center'} gap={8} horizontal>
              <span style={{ lineHeight: 1.2 }}> {t(`tab.${activeSettingsKey}`)}</span>
              {activeSettingsKey === SettingsTabs.Sync && (
                <Tag bordered={false} color={'warning'}>
                  {t('tab.experiment')}
                </Tag>
              )}
            </Flexbox>
          }
        />
      }
      onBackClick={handleBackClick}
      showBackButton
      style={mobileHeaderSticky}
    />
  );
});

export default Header;
