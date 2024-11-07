import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { IconItemTitle } from './IconItemTitle';
import { MenuItemStyle } from './styledComponent';

type Props = {
    key: string;
    onClick: () => void;
};

/**
 * Preview View Menu Item
 */
export const PreviewViewItem = ({ key, onClick }: Props) => {
    return (
        <Menu.Item key={key} onClick={onClick}>
            <IconItemTitle tip="See the View definition" title="Preview" icon={<EyeOutlined />} />
        </Menu.Item>
    );
};
