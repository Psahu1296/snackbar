import React, { useEffect, useRef, useState } from 'react';

import { useColorMode } from '@chakra-ui/react';

import { closeDark, closeWhite } from '../../assets';

import './snackbar.css';

interface SnackbarProps {
  type?: 'action' | 'action-long';
  open: boolean;
  autoCloseTime?: number;
  canBeClosed?: boolean;
  children: React.ReactNode;
  actionProps?: JSX.Element;
  align?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
  onclose: (args: boolean) => void;
}

function Snackbar({
  type = undefined,
  open,
  autoCloseTime = 3000,
  canBeClosed = true,
  align = 'top-right',
  children,
  actionProps,
  onclose,
}: SnackbarProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setisopen] = useState<boolean>(open);
  const { colorMode } = useColorMode();

  useEffect(() => {
    setisopen(false);
    if (open) {
      timerRef.current = setTimeout(() => onclose(false), autoCloseTime);
      setisopen(true);
      return;
    }
    if (timerRef && timerRef.current) {
      clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef && timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [open]);

  return (
    <div>
      {isOpen && (
        <div
          data-testid="snackbar-component"
          className={`wrapper ${align} ${
            colorMode === 'dark' ? 'light-wrapper' : ''
          } ${type === 'action-long' ? 'action-long-wrapper' : ''}`}
        >
          <p data-testid="message-txt" className="text-area">
            {children}
          </p>
          <div
            className="btn-wrapper"
            style={{
              alignSelf: type === 'action-long' ? 'flex-end' : 'auto',
            }}
          >
            {actionProps}
            {canBeClosed && (
              <button
                type="button"
                data-testid="close-btn"
                className={`close-btn ${
                  colorMode === 'dark' && 'close-btn-dark'
                }`}
                onClick={() => onclose(false)}
              >
                {colorMode === 'dark' ? (
                  <img
                    src={closeWhite}
                    alt="close-icon"
                    className="close-icon"
                  />
                ) : (
                  <img
                    src={closeDark}
                    alt="close-icon"
                    className="close-icon"
                  />
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Snackbar;
