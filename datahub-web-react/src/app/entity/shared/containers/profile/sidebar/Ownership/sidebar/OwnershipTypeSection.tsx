import React from 'react';
import styled from 'styled-components/macro';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Owner, OwnershipTypeEntity } from '../../../../../../../../types.generated';
import { ExpandedOwner } from '../../../../../components/styled/ExpandedOwner/ExpandedOwner';
import { useMutationUrn, useRefetch } from '../../../../../EntityContext';
import { getOwnershipTypeName } from '../ownershipUtils';
import { translateDisplayNames } from '../../../../../../../../utils/translation/translation';

const OwnershipTypeContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`;

const OwnershipTypeNameText = styled(Typography.Text)`
    font-family: 'Manrope', sans-serif;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #434343;
`;

const OwnersContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 8px;
`;

interface Props {
    ownershipType: OwnershipTypeEntity;
    owners: Owner[];
    readOnly?: boolean;
}

export const OwnershipTypeSection = ({ ownershipType, owners, readOnly }: Props) => {
    const { t } = useTranslation();
    const mutationUrn = useMutationUrn();
    const refetch = useRefetch();
    const ownershipTypeName = getOwnershipTypeName(ownershipType);
    return (
        <OwnershipTypeContainer>
            <OwnershipTypeNameText>
                {translateDisplayNames(t, `ownership${ownershipTypeName}name`)}
            </OwnershipTypeNameText>
            <OwnersContainer>
                {owners.map((owner) => (
                    <ExpandedOwner
                        key={owner.owner.urn}
                        entityUrn={owner.associatedUrn || mutationUrn}
                        owner={owner}
                        refetch={refetch}
                        readOnly={readOnly}
                    />
                ))}
            </OwnersContainer>
        </OwnershipTypeContainer>
    );
};
