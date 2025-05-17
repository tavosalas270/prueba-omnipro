import {ReactNode} from 'react';

export interface ChildrenProp {
    children: ReactNode
}

export interface GlobalProvider {
    loadText: string;
    loading: boolean;
    handleLoadText: (text:string) => void;
    handleLoading: (loading:boolean) => void;
}