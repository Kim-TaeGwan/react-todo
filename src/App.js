import { useCallback, useRef, useReducer } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for(let i = 1; i <= 2500; i ++) {
    array.push({
      id:i,
      text: `할 일 ${i}`,
      checked: false
    });
  }
  return array
}

function todoReducer(todos, action) {
  switch(action.type) {
    case 'INSERT' : // 새로 추가
      // {type: 'INSERT', todo : {id:1, text:'todo', checked: false}}
      return todos.concat(action.todo);
    case "REMOVE" : // 제거
      // {type: 'REMOVE', id:1}
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE' : // 토글
       // {type: 'REMOVE', id:1}
      return todos.map(todo =>
        todo.id === action.id ? {...todo, checked: !todo.checked} : todo,);
        default:
            return todos;
  }
}


const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined,createBulkTodos);
  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);
  const onInsert = useCallback( // onInsert 함수는 컴포넌트의 성능을 아낄 수 있도록 useCallback으로 감싸준다. props로 전달해야 할 함수를 만들 떄는 useCallback을 사용하여 함수를 감싸는 것을 습관화 하자
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({type: "INSERT", todo});
      nextId.current += 1; //nextId 1씩 더하기
    },
    [],
  )

const onRemove = useCallback(
  id=> {
    dispatch({type: "REMOVE", id});
  },[]);// id를 파라미터로 받아 와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수

const onToggle = useCallback(
  id => {
    dispatch({type: "TOGGLE", id});
  }, []
)

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
