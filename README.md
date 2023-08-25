# TEAM6 - Todo 애플리케이션
프리온보딩 1주차에 진행한 과제물입니다. <br/>
기간 : 2023.08.22. ~ 2023.08.25. <br />

<a href='https://github.com/' target='_blank'>👉 배포 링크 👈 </a>

## 👥 팀원
<table border>
  <tbody>
    <tr>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/106734517?v=4"  alt=""/><br />
        <a href="https://github.com/iziz9">
          <img src="https://img.shields.io/badge/강현주-1E90FF?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/94212747?s=96&v=4"  alt=""/><br />
        <a href="https://github.com/NR0617">
          <img src="https://img.shields.io/badge/오나래-1E90FF?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/80497049?s=96&v=4"  alt=""/>
        <a href="https://github.com/thumbthing">
          <img src="https://img.shields.io/badge/이민구-1E90FF?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/68311202?s=96&v=4"  alt=""/>
        <a href="https://github.com/slowteady">
          <img src="https://img.shields.io/badge/이용민-1E90FF?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/43225974?s=96&v=4"  alt=""/>
        <a href="https://github.com/lyn94">
          <img src="https://img.shields.io/badge/이유나-1E90FF?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/110447844?s=96&v=4"  alt=""/>
        <a href="https://github.com/337yj">
          <img src="https://img.shields.io/badge/이윤정-1E90FF?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
     </tr>
  </tbody>
</table>
<br/>

## 실행 방법
1. 로컬 환경에 프로젝트 복사본 생성
```
git clone https://github.com/pre-onboarding-12th-team6/pre-onboarding-12th-1-6
```
2. 프로젝트 폴더로 이동
```
cd pre-onboarding-12th-1-6
```
3. 프로젝트 종속성 설치
```
npm install
```
4. 프로젝트 실행
```
npm start
```
## 기술 스택
<img src='https://user-images.githubusercontent.com/123078739/234895132-18ab503a-fcc7-486d-b89a-cb0cc1f7796b.svg' />
<img src='https://user-images.githubusercontent.com/123078739/234895162-42f905c6-765d-44d2-bcb1-b011286ef6b2.svg' />
<img src='https://camo.githubusercontent.com/6cafef69921d1cdf4aac79e0b96cfb4d58c2cfa08d791d31178da11e3d75f78c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6178696f732d3541323945343f7374796c653d666f722d7468652d6261646765266c6f676f3d6178696f73266c6f676f436f6c6f723d7768697465' />
<img src='https://user-images.githubusercontent.com/123078739/234895191-c1198a7b-9e2e-499a-8e61-c3b87bf8e2c2.svg' />
<img src='https://camo.githubusercontent.com/2350f320fdbfd9c83a5b01c23d90d29021f8f296075425b78603ba24d816818e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f70726574746965722d4637423933453f7374796c653d666f722d7468652d6261646765266c6f676f3d7072657474696572266c6f676f436f6c6f723d626c61636b' />
<img src='https://user-images.githubusercontent.com/123078739/234895185-7fd6c334-faca-4520-8551-2f20b32f085e.svg' />
<img src='https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white' />

## 프로젝트 구조
- 

## Best Practice
> 코드의 가독성과 재사용성을 기준으로 중심 기능별 최선의 방법을 선정했습니다.

### 1. API 관리
  ```js
    // 
  ```
- 설명

❓ 선정 이유 
- a
- b

### 2. 로그인, 회원가입 기능
  ```js
    // 
  ```
- 설명

❓ 선정 이유 
- a
- b

### 3. Todo CRUD 기능
#### `Read`
  ```js
    // Read
    const [todoList, setTodoList] = useState<TodoType[]>([]);

	useEffect(() => {
		const getTodoList = async () => {
			try {
				const response = await getTodos();
				if (response?.status === 200) {
					setTodoList(response?.data);
				} else {
					throw new Error('리스트를 불러오지 못했습니다');
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					alert(`Error : ${error.message}`);
				} else {
					alert('unknown error occurred');
				}
			}
		};

		getTodoList();
	}, []);

  ```

#### `Create`
  ```js
    // pages/Todo.tsx

    	const handleAddTodo = useCallback(
		(newTodo: TodoType) => {
			setTodoList([...todoList, newTodo]);
		},
		[todoList],
	);

  // components/TodoCreateForm.tsx

  	const handleCreateTodo = useCallback(async (): Promise<void> => {
		try {
			if (inputText.trim().length !== 0) {
				const newTodo: Partial<TodoType> = {
					todo: inputText,
				};
				const response = await createTodo(newTodo as TodoType);
				if (response.status === 201) {
					handleAddTodo(response?.data);
				} else {
					throw new Error(`Todo 생성에 실패 했습니다`);
				}
			} else {
				throw new Error('Todo에 추가할 수 없습니다');
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert(`Error : ${error.message}`);
			} else {
				alert('unknown error occurred');
			}
		} finally {
			setInputText('');
		}
	}, [inputText]);
  ```
