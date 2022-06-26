export const getEthereum = () => typeof window !== 'undefined' ? (window as any).ethereum : null
export const setEthereum = (eth: any) => { (window as any).ethereum = eth }
