import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityType } from '../../../../../../../types.generated';
import EditTagTermsModal, { OperationType } from '../../../../../../shared/tags/AddTagsTermsModal';
import ActionDropdown from './ActionDropdown';

type Props = {
    urns: Array<string>;
    disabled: boolean;
    refetch?: () => void;
};

// eslint-disable-next-line
export default function GlossaryTermsDropdown({ urns, disabled = false, refetch }: Props) {
    const { t } = useTranslation();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [operationType, setOperationType] = useState(OperationType.ADD);

    return (
        <>
            <ActionDropdown
                name={t('common.glossaryTerms')}
                actions={[
                    {
                        title: t('crud.addGlossaryTerms'),
                        onClick: () => {
                            setOperationType(OperationType.ADD);
                            setIsEditModalVisible(true);
                        },
                    },
                    {
                        title: t('crud.removeGlossaryTerms'),
                        onClick: () => {
                            setOperationType(OperationType.REMOVE);
                            setIsEditModalVisible(true);
                        },
                    },
                ]}
                disabled={disabled}
            />
            {isEditModalVisible && (
                <EditTagTermsModal
                    type={EntityType.GlossaryTerm}
                    open
                    onCloseModal={() => {
                        setIsEditModalVisible(false);
                        refetch?.();
                    }}
                    resources={urns.map((urn) => ({
                        resourceUrn: urn,
                    }))}
                    operationType={operationType}
                />
            )}
        </>
    );
}
