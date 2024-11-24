# 프론트엔드 
next.js를 이용하여 UI를 구현함

## 디렉토리 구조
![화면 캡처 2024-11-23 171055](https://github.com/user-attachments/assets/adf5f674-a0f7-489b-8b2f-ead92776c3ce)
- .github/workflows/docer-build.yml : GitHub Actions 워크플로우 파일로 CI를 진행할 때 사용하는 파일
- .next/ 아래에 있는 파일들은 Next.js로 빌드한 결과물
- node_modules/ 디렉토리는 PM 의존성 모듈을 저장하는 디렉토리
- public/ 아래에 있는 파일들은 정적 파일(이미지, 아이콘, 폰트 등)
- src/ 디렉토리는 프로젝트의 소스 코드들을 관리함
  - component/ 아래에 있는 파일들은 는 재사용 가능한 UI 컴포넌트
  - pages/는 서비스를 실행했을 때 페이지에 해당되는 소스 코드들을 가지고 있음 
- Dockerfile은 해당 프로젝트를 컨테이너 이미지로 만들기 위해서 존재하는 설정파일
- next.config.js 파일은 next.js 설정 파일
- tailwind.config.js 파일은 TailwindCSS 사용자 정의 설정 파일

## 사용한 플로그인
- Swiper : 좌우 슬라이드를 위해서 사용됨
- 
## 주요 코드 리뷰

### 메인 페이지
- 목표 데이터 관리
  ```
    useEffect(() => {
      (async () => {
        const { data } = await getGoals();
        setGoals(data);
      })();
    }, []);
  ```
  - 목표와 하위 목표 데이터를 getGoals API 호출을 통해서 불러오고, 해당 데이터를 표시함
  - 데이터는 goals 형태로 저장하며, 각 목표의 이름, 완료 상태, 하위 목표들을 표시함
 
- 목표 및 하위 목표 표시
  ```
    goals.map((goal) => (
    <div className="swiper-slide" key={goal.id}>
      <Link href={`/goals/${goal.id}`}>
        <p className="text-[#333] text-[2rem]">{goal.name}</p>
        <div className="w-full bg-[#F4F4F5] rounded-full h-5 mt-4">
          <div className="bg-[#333] h-full rounded-full" style={{ width: `${Math.round(goal.complete / goal.totals * 100) || 0}%` }}></div>
        </div>
        <p>{Math.round(goal.complete / goal.totals * 100) || 0}% of goals completed</p>
      </Link>
      <div>
        {goal.subGoals.map((subGoal) => (
          <Link href={`/goals/${goal.id}/sub-goals/${subGoal.id}`} key={subGoal.id}>
            <p>{subGoal.name}</p>
            <div className="w-full bg-[#F4F4F5] rounded-full h-3 mt-4">
              <div className="bg-[#333] h-full rounded-full" style={{ width: `${Math.round(subGoal.complete / subGoal.totals * 100) || 0}%` }}></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ))
  ```
  - goal이 메인 목표이며, 이름과 진행도를 막대 형태와 % 형태로 표기함
  - subGoal은 서브 목표이며, 메인 목표에 대한 서브 목표를 불러오는 형태이다.
  - 서브 목표도 마찬가지로 이름과 진행도를 막대 형태와 % 형태로 표기함
  
- Swiper 초기화
  ```
    useEffect(() => {
    const swiper = new Swiper(".swiper", {
      modules: [Navigation, Pagination],
      pagination: {
        el: '.swiper-pagination',
      },
    });
    return () => {
      swiper.destroy(); 
    };
  }, []);
  ```
  - Swiper를 초기화하고 컴포넌트가 없을 경우에는 메모리 누수를 방지하기 위해서 슬라이더를 제거하는 역할
  - .swiper라는 class에 Swiper를 적용한다고 매개변수로 선언이 되어 있음
  - Pagination 모듈을 이용하여 하단에 페이지네이션을 표시함
 
- 목표 추가 다이얼로그
  ```
  const [isSetupGoalOpen, setSetupGoalOpen] = useState<boolean>(false);
  const openSetupGoal = useCallback(() => {
    setSetupGoalOpen(true);
  }, []);
  const closeSetupGoal = useCallback(() => {
    setSetupGoalOpen(false);
  }, []);

  .........

  const complete = useCallback(() => {
    (async () => {
      const { data } = await getGoals();
      setGoals(data);
    })();
  }, []);
  ```
  - SetupGoalDialog(목표 추가 용도)를 열고 닫는 상태 관리
    - 상태는 isSetupGoalOpen으로 관리하고, 열고 닫는 이벤트는 각각 openSetupGoal과 closeSetupGoal로 관리함
  - 다이얼로그가 완료되면 새로운 목표 데이터를 다시 가져오기 위해서 complete 콜백 호출
