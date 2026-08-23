export declare const REQUEST_STATUS: {
  readonly idle: "idle";
  readonly filling: "filling";
  readonly checking: "checking";
  readonly success: "success";
  readonly error: "error";
};
export type RequestStatus =
  | "idle"
  | "filling"
  | "checking"
  | "success"
  | "error";
export interface RequestState {
  status: RequestStatus;
  attempts: number;
  error: string;
}
export declare function createRequestState(): RequestState;
export type RequestEvent = {
  type:
    | "field-change"
    | "submit"
    | "validation-failed"
    | "prepared"
    | "reset";
  message?: string;
  iso?: string;
};
export declare function reduceRequestState(
  state: RequestState,
  event: RequestEvent,
): RequestState;
export interface RequestDraft {
  platform?: string;
  situation?: string;
  description?: string;
  contact?: string;
  consent?: boolean;
}
export declare function validateRequestDraft(draft: RequestDraft): string[];
export declare function composeRequestMessage(
  draft: Pick<RequestDraft, "platform" | "situation" | "description" | "contact">,
): string;
