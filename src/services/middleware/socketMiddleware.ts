import { Middleware, MiddlewareAPI } from "redux";
import { TOrdersHistoryActions } from "../actions/wsOrdersHistory";
import { AppDispatch, RootState } from "../../utils/types";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TOrdersHistoryActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === 'WS_CONNECTION_START') {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS',  payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event  });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: 'WS_GET_MESSAGE', payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
}