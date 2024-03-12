import React from 'react';
import { createRoot } from 'react-dom/client';
import { useId, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';
import { FluentProvider } from '@fluentui/react-components';

let add = null;

const MessageContainer= () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);

  const notify = (text, options = {}) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{text ?? ''}</ToastTitle>
      </Toast>,
      { position: 'top', ...options }
    );
  };

  add = (text, options) => {
    notify(text, options)
  };

  return (
    <FluentProvider>
      <Toaster toasterId={toasterId} />
    </FluentProvider>
  );
};

const ROOT_EL_ID = 'opFinanceMessageWrapper';

let rootEl = document.getElementById(ROOT_EL_ID);
if (!rootEl) {
  rootEl = document.createElement('div');
  rootEl.id = ROOT_EL_ID;
  document.body.append(rootEl);
}
const root = createRoot(rootEl);
root.render(<MessageContainer />);


const message = {
 info: (text, timeout = 3000) => {
    add(text, { timeout, intent: MessageIntent.info });
  },
 success: (text, timeout = 3000) => {
    add(text, { timeout, intent: MessageIntent.success });
  },
  warning: (text, timeout = 3000) => {
    add(text, { timeout, intent: MessageIntent.warning });
  },
  error: (text, timeout = 3000) => {
    add(text, { timeout, intent: MessageIntent.error });
  },
};

export default message;
