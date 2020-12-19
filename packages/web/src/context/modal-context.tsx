import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  FC,
} from 'react';
import {Modal} from 'antd';

type State = {
  visible: boolean;
  title?: string;
  modalContent?: React.ReactNode;
};

type Action = {
  type: string;
  payload?: {
    title: string;
    modalComponent: React.ReactNode;
  };
};

const initialState: State = {
  visible: false,
  title: '',
};

const ModalContext = createContext<{
  state: State;
  dispatch?: Dispatch<Action>;
}>({
  state: initialState,
});

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'open':
      return {
        visible: true,
        title: action.payload?.title,
        modalContent: action.payload?.modalComponent,
      };

    case 'close':
      return {
        visible: false,
        modalContent: null,
      };

    default:
      return state;
  }
}

type Props = {
  children: React.ReactNode;
};

const ModalProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ModalContext.Provider
      value={{
        state,
        dispatch,
      }}>
      <>
        {children}
        <Modal
          title={state.title || undefined}
          footer={false}
          visible={state.visible}
          onCancel={() => dispatch({type: 'close'})}>
          {state.modalContent}
        </Modal>
      </>
    </ModalContext.Provider>
  );
};

const useModalContext = () => useContext(ModalContext);

export {ModalProvider, useModalContext};
