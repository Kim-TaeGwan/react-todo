import React, { useCallback } from 'react'
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem'
import './TodoList.scss'

const TodoList = ({todos, onRemove, onToggle}) => {
    const rowRenderer = useCallback( // List컴포넌트 사용하기위에 함수 생성
        ({index, key, style}) => {
            const todo = todos[index];
            return(
                <TodoListItem todo={todo} key={key} onRemove={onRemove} onToggle={onToggle} style={style} />
            );
        },
        [onRemove, onToggle, todos]
    )
    return (
        <List
            className="TodoList"
            width={512} // 전체 크기
            height={513} // 전체 높이
            rowCount={todos.length} // 항목 개수
            rowHeight={57} // 항목 높이
            rowRenderer={rowRenderer} // 항목을 렌터링할 때 쓰는 함수
            list={todos} // 배열
            style={{outline: 'none'}} // List에 기본 적용되는 outline 스타일 제거
        /> // List 컴포넌트를 사용할때는 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더리할때 사용 하는 함수, 그리고 배열을 props로 넣어 주어야 한다
    )
}

export default React.memo(TodoList)