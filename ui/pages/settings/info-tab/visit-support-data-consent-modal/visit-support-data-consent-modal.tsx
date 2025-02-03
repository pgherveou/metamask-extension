import React, { useCallback, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import { selectSessionData } from '../../../../selectors/identity/authentication';
import { getMetaMetricsId } from '../../../../selectors/selectors';
import { openWindow } from '../../../../helpers/utils/window';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Checkbox,
  Box,
  ModalFooter,
  ButtonPrimary,
  ButtonPrimarySize,
  ModalBody,
  Text,
  ButtonSecondarySize,
} from '../../../../components/component-library';
import {
  Display,
  TextVariant,
  AlignItems,
  BlockSize,
} from '../../../../helpers/constants/design-system';
import {
  MetaMetricsContextProp,
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../../shared/constants/metametrics';
import { MetaMetricsContext } from '../../../../contexts/metametrics';
import { SUPPORT_LINK } from '../../../../../shared/lib/ui-utils';
import { ButtonSecondary } from '../../../../components/component-library/button-secondary/button-secondary';

type VisitSupportDataConsentModalProps = {
  version: string;
  onClose: () => void;
  isOpen: boolean;
};

const VisitSupportDataConsentModal: React.FC<
  VisitSupportDataConsentModalProps
> = ({ isOpen, onClose, version }) => {
  const t = useI18nContext();
  const trackEvent = useContext(MetaMetricsContext);
  const {
    profile: { profileId },
  } = useSelector(selectSessionData);
  const metaMetricsId = useSelector(getMetaMetricsId);

  const [isPreferenceChecked, setIsPreferenceChecked] = useState(false);

  const togglePreferenceCheck = useCallback(() => {
    setIsPreferenceChecked(
      (isPreferenceCheckedValue) => !isPreferenceCheckedValue,
    );
  }, []);

  const handleClickContactSupportButton = () => {
    trackEvent(
      {
        category: MetaMetricsEventCategory.Settings,
        event: MetaMetricsEventName.SupportLinkClicked,
        properties: {
          url: SUPPORT_LINK,
        },
      },
      {
        contextPropsIntoEventProperties: [MetaMetricsContextProp.PageTitle],
      },
    );
    const supportLinkWithUserId = `${SUPPORT_LINK}?metamask_version=${version}&metamask_profile_id=${profileId}&metamask_metametrics_id=${metaMetricsId}`;
    openWindow(supportLinkWithUserId);
  };

  const handleClickNoShare = () => {
    onClose();
    openWindow(SUPPORT_LINK);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      data-testid="visit-support-data-consent-modal"
      className="visit-support-data-consent-modal"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('visitSupportDataConsentModalTitle')}</ModalHeader>
        <ModalBody
          paddingLeft={4}
          paddingRight={4}
          className="visit-support-data-consent-modal__body"
        >
          <Text variant={TextVariant.bodyMd}>
            {t('visitSupportDataConsentModalDescription')}
          </Text>
          <Checkbox
            id="save-my-preference-checkbox"
            className="visit-support-data-consent-modal__body__preference-checkbox"
            data-testid="save-my-preference-checkbox"
            label={t('visitSupportDataConsentModalCheckboxDescription')}
            isChecked={isPreferenceChecked}
            onChange={togglePreferenceCheck}
            alignItems={AlignItems.flexStart}
          />
        </ModalBody>

        <ModalFooter>
          <Box display={Display.Flex} gap={4}>
            <ButtonSecondary
              size={ButtonSecondarySize.Lg}
              width={BlockSize.Half}
              onClick={handleClickNoShare}
            >
              {t('visitSupportDataConsentModalReject')}
            </ButtonSecondary>
            <ButtonPrimary
              size={ButtonPrimarySize.Lg}
              width={BlockSize.Half}
              onClick={handleClickContactSupportButton}
            >
              {t('visitSupportDataConsentModalAccept')}
            </ButtonPrimary>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VisitSupportDataConsentModal;
