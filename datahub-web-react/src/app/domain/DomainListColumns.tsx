import React from 'react';
import { Tag, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Maybe, Ownership } from '../../types.generated';
import { useEntityRegistry } from '../useEntityRegistry';
import AvatarsGroup from '../shared/avatar/AvatarsGroup';
import DomainItemMenu from './DomainItemMenu';

interface DomainEntry {
    name: string;
    entities: string;
    urn: string;
    ownership?: Maybe<Ownership>;
    url: string;
}

const AvatarGroupWrapper = styled.div`
    margin-right: 10px;
    display: inline-block;
`;

const DomainNameContainer = styled.div`
    margin-left: 16px;
    margin-right: 16px;
    display: inline;
`;

export function DomainListMenuColumn(handleDelete: (urn: string) => void) {
    return (record: DomainEntry) => (
        <DomainItemMenu name={record.name} urn={record.urn} onDelete={() => handleDelete(record.urn)} />
    );
}

export function DomainNameColumn(logoIcon: JSX.Element) {
    const { t } = useTranslation();

    return (record: DomainEntry) => (
        <span data-testid={record.urn}>
            <Link to={record.url}>
                {logoIcon}
                <DomainNameContainer>
                    <Typography.Text>{record.name}</Typography.Text>
                </DomainNameContainer>
                <Tooltip title={t('domain.nbrOfEntityInDomain', { value: record.entities })}>
                    <Tag>
                        {record.entities} {t('common.entities')}{' '}
                    </Tag>
                </Tooltip>
            </Link>
        </span>
    );
}

export function DomainOwnersColumn(ownership: Maybe<Ownership>) {
    const entityRegistry = useEntityRegistry();

    if (!ownership) {
        return null;
    }

    const { owners } = ownership;
    if (!owners || owners.length === 0) {
        return null;
    }
    return (
        <AvatarGroupWrapper>
            <AvatarsGroup size={24} owners={owners} entityRegistry={entityRegistry} maxCount={4} />
        </AvatarGroupWrapper>
    );
}
