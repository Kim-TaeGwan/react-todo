import { useCallback, useRef, useState } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function App() {
  const [todos, setTodos] = useState([
    {id:1, text: '리액트의 기초 알아보기', checked:true},
    {id:2, text: '컴포넌트 스타일링해 보기', checked:true},
    {id:3, text: '일정 관리 앱 만들어 보기', checked:false}
  ]);
  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);
  const onInsert = useCallback( // onInsert 함수는 컴포넌트의 성능을 아낄 수 있도록 useCallback으로 감싸준다. props로 전달해야 할 함수를 만들 떄는 useCallback을 사용하여 함수를 감싸는 것을 습관화 하자
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo)); // 문자열 합치기
      nextId.current += 1; //nextId 1씩 더하기
    },
    [todos],
  )

const onRemove = useCallback(
  id=> {
    setTodos(todos.filter(todo => todo.id !== id));
  },
  [todos],
);// id를 파라미터로 받아 와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수

const onToggle = useCallback(
  id => {
    setTodos(
      todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo)
    )
  }, [todos]
)

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
