import React, { useState } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import { CheckOutlined, MailOutlined } from '@ant-design/icons';
import qs from 'query-string';
import MenuItem from 'antd/lib/menu/MenuItem';
import { useTranslation } from 'react-i18next';
import { ANTD_GRAY } from '../../../entity/shared/constants';

interface EmailMenuItemProps {
    urn: string;
    name: string;
    type: string;
}

const StyledMenuItem = styled.div`
    && {
        color: ${ANTD_GRAY[8]};
    }
`;

const TextSpan = styled.span`
    padding-left: 12px;
`;

export default function EmailMenuItem({ urn, name, type }: EmailMenuItemProps) {
    /**
     * Whether button has been clicked
     */
    const [isClicked, setIsClicked] = useState(false);
    const linkText = window.location.href;
    const { t } = useTranslation();
    const typeTranslated = t(`common.${type.toLowerCase()}`);

    const link = qs.stringifyUrl({
        url: 'mailto:',
        query: {
            subject: `${name} | ${type}`,
            body: `Check out this ${type} on DataHub: ${linkText}. Urn: ${urn}`,
        },
    });

    return (
        <StyledMenuItem
            onClick={() => {
                setIsClicked(true);
            }}
        >
            <Tooltip title={t('share.shareThisViaMail', { type: typeTranslated })}>
                {isClicked ? <CheckOutlined /> : <MailOutlined />}
                <TextSpan>
                    <a href={link} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                        <b>{t('common.email')}</b>
                    </a>
                </TextSpan>
            </Tooltip>
        </StyledMenuItem>
    );
}
