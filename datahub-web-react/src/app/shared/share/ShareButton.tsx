import React from 'react';
import styled from 'styled-components';
import { Button, Dropdown } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { EntityType } from '../../../types.generated';
import useShareButtonMenu from './useShareButtonMenu';

interface ShareButtonProps {
    urn: string;
    entityType: EntityType;
    subType?: string | null;
    name?: string | null;
}

const StyledButton = styled(Button)`
    padding-left: 10px;
    padding-right: 10px;
`;

const StyledShareIcon = styled(ShareAltOutlined)`
    font-size: 14px;
`;

export default function ShareButton({ urn, entityType, subType, name }: ShareButtonProps) {
    const { t } = useTranslation();
    return (
        <Dropdown trigger={['click']} menu={items}>
            <StyledButton type="primary">
                <StyledShareIcon />
                {t('common.share')}
            </StyledButton>
        </Dropdown>
    );
}