#### `Update`
  ```js
    // pages/Todo.tsx

    const handleUpdateTodo = async (id: number, todo: TodoType) => {
		try {
			const response = await updateTodo(id, todo);

			if (response.status === 200) {
				const updatedTodo = todoList.map((item) => (item.id === response?.data.id ? { ...response?.data } : item));
				setTodoList(updatedTodo);
				setIsModifyId(undefined);
			} else {
				throw new Error('Todo update에 실패했습니다');
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert(`Error : ${error.message}`);
			} else {
				alert('unknown error occurred');
			}
		}
	};

    // components/TodoUpdateForm.tsx

    const handleModifySubmit = useCallback(async () => {
		try {
			const newTodo: Partial<TodoType> = {
				todo: modifiedTodo,
				isCompleted: modifyIsCompleted,
			};
			await handleUpdateTodo(todo.id, newTodo as TodoType);
		} catch (error) {
			alert(error);
		}
	}, [modifiedTodo, modifyIsCompleted, todo, handleUpdateTodo]);
  ```
#### `Delete`
  ```js
    // pages/Todo.tsx
  const handleDeleteTodo = async (id: number) => {
      try {
        const response = await deleteTodo(id);

        if (response.status === 204) {
          const deletedTodo = todoList.filter((item) => item.id !== id);
          setTodoList(deletedTodo);
        } else {
          throw new Error('Todo 삭제에 실패 했습니다');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(`Error : ${error.message}`);
        } else {
          alert(`unknown error occured`);
        }
      }
    };
  ```
- Create: 서버로 요청받은 response를 페이지에서 관리되고 있는 state에 추가
- Read: 최초 렌더링에 서버로 요청한 Todo를 state에 저장
- Update: state로 관리되고 있는 TodoList를 최신화 하여 state에 저장
- Delete: TodoList state를 필터링하여 최신화된 state로 관리

❓ 선정 이유 
- 서버 과부화를 방지하기 위해 요청을 최소화
- state로 관리되고 있는 데이터를 response를 활용하여 최신상태로 유지하여 server와 client 데이터를 동기화
- 함수, 변수명의 구체화하여 가독성을 증가
- 에러 핸들링을 통해 요청의 성공/실패 여부를 사용자에게 공지

### 4. 라우팅
  ```js
    // 
  ```
- 설명

❓ 선정 이유 
- a
- b

## 팀 규칙
### 커밋 컨벤션

🗒️ Pull Request rule

1. 제목은 이와 같이 작성한다: [작성자 이니셜] 타입키워드: 작업설명 / e.g.  [YNL] chore: 라우터돔 세팅
2. feature 브랜치는 **반드시** develop 브랜치로만 PR한다. master 브랜치로 병합 요청시 PR요청을 취소한다. (또는 관리자 권한으로 취소시킬 수 있다.)

🗒️ commit message rule

1. 제목과 본문을 빈 행으로 구분한다.
2. 최대한 한글로 작성한다.
3. 제목은 50글자 내로 제한한다.
4. 제목 끝에 마침표를 찍지 않는다.
5. 제목은 명령문으로 사용하며, 과거형을 사용하지 않는다.
6. 어떻게 보다는 무엇과 왜
7. 아래 표를  참고하여 접두로 사용한다.

| Type 키워드 | 사용 시점 |
| --- | --- |
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등)기능 수정이 없는 경우 |
| design | 사용자 UI 디자인 변경 (CSS 등) |
| test | 테스트 코드, 리팩토링 테스트 코드 추가 |
| refactor | 코드 리팩토링 |
| build | 빌드 파일 수정 |
| ci | CI 설정 파일 수정 |
| chore | 빌드 업무 수정, 패키지 매니저 수정 (gitignore 수정 등) |
| rename | 파일 혹은 폴더명을 수정만 한 경우 |
| remove | 파일을 삭제만 한 경우 |


### 코드관리 전략
- git-flow
  - `main` : 배포를 위한 브랜치
  - `develop` : 개발 소스의 최신 버전을 정리한 브랜치
  - `feature` : 신규 작업 수행 시 기본적으로 사용하는 브랜치

- 브랜치를 병합하기 전, `git fetch origin` 명령을 수행하여 최신버전을 반드시 확인한다.

- 커밋 메시지는 개인이 식별하기 쉽도록 자유롭게 작성하되,
develop 브런치에 반영할 때의 메세지는 `[작업자 이니셜] 작업내용 요약` 으로 통일한다.

- Pull Request는 최소 1개의 팀원 리뷰로 approve 상태일 때 merge할 수 있다.
