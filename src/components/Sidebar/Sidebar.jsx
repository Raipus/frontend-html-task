import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

// Основной контейнер сайдбара
const SidebarContainer = styled.div`
    width: 72px;
    outline: 2px solid #e9eef2;
    outline-offset: -4px;
    border-radius: 15px;
    transition: width 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    position: relative;

    background-color: ${({ color }) => color === 'dark' 
        ? 'var(--color-sidebar-background-dark-default)' 
        : 'var(--color-sidebar-background-light-default)'};
  
    color: ${({ color }) => color === 'dark' 
        ? 'var(--color-text-dark-default)' 
        : 'var(--color-text-light-default)'};

    ${({ $isOpened }) => $isOpened && css`
        width: 190px;
    `}
`;

// Секция внутри сайдбара
const SidebarSection = styled.div`
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

// Хедер сайдбара
const SidebarHeader = styled(SidebarSection)`
    flex-direction: row;
    align-items: center;
    padding-bottom: 20px;
`;

// Текст логотипа
const LogoText = styled.span`
    opacity: ${({ $isOpened }) => $isOpened ? 1 : 0};
    transition: opacity 0.25s ease-in-out;
    font-size: 20px;
    margin-right: 5px;
    font-weight: 600;

    color: ${({ color }) => color === 'dark' 
        ? 'var(--color-text-logo-dark-default)' 
        : 'var(--color-text-logo-light-default)'};
`;

// Кнопка переключения сайдбара
const ToggleButton = styled.div`
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    cursor: pointer;
    position: absolute;
    left: 105%;
    transition: left 0.5s ease-in-out, background-color 0.3s ease-in-out;
  
    background-color: ${({ color }) => color === 'dark' 
        ? 'var(--color-button-background-dark-default)' 
        : 'var(--color-button-background-light-default)'};
  
    color: ${({ color }) => color === 'dark' 
        ? 'var(--color-text-dark-default)' 
        : 'var(--color-text-light-default)'};

    &:hover {
        background-color: ${({ color }) => color === 'dark' 
            ? 'var(--color-sidebar-background-dark-hover)' 
            : 'var(--color-sidebar-background-light-hover)'};
    }

    ${({ $isOpened }) => $isOpened && css`
        left: 92%;
        background-color: ${({ color }) => color === 'dark' 
            ? 'var(--color-button-background-dark-active)' 
            : 'var(--color-button-background-light-active)'} !important;
    `}
`;

// Элемент меню
const MenuItem = styled.div`
    display: flex;
    align-items: center;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    padding: 10px 0;
    margin-bottom: 5px;

    background-color: ${({ $active, color }) => $active 
        ? (color === 'dark' 
            ? 'var(--color-sidebar-background-dark-active)' 
            : 'var(--color-sidebar-background-light-active)')
        : 'transparent'};

    color: ${({ $active, color }) => $active 
        ? (color === 'dark' 
            ? 'var(--color-text-dark-active)' 
            : 'var(--color-text-light-active)')
        : (color === 'dark' 
            ? 'var(--color-text-dark-default)' 
            : 'var(--color-text-light-default)')};

    &:hover {
        background-color: ${({ color }) => color === 'dark' 
            ? 'var(--color-sidebar-background-dark-hover)' 
            : 'var(--color-sidebar-background-light-hover)'};
    
        color: ${({ color }) => color === 'dark' 
            ? 'var(--color-text-dark-hover)' 
            : 'var(--color-text-light-hover)'};
    
        svg {
            color: ${({ color }) => color === 'dark' 
                ? 'var(--color-text-dark-hover)' 
                : 'var(--color-text-light-hover)'} !important;
        }
    }

    svg {
        padding-inline: 16px 6px;
        color: ${({ $active, color }) => $active 
            ? (color === 'dark' 
                ? 'var(--color-text-dark-active)' 
                : 'var(--color-text-light-active)')
            : (color === 'dark' 
                ? 'var(--color-text-dark-default)' 
                : 'var(--color-text-light-default)')} !important;
        transition: color 0.3s ease-in-out;
    }
`;

// Текст пункта меню
const MenuItemText = styled.span`
    padding-inline: 10px 16px;
    opacity: ${({ $isOpened }) => $isOpened ? 1 : 0};
    font-weight: 600;
    transition: opacity 0.25s ease-in-out;
`;

const Sidebar = (props) => {
    const { color } = props;
    const [isOpened, setIsOpened] = useState(false);
    const [activePath, setActivePath] = useState('/');

    const goToRoute = (path) => {
        console.log(`going to "${path}"`);
        setActivePath(path);
    };

    const toggleSidebar = () => {
        setIsOpened(v => !v);
    };

    return (
        <SidebarContainer color={color} $isOpened={isOpened}>
            <SidebarHeader color={color}>
                <img src={logo} alt="TensorFlow logo" width="50" />
                <LogoText color={color} $isOpened={isOpened}>TensorFlow</LogoText>
                <ToggleButton 
                    color={color} 
                    $isOpened={isOpened}
                    onClick={toggleSidebar}
                >
                    <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />
                </ToggleButton>
            </SidebarHeader>
            <SidebarSection>
                {routes.map(route => (
                    <MenuItem
                        key={route.title}
                        color={color}
                        $active={activePath === route.path}
                        $isOpened={isOpened}
                        onClick={() => goToRoute(route.path)}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        <MenuItemText $isOpened={isOpened}>{route.title}</MenuItemText>
                    </MenuItem>
                ))}
            </SidebarSection>
            <SidebarSection>
                {bottomRoutes.map(route => (
                    <MenuItem
                        key={route.title}
                        color={color}
                        $active={activePath === route.path}
                        $isOpened={isOpened}
                        onClick={() => goToRoute(route.path)}
                    >
                        <FontAwesomeIcon icon={route.icon} />
                        <MenuItemText $isOpened={isOpened}>{route.title}</MenuItemText>
                    </MenuItem>
                ))}
            </SidebarSection>
        </SidebarContainer>
    );
};

Sidebar.propTypes = {
    color: PropTypes.string,
};

export default Sidebar;
