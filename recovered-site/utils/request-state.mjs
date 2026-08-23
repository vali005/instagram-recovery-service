// Shared request-form state machine. Plain ESM so both the app build and the
// Node test runner can import it without transpilation. Pure functions only:
// no network calls, no storage access.

export const REQUEST_STATUS = /** @type {const} */ ({
  idle: "idle",
  filling: "filling",
  checking: "checking",
  success: "success",
  error: "error",
});

/**
 * @returns {{ status: "idle" | "filling" | "checking" | "success" | "error", attempts: number, error: string }}
 */
export function createRequestState() {
  return { status: REQUEST_STATUS.idle, attempts: 0, error: "" };
}

/**
 * Reducer for explicit user actions. Submission is never triggered by timers,
 * page events or answer selection — only by an explicit "submit" event, and a
 * successful submission cannot be repeated by accident.
 *
 * @param {ReturnType<typeof createRequestState>} state
 * @param {{ type: string, message?: string, iso?: string }} event
 * @returns {ReturnType<typeof createRequestState>}
 */
export function reduceRequestState(state, event) {
  switch (event.type) {
    case "field-change": {
      if (state.status === REQUEST_STATUS.checking || state.status === REQUEST_STATUS.success) {
        return state;
      }
      return { ...state, error: "", status: REQUEST_STATUS.filling };
    }
    case "submit": {
      if (state.status === REQUEST_STATUS.checking || state.status === REQUEST_STATUS.success) {
        return state;
      }
      return { ...state, status: REQUEST_STATUS.checking, error: "" };
    }
    case "validation-failed": {
      return {
        ...state,
        status: REQUEST_STATUS.error,
        attempts: state.attempts + 1,
        error: event.message ?? "",
      };
    }
    case "prepared": {
      if (state.status !== REQUEST_STATUS.checking) {
        return state;
      }
      return {
        ...state,
        status: REQUEST_STATUS.success,
        attempts: state.attempts + 1,
        error: "",
      };
    }
    case "reset":
      return createRequestState();
    default:
      return state;
  }
}

/**
 * Validates the draft locally in the browser. Returns the list of problems;
 * an empty list means the draft may be prepared.
 *
 * @param {{
 *   platform?: string,
 *   situation?: string,
 *   description?: string,
 *   contact?: string,
 *   consent?: boolean,
 * }} draft
 * @returns {string[]}
 */
export function validateRequestDraft(draft) {
  const errors = [];
  if (!draft.platform) errors.push("Выберите площадку.");
  if (!draft.situation) errors.push("Выберите ситуацию.");
  const contact = (draft.contact ?? "").trim();
  if (!contact) errors.push("Укажите безопасный способ связи.");
  if (!draft.consent) errors.push("Подтвердите согласие на обработку введённых данных.");
  return errors;
}

/**
 * Builds the human-readable message the user sends on their own. The site
 * itself never transmits this text anywhere automatically.
 *
 * @param {{
 *   platform?: string,
 *   situation?: string,
 *   description?: string,
 *   contact?: string,
 * }} draft
 * @returns {string}
 */
export function composeRequestMessage(draft) {
  const lines = [
    `Площадка: ${draft.platform || "—"}`,
    `Ситуация: ${draft.situation || "—"}`,
    `Описание: ${(draft.description ?? "").trim() || "не указано"}`,
    `Связь: ${(draft.contact ?? "").trim()}`,
  ];
  return lines.join("\n");
}
