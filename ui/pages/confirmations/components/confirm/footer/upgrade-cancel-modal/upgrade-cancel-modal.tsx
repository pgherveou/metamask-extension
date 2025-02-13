import React, { useCallback } from 'react';
import {
  Box,
  Button,
  ButtonVariant,
  Icon,
  IconName,
  IconSize,
  Modal,
  ModalBody,
  ModalContent,
  ModalContentSize,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '../../../../../../components/component-library';
import {
  AlignItems,
  Display,
  FlexDirection,
} from '../../../../../../helpers/constants/design-system';
import { useI18nContext } from '../../../../../../hooks/useI18nContext';
import { useDispatch } from 'react-redux';
import { providerErrors, serializeError } from '@metamask/rpc-errors';
import { rejectPendingApproval } from '../../../../../../store/actions';
import { useConfirmContext } from '../../../../context/confirm';

export function UpgradeCancelModal({
  isOpen,
  onClose,
  onReject,
}: {
  isOpen: boolean;
  onClose: () => void;
  onReject: () => void;
}) {
  const t = useI18nContext();
  const dispatch = useDispatch();
  const { currentConfirmation } = useConfirmContext();
  const { id: confirmationId } = currentConfirmation;

  const handleRejectUpgrade = useCallback(() => {
    const error = providerErrors.unsupportedMethod(
      'User rejected account upgrade',
    );

    const serializedError = serializeError(error);

    dispatch(rejectPendingApproval(confirmationId, serializedError));
  }, [dispatch, confirmationId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isClosedOnOutsideClick={false}
      isClosedOnEscapeKey={false}
    >
      <ModalOverlay />
      <ModalContent size={ModalContentSize.Md}>
        <ModalHeader onClose={onClose}>Cancel transaction</ModalHeader>
        <ModalBody>
          <Text>
            If you wish not to update your account, you’ll have to generate this
            request again on the dapp. Learn more
          </Text>
        </ModalBody>
        <ModalFooter>
          <Box
            display={Display.Flex}
            flexDirection={FlexDirection.Column}
            alignItems={AlignItems.stretch}
            gap={4}
          >
            <Button
              onClick={handleRejectUpgrade}
              variant={ButtonVariant.Secondary}
            >
              Cancel upgrading the account
            </Button>
            <Button onClick={onReject}>Cancel this request</Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
