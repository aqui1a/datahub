import styled from 'styled-components/macro';
import * as React from 'react';
import {
    ApiOutlined,
    BarChartOutlined,
    BookOutlined,
    SettingOutlined,
    SolutionOutlined,
    DownOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import { useAppConfig, useBusinessAttributesFlag } from '../../useAppConfig';
import { ANTD_GRAY } from '../../entity/shared/constants';
import { HOME_PAGE_INGESTION_ID } from '../../onboarding/config/HomePageOnboardingConfig';
import { useToggleEducationStepIdsAllowList } from '../../onboarding/useToggleEducationStepIdsAllowList';
import { useUserContext } from '../../context/useUserContext';
import DomainIcon from '../../domain/DomainIcon';

const LinkWrapper = styled.span`
    margin-right: 0px;
`;

const LinksWrapper = styled.div<{ areLinksHidden?: boolean }>`
    opacity: 1;
    white-space: nowrap;
    transition: opacity 0.5s;

    ${(props) =>
        props.areLinksHidden &&
        `
        opacity: 0;
        width: 0;
    `}
`;

const MenuItem = styled(Menu.Item)`
    font-size: 12px;
    font-weight: bold;
    max-width: 240px;
`;

const NavTitleContainer = styled.span`
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 2px;
`;

const NavTitleText = styled.span`
    margin-left: 6px;
`;

const NavTitleDescription = styled.div`
    font-size: 12px;
    font-weight: normal;
    color: ${ANTD_GRAY[7]};
`;

interface Props {
    areLinksHidden?: boolean;
}

export function HeaderLinks(props: Props) {
    const { areLinksHidden } = props;
    const me = useUserContext();
    const { config } = useAppConfig();

    const businessAttributesFlag = useBusinessAttributesFlag();

    const isAnalyticsEnabled = config?.analyticsConfig.enabled;
    const isIngestionEnabled = config?.managedIngestionConfig.enabled;

    const showAnalytics = (isAnalyticsEnabled && me && me?.platformPrivileges?.viewAnalytics) || false;
    const showSettings = true;
    const showIngestion =
        isIngestionEnabled && me && me.platformPrivileges?.manageIngestion && me.platformPrivileges?.manageSecrets;

    useToggleEducationStepIdsAllowList(!!showIngestion, HOME_PAGE_INGESTION_ID);

    return (
        <LinksWrapper areLinksHidden={areLinksHidden}>
            {showAnalytics && (
                <LinkWrapper>
                    <Link to="/analytics">
                        <Button type="text">
                            <Tooltip title="Ver análises de uso do DataHub">
                                <NavTitleContainer>
                                    <BarChartOutlined />
                                    <NavTitleText>Analises</NavTitleText>
                                </NavTitleContainer>
                            </Tooltip>
                        </Button>
                    </Link>
                </LinkWrapper>
            )}
            <Dropdown
                trigger={['click']}
                overlay={
                    <Menu>
                        <MenuItem key="0">
                            <Link to="/glossary">
                                <NavTitleContainer>
                                    <BookOutlined style={{ fontSize: '14px', fontWeight: 'bold' }} />
                                    <NavTitleText>Glossário</NavTitleText>
                                </NavTitleContainer>
                                <NavTitleDescription>Visualize e modifique seu dicionário de dados</NavTitleDescription>
                            </Link>
                        </MenuItem>
                        <MenuItem key="1">
                            <Link to="/domains">
                                <NavTitleContainer>
                                    <DomainIcon
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                        }}
                                    />
                                    <NavTitleText>Domínios</NavTitleText>
                                </NavTitleContainer>
                                <NavTitleDescription>Gerencie grupos relacionados de ativos de dados</NavTitleDescription>
                            </Link>
                        </MenuItem>
                        {businessAttributesFlag && (
                            <MenuItem key="2">
                                <Link to="/business-attribute">
                                    <NavTitleContainer>
                                        <GlobalOutlined
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                            }}
                                        />
                                        <NavTitleText>Atributo de negócio</NavTitleText>
                                    </NavTitleContainer>
                                    <NavTitleDescription>Campo universal para consistência de dados</NavTitleDescription>
                                </Link>
                            </MenuItem>
                        )}
                    </Menu>
                }
            >
                <LinkWrapper>
                    <Button type="text">
                        <SolutionOutlined /> Governo <DownOutlined style={{ fontSize: '6px' }} />
                    </Button>
                </LinkWrapper>
            </Dropdown>
            {showIngestion && (
                <LinkWrapper>
                    <Link to="/ingestion">
                        <Button id={HOME_PAGE_INGESTION_ID} type="text">
                            <Tooltip title="Connect DataHub to your organization's data sources">
                                <NavTitleContainer>
                                    <ApiOutlined />
                                    <NavTitleText>Ingestão</NavTitleText>
                                </NavTitleContainer>
                            </Tooltip>
                        </Button>
                    </Link>
                </LinkWrapper>
            )}
            {showSettings && (
                <LinkWrapper style={{ marginRight: 12 }}>
                    <Link to="/settings">
                        <Button type="text">
                            <Tooltip title="Manage your DataHub settings">
                                <SettingOutlined />
                            </Tooltip>
                        </Button>
                    </Link>
                </LinkWrapper>
            )}
        </LinksWrapper>
    );
}
