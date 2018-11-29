import AsyncComponentFn from './AsyncComponentFn';

export default (path: string)=>{
    return (
        AsyncComponentFn(() => import('../pages/'+ path + '/index.tsx'))
    )
};