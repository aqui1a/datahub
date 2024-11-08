import * as React from 'react';
import { BookFilled, BookOutlined } from '@ant-design/icons';
import { EntityType, GlossaryTerm, SearchResult } from '../../../types.generated';
import { Entity, EntityCapabilityType, IconStyleType, PreviewType } from '../Entity';
import { Preview } from './preview/Preview';
import { getDataForEntityType } from '../shared/containers/profile/utils';
import { EntityProfile } from '../shared/containers/profile/EntityProfile';
import { GetGlossaryTermQuery, useGetGlossaryTermQuery } from '../../../graphql/glossaryTerm.generated';
import { GenericEntityProperties } from '../shared/types';
import { SchemaTab } from '../shared/tabs/Dataset/Schema/SchemaTab';
import GlossaryRelatedEntity from './profile/GlossaryRelatedEntity';
import GlossayRelatedTerms from './profile/GlossaryRelatedTerms';
import { SidebarOwnerSection } from '../shared/containers/profile/sidebar/Ownership/sidebar/SidebarOwnerSection';
import { PropertiesTab } from '../shared/tabs/Properties/PropertiesTab';
import { DocumentationTab } from '../shared/tabs/Documentation/DocumentationTab';
import { SidebarAboutSection } from '../shared/containers/profile/sidebar/AboutSection/SidebarAboutSection';
import { EntityMenuItems } from '../shared/EntityDropdown/EntityDropdown';
import { EntityActionItem } from '../shared/entity/EntityActions';
import { SidebarDomainSection } from '../shared/containers/profile/sidebar/Domain/SidebarDomainSection';
import { PageRoutes } from '../../../conf/Global';
/**
 * Definition of the DataHub Dataset entity.
 */
export class GlossaryTermEntity implements Entity<GlossaryTerm> {
    constructor(translationService: any) {
        this.translationService = translationService;
    }

    translationService: any;

    type: EntityType = EntityType.GlossaryTerm;

    icon = (fontSize: number, styleType: IconStyleType, color?: string) => {
        if (styleType === IconStyleType.TAB_VIEW) {
            return <BookOutlined style={{ fontSize, color }} />;
        }

        if (styleType === IconStyleType.HIGHLIGHT) {
            return <BookFilled style={{ fontSize, color: color || '#B37FEB' }} />;
        }

        return (
            <BookOutlined
                style={{
                    fontSize,
                    color: color || '#BFBFBF',
                }}
            />
        );
    };

    isSearchEnabled = () => true;

    isBrowseEnabled = () => true;

    getAutoCompleteFieldName = () => 'name';

    isLineageEnabled = () => false;

    getPathName = () => 'glossaryTerm';

    getCollectionName = () => this.translationService('common.glossaryTerms');

    getEntityName = () => this.translationService('common.glossaryTerms');

    useEntityQuery = useGetGlossaryTermQuery;

    getCustomCardUrlPath = () => PageRoutes.GLOSSARY;

    renderProfile = (urn) => {
        return (
            <EntityProfile
                urn={urn}
                entityType={EntityType.GlossaryTerm}
                useEntityQuery={useGetGlossaryTermQuery as any}
                headerActionItems={new Set([EntityActionItem.BATCH_ADD_GLOSSARY_TERM])}
                headerDropdownItems={
                    new Set([
                        EntityMenuItems.UPDATE_DEPRECATION,
                        EntityMenuItems.CLONE,
                        EntityMenuItems.MOVE,
                        EntityMenuItems.DELETE,
                    ])
                }
                isNameEditable
                hideBrowseBar
                tabs={[
                    {
                        name: this.translationService('common.documentation'),

                        component: DocumentationTab,
                    },
                    {
                        name: this.translationService('common.relatedEntities'),
                        component: GlossaryRelatedEntity,
                    },
                    {
                        name: 'Schema',
                        component: SchemaTab,
                        properties: {
                            editMode: false,
                        },
                        display: {
                            visible: (_, glossaryTerm: GetGlossaryTermQuery) =>
                                glossaryTerm?.glossaryTerm?.schemaMetadata !== null,
                            enabled: (_, glossaryTerm: GetGlossaryTermQuery) =>
                                glossaryTerm?.glossaryTerm?.schemaMetadata !== null,
                        },
                    },
                    {
                        name: this.translationService('common.relatedTerms'),
                        component: GlossayRelatedTerms,
                    },
                    {
                        name: this.translationService('common.properties'),
                        component: PropertiesTab,
                    },
                ]}
                sidebarSections={this.getSidebarSections()}
                getOverrideProperties={this.getOverridePropertiesFromEntity}
            />
        );
    };

    getSidebarSections = () => [
        {
            component: SidebarAboutSection,
        },
        {
            component: SidebarOwnerSection,
        },
        {
            component: SidebarDomainSection,
            properties: {
                hideOwnerType: true,
            },
        },
    ];

    getOverridePropertiesFromEntity = (glossaryTerm?: GlossaryTerm | null): GenericEntityProperties => {
        // if dataset has subTypes filled out, pick the most specific subtype and return it
        return {
            customProperties: glossaryTerm?.properties?.customProperties,
        };
    };

    renderSearch = (result: SearchResult) => {
        return this.renderPreview(PreviewType.SEARCH, result.entity as GlossaryTerm);
    };

    renderPreview = (previewType: PreviewType, data: GlossaryTerm) => {
        return (
            <Preview
                previewType={previewType}
                urn={data?.urn}
                parentNodes={data.parentNodes}
                name={this.displayName(data)}
                description={data?.properties?.description || ''}
                owners={data?.ownership?.owners}
                domain={data.domain?.domain}
            />
        );
    };

    displayName = (data: GlossaryTerm) => {
        return data.properties?.name || data.name || data.urn;
    };

    platformLogoUrl = (_: GlossaryTerm) => {
        return undefined;
    };

    getGenericEntityProperties = (glossaryTerm: GlossaryTerm) => {
        return getDataForEntityType({
            data: glossaryTerm,
            entityType: this.type,
            getOverrideProperties: (data) => data,
        });
    };

    supportedCapabilities = () => {
        return new Set([
            EntityCapabilityType.OWNERS,
            EntityCapabilityType.DEPRECATION,
            EntityCapabilityType.SOFT_DELETE,
        ]);
    };
}
