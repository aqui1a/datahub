import React from 'react';
import { Button, Divider, Modal, Typography } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useEntityRegistry } from '../../useEntityRegistry';
import { CorpUser, DataHubPolicy, DataHubRole } from '../../../types.generated';
import AvatarsGroup from '../AvatarsGroup';

type Props = {
    role: DataHubRole;
    open: boolean;
    onClose: () => void;
};

const PolicyContainer = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    > div {
        margin-bottom: 32px;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
`;

const ThinDivider = styled(Divider)`
    margin-top: 8px;
    margin-bottom: 8px;
`;

/**
 * Component used for displaying the details about an existing Role.
 */
export default function RoleDetailsModal({ role, visible, onClose }: Props) {
    const { t } = useTranslation();
    const entityRegistry = useEntityRegistry();

    const actionButtons = (
        <ButtonsContainer>
            <Button onClick={onClose}>{t('common.close')}</Button>
        </ButtonsContainer>
    );

    const castedRole = role as any;

    const users = castedRole?.users?.relationships.map((relationship) => relationship.entity as CorpUser);
    const policies = castedRole?.policies?.relationships.map((relationship) => relationship.entity as DataHubPolicy);

    return (
        <Modal title={role?.name} open={open} onCancel={onClose} closable width={800} footer={actionButtons}>
            <PolicyContainer>
                <div>
                    <Typography.Title level={5}>{t('common.description')}</Typography.Title>
                    <ThinDivider />
                    <Typography.Text type="secondary">{role?.description}</Typography.Text>
                </div>
                <div>
                    <Typography.Title level={5}>{t('common.users')}</Typography.Title>
                    <ThinDivider />
                    <AvatarsGroup users={users} entityRegistry={entityRegistry} maxCount={50} size={28} />
                </div>
                <div>
                    <Typography.Title level={5}>{t('permissions.associatedPolicies')}</Typography.Title>
                    <ThinDivider />
                    <AvatarsGroup policies={policies} entityRegistry={entityRegistry} maxCount={50} size={28} />
                </div>
            </PolicyContainer>
        </Modal>
    );
}
