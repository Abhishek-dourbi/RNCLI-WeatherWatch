import React, { ReactNode } from "react";

export interface SuggestionModalProps<T> {
    data: T[],
    renderText(item: T, index: number): React.JSX.Element
}

interface SuggestionModalRef {
    show(): void;
    hide(): void;
    close(): void;
}