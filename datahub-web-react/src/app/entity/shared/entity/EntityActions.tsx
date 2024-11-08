import React, { useState } from 'react';
import { Button, message } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { SearchSelectModal } from '../components/styled/search/SearchSelectModal';
import { useEntityRegistry } from '../../../useEntityRegistry';
import { EntityCapabilityType } from '../../Entity';
import { useBatchAddTermsMutation, useBatchSetDomainMutation } from '../../../../graphql/mutations.generated';
import { handleBatchError } from '../utils';
import { useBatchSetDataProductMutation } from '../../../../graphql/dataProduct.generated';
import { useEntityContext } from '../EntityContext';

export enum EntityActionItem {
    /**
     * Batch add a Glossary Term to a set of assets
     */
    BATCH_ADD_GLOSSARY_TERM,
    /**
     * Batch add a Domain to a set of assets
     */
    BATCH_ADD_DOMAIN,
    /**
     * Batch add a Data Product to a set of assets
     */
    BATCH_ADD_DATA_PRODUCT,
}

interface Props {
    urn: string;
    actionItems: Set<EntityActionItem>;
    refetchForEntity?: () => void;
}

function EntityActions(props: Props) {
    const { t } = useTranslation();
    // eslint ignore react/no-unused-prop-types
    const entityRegistry = useEntityRegistry();
    const { urn, actionItems, refetchForEntity } = props;
    const { setShouldRefetchEmbeddedListSearch } = useEntityContext();
    const [isBatchAddGlossaryTermModalVisible, setIsBatchAddGlossaryTermModalVisible] = useState(false);
    const [isBatchSetDomainModalVisible, setIsBatchSetDomainModalVisible] = useState(false);
    const [isBatchSetDataProductModalVisible, setIsBatchSetDataProductModalVisible] = useState(false);
    const [batchAddTermsMutation] = useBatchAddTermsMutation();
    const [batchSetDomainMutation] = useBatchSetDomainMutation();
    const [batchSetDataProductMutation] = useBatchSetDataProductMutation();

    // eslint-disable-next-line
    const batchAddGlossaryTerms = (entityUrns: Array<string>) => {
        batchAddTermsMutation({
            variables: {
                input: {
                    termUrns: [urn],
                    resources: entityUrns.map((entityUrn) => ({
                        resourceUrn: entityUrn,
                    })),
                },
            },
        })
            .then(({ errors }) => {
                if (!errors) {
                    setIsBatchAddGlossaryTermModalVisible(false);
                    message.loading({ content: t('crud.updating'), duration: 3 });
                    setTimeout(() => {
                        message.success({
                            content: t('crud.success.addedGlossaryTermEntities'),
                            duration: 2,
                        });
                        refetchForEntity?.();
                        setShouldRefetchEmbeddedListSearch?.(true);
                    }, 3000);
                }
            })
            .catch((e) => {
                message.destroy();
                message.error(
                    handleBatchError(entityUrns, e, {
                        content: `${t('crud.error.failedToAddGlossary')} \n ${e.message || ''}`,
                        duration: 3,
                    }),
                );
            });
    };

    // eslint-disable-next-line
    const batchSetDomain = (entityUrns: Array<string>) => {
        batchSetDomainMutation({
            variables: {
                input: {
                    domainUrn: urn,
                    resources: entityUrns.map((entityUrn) => ({
                        resourceUrn: entityUrn,
                    })),
                },
            },
        })
            .then(({ errors }) => {
                if (!errors) {
                    setIsBatchSetDomainModalVisible(false);
                    message.loading({ content: t('crud.updating'), duration: 3 });
                    setTimeout(() => {
                        message.success({
                            content: t('crud.success.addedAssetsToDomain'),
                            duration: 3,
                        });
                        refetchForEntity?.();
                        setShouldRefetchEmbeddedListSearch?.(true);
                    }, 3000);
                }
            })
            .catch((e) => {
                message.destroy();
                message.error(
                    handleBatchError(entityUrns, e, {
                        content: t('crud.error.failedToAddAssetsDomain'),
                        duration: 3,
                    }),
                );
            });
    };

    // eslint-disable-next-line
    const batchSetDataProduct = (entityUrns: Array<string>) => {
        batchSetDataProductMutation({
            variables: {
                input: {
                    dataProductUrn: urn,
                    resourceUrns: entityUrns,
                },
            },
        })
            .then(({ errors }) => {
                if (!errors) {
                    setIsBatchSetDataProductModalVisible(false);
                    message.loading({ content: t('crud.updating'), duration: 3 });
                    setTimeout(() => {
                        message.success({
                            content: t('entity.addedAssetsDataProduct'),
                            duration: 3,
                        });
                        refetchForEntity?.();
                        setShouldRefetchEmbeddedListSearch?.(true);
                    }, 3000);
                }
            })
            .catch((e) => {
                message.destroy();
                message.error(
                    handleBatchError(entityUrns, e, {
                        content: t('crud.error.failedToAssetsDataHubUnknown'),
                        duration: 3,
                    }),
                );
            });
    };

    return (
        <>
            <div style={{ marginRight: 12 }}>
                {actionItems.has(EntityActionItem.BATCH_ADD_GLOSSARY_TERM) && (
                    <Button onClick={() => setIsBatchAddGlossaryTermModalVisible(true)}>
                        <LinkOutlined /> {t('crud.addToAssets')}
                    </Button>
                )}
                {actionItems.has(EntityActionItem.BATCH_ADD_DOMAIN) && (
                    <Button onClick={() => setIsBatchSetDomainModalVisible(true)}>
                        <LinkOutlined /> {t('crud.addAssets')}
                    </Button>
                )}
                {actionItems.has(EntityActionItem.BATCH_ADD_DATA_PRODUCT) && (
                    <Button onClick={() => setIsBatchSetDataProductModalVisible(true)}>
                        <LinkOutlined /> {t('crud.addAssets')}
                    </Button>
                )}
            </div>
            {isBatchAddGlossaryTermModalVisible && (
                <SearchSelectModal
                    titleText={t('crud.addGlossaryTermsAssets')}
                    continueText={t('common.add')}
                    onContinue={batchAddGlossaryTerms}
                    onCancel={() => setIsBatchAddGlossaryTermModalVisible(false)}
                    fixedEntityTypes={Array.from(
                        entityRegistry.getTypesWithSupportedCapabilities(EntityCapabilityType.GLOSSARY_TERMS),
                    )}
                />
            )}
            {isBatchSetDomainModalVisible && (
                <SearchSelectModal
                    titleText={t('domain.addAssetsToDomain')}
                    continueText={t('common.add')}
                    onContinue={batchSetDomain}
                    onCancel={() => setIsBatchSetDomainModalVisible(false)}
                    fixedEntityTypes={Array.from(
                        entityRegistry.getTypesWithSupportedCapabilities(EntityCapabilityType.DOMAINS),
                    )}
                />
            )}
            {isBatchSetDataProductModalVisible && (
                <SearchSelectModal
                    titleText={t('domain.addAssetsToDataProduct')}
                    continueText={t('common.add')}
                    onContinue={batchSetDataProduct}
                    onCancel={() => setIsBatchSetDataProductModalVisible(false)}
                    fixedEntityTypes={Array.from(
                        entityRegistry.getTypesWithSupportedCapabilities(EntityCapabilityType.DATA_PRODUCTS),
                    )}
                />
            )}
        </>
    );
}

export default EntityActions;
