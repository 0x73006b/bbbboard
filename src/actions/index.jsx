export const SETUP_MSG = 'SETUP_MSG';
export const POST_MSG = 'POST_MSG';
export const EDIT_MSG = 'EDIT_MSG';
export const DEL_MSG = 'DEL_MSG';

export const setupMsg = (msg) => {
  return { type: SETUP_MSG, msg };
};

export const postMsg = (msg) => {
  return { type: POST_MSG, msg };
};

export const editMsg = (msg) => {
  return { type: EDIT_MSG, msg };
};

export function delMsg (msg) {
  return { type: DEL_MSG, msg };
}
