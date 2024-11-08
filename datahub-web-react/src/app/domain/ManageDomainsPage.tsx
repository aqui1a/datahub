import { Typography } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DomainsList } from './DomainsList';
import { DomainsContext } from './DomainsContext';
import { GenericEntityProperties } from '../entity/shared/types';

const PageContainer = styled.div`
    padding-top: 20px;
`;

const PageHeaderContainer = styled.div`
    && {
        padding-left: 24px;
    }
`;

const PageTitle = styled(Typography.Title)`
    && {
        margin-bottom: 12px;
    }
`;

const ListContainer = styled.div``;

export const ManageDomainsPage = () => {
    const [entityData, setEntityData] = useState<GenericEntityProperties | null>(null);
    const [parentDomainsToUpdate, setParentDomainsToUpdate] = useState<string[]>([]);
    const { t } = useTranslation();

    return (
        <DomainsContext.Provider value={{ entityData, setEntityData, parentDomainsToUpdate, setParentDomainsToUpdate }}>
            <PageContainer>
                <PageHeaderContainer>
                    <PageTitle level={3}>{t('common.domains')}</PageTitle>
                    <Typography.Paragraph type="secondary">
                        {t('domain.domainManagementDescription')}
                    </Typography.Paragraph>
                </PageHeaderContainer>
                <ListContainer>
                    <DomainsList />
                </ListContainer>
            </PageContainer>
        </DomainsContext.Provider>
    );
};
