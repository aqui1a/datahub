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
import { useTranslation } from 'react-i18next';
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

const NavTitleContainer = styled.span`
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 2px;
`;

const NavTitleText = styled.span`
    margin-left: 6px;
    font-weight: bold;
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
    const { t } = useTranslation();
    const { areLinksHidden } = props;
    const me = useUserContext();
    const { config } = useAppConfig();

    const businessAttributesFlag = useBusinessAttributesFlag();

    const isAnalyticsEnabled = config?.analyticsConfig.enabled;
    const isIngestionEnabled = config?.managedIngestionConfig.enabled;

    const showAnalytics = (isAnalyticsEnabled && me && me?.platformPrivileges?.viewAnalytics) || false;
    const showSettings = true;
    const showIngestion =
        isIngestionEnabled && me && (me.platformPrivileges?.manageIngestion || me.platformPrivileges?.manageSecrets);

    useToggleEducationStepIdsAllowList(!!showIngestion, HOME_PAGE_INGESTION_ID);

    const items = [
        {
            key: 0,
            label: (
                <Link to="/glossary">
                    <NavTitleContainer>
                        <BookOutlined style={{ fontSize: '14px', fontWeight: 'bold' }} />
                        <NavTitleText>Glossary</NavTitleText>
                    </NavTitleContainer>
                    <NavTitleDescription>View and modify your data dictionary</NavTitleDescription>
                </Link>
            ),
        },
        {
            key: 1,
            label: (
                <Link to="/domains">
                    <NavTitleContainer>
                        <DomainIcon
                            style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                            }}
                        />
                        <NavTitleText>Domains</NavTitleText>
                    </NavTitleContainer>
                    <NavTitleDescription>Manage related groups of data assets</NavTitleDescription>
                </Link>
            ),
        },
        ...(businessAttributesFlag
            ? [
                  {
                      key: 2,
                      label: (
                          <Link to="/business-attribute">
                              <NavTitleContainer>
                                  <GlobalOutlined
                                      style={{
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                      }}
                                  />
                                  <NavTitleText>Business Attribute</NavTitleText>
                              </NavTitleContainer>
                              <NavTitleDescription>Universal field for data consistency</NavTitleDescription>
                          </Link>
                      ),
                  },
              ]
            : []),
    ];

    return (
        <LinksWrapper areLinksHidden={areLinksHidden}>
            {showAnalytics && (
                <LinkWrapper>
                    <Link to="/analytics">
                        <Button type="text">
                            <Tooltip title={t('adminHeader.analyticsTitle')}>
                                <NavTitleContainer>
                                    <BarChartOutlined />
                                    <NavTitleText>{t('adminHeader.analyticsText')}</NavTitleText>
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
                                    <NavTitleText>{t('adminHeader.glossaryText')}</NavTitleText>
                                </NavTitleContainer>
                                <NavTitleDescription>{t('adminHeader.glossaryDescription')}</NavTitleDescription>
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
                                    <NavTitleText>{t('adminHeader.domainsText')}</NavTitleText>
                                </NavTitleContainer>
                                <NavTitleDescription>{t('adminHeader.domainsDescription')}</NavTitleDescription>
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
                                        <NavTitleText>Business Attribute</NavTitleText>
                                    </NavTitleContainer>
                                    <NavTitleDescription>Universal field for data consistency</NavTitleDescription>
                                </Link>
                            </MenuItem>
                        )}
                    </Menu>
                }
            >
                <LinkWrapper>
                    <Button type="text">
                        <SolutionOutlined /> {t('common.govern')} <DownOutlined style={{ fontSize: '6px' }} />
                    </Button>
                </LinkWrapper>
            </Dropdown>
            {showIngestion && (
                <LinkWrapper>
                    <Link to="/ingestion">
                        <Button id={HOME_PAGE_INGESTION_ID} type="text">
                            <Tooltip title={t('adminHeader.ingestionTitle')}>
                                <NavTitleContainer>
                                    <ApiOutlined />
                                    <NavTitleText>{t('adminHeader.ingestionText')}</NavTitleText>
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
                            <Tooltip title={t('adminHeader.settingsTitle')}>
                                <SettingOutlined />
                            </Tooltip>
                        </Button>
                    </Link>
                </LinkWrapper>
            )}
        </LinksWrapper>
    );
}
