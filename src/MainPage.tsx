import {useState, useMemo} from 'react';
import { GlobalContext } from './contexts';
import { GlobalProvider, ChildrenProp } from './interfaces';

export const MainPage = ({children}: ChildrenProp) => {

    const [loadText, setLoadText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoadText = (text:string) => {
        setLoadText(text);
    }

    const handleLoading = (loading:boolean) => {
        setLoading(loading);
    }

    const providerValue:GlobalProvider = useMemo(
        () => ({
            loadText,
            loading,
            handleLoadText,
            handleLoading
        }),
        [loadText, loading]
    );

  return (
    <div className='w-screen h-screen'>
        <GlobalContext.Provider value={providerValue}>{children}</GlobalContext.Provider>
    </div>
  )
}