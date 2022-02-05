/*
export function someMutation (state) {
}
*/
export function updateServerStatus(state, payload) {
  state.server_status = payload
}

export function updateServerPort(state, payload) {
  state.server_port = payload
}
