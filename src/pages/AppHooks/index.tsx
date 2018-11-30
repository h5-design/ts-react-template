import React, { useState, useEffect } from 'react'
import { Button } from 'antd';

const Example = () => {
    const _useState:any[] = useState(0);
    let count = _useState[0];
    let setCount = _useState[1];

    const handleResize = () =>{
        console.log('我被监听成功');
    };

    useEffect(() => {
        console.log('state被改变了');
        document.title = `You clicked ${count} times`;
        window.addEventListener('resize',handleResize);
        //return 的 function 会在 React 组件卸载后 执行
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    }, []);


    const handle = () => {
        setCount((v:number)=> v + 1 )
    };

    return (
        <>
            <span>You clicked {count} times</span>
            <Button type="primary" onClick={handle}>
                click me
            </Button>
        </>

    )
};

export default Example;