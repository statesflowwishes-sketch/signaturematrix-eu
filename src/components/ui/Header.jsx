import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Only show header on organization dashboard
  const isOrganizationDashboard = location?.pathname === '/organization-dashboard';
  
  if (!isOrganizationDashboard) {
    return null;
  }

  const navigationItems = [
    { label: 'Signatures', path: '/organization-dashboard', icon: 'FileSignature' },
    { label: 'Campaigns', path: '/campaigns', icon: 'Megaphone' },
    { label: 'Analytics', path: '/analytics', icon: 'BarChart3' },
    { label: 'Export', path: '/export', icon: 'Download' }
  ];

  const userMenuItems = [
    { label: 'Profile Settings', icon: 'User', action: () => console.log('Profile') },
    { label: 'Organization Settings', icon: 'Settings', action: () => console.log('Settings') },
    { label: 'API Keys', icon: 'Key', action: () => console.log('API Keys') },
    { label: 'Billing', icon: 'CreditCard', action: () => console.log('Billing') },
    { label: 'Help Center', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: 'Sign Out', icon: 'LogOut', action: () => console.log('Sign Out'), variant: 'destructive' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-matrix border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold font-heading text-foreground">
              SignatureMatrix
            </h1>
            <span className="text-xs text-muted-foreground font-mono">
              Admin Dashboard
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={location?.pathname === item?.path ? "default" : "ghost"}
              size="sm"
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              onClick={() => handleNavigation(item?.path)}
              className="text-sm"
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              onClick={() => console.log('New Campaign')}
            >
              New Campaign
            </Button>
            <Button
              variant="ghost"
              size="icon"
              iconName="Bell"
              iconSize={18}
              onClick={() => console.log('Notifications')}
              className="relative"
            >
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
            </Button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <span className="hidden sm:block text-sm font-medium">Admin</span>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-matrix-lg z-50 animate-slide-down">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">Administrator</p>
                  <p className="text-xs text-muted-foreground font-mono">admin@signaturematrix.com</p>
                </div>
                <div className="py-2">
                  {userMenuItems?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item?.action();
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm transition-colors hover:bg-muted/50 ${
                        item?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-foreground'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
            iconName={isMenuOpen ? "X" : "Menu"}
            iconSize={20}
          />
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-down">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? "default" : "ghost"}
                size="sm"
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                onClick={() => handleNavigation(item?.path)}
                className="w-full justify-start"
              >
                {item?.label}
              </Button>
            ))}
            <div className="pt-4 border-t border-border mt-4">
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                onClick={() => {
                  console.log('New Campaign');
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start mb-2"
              >
                New Campaign
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Bell"
                iconPosition="left"
                iconSize={16}
                onClick={() => {
                  console.log('Notifications');
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                Notifications
              </Button>
            </div>
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {(isMenuOpen || isUserMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;