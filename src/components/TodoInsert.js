import React, { useCallback, useState } from 'react'
import {MdAdd} from "react-icons/md";
import './TodoInsert.scss';

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    },[]);
    
    const onSubmit = useCallback( // 이 함수가 호출되면 props로 받아 온 onInsert 함수에 현재 value값을 파라미터로 넣어 호출하고, 현재 vlaue값을 초기화한다.
        e => {
            onInsert(value);
            setValue(''); // value값 초기화

            // submit 이벤트는 브라우저에서 새로고침을 발생시킨다.
            // 이를 방지하기 위해 이 함수를 호출한다.
            e.preventDefault();
        },
        [onInsert, value]
    ) 
    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="할 일을 입력하세요" value={value} onChange={onChange} />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    )
}

export default TodoInsert
