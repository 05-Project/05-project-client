"use client";
import Link from "next/link";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  SetupGoalDialog,
} from "@/components/setup-goal";
import {
  SwiperItem,
  SwiperList,
} from "@/components/swiper";
import { readGoals } from "@/actions";

export default function Page() {
  const [goals, setGoals] = useState<any[]>([]);
  const [isSetupGoalOpen, setSetupGoalOpen] = useState<boolean>(false);
  const openSetupGoal = useCallback(() => {
    setSetupGoalOpen(true);
  }, []);
  const closeSetupGoal = useCallback(() => {
    setSetupGoalOpen(false);
  }, []);


  useEffect(() => {
    (async () => {
      const { data } = await readGoals();
      setGoals(data);
    })();
  }, []);
  const complete = useCallback(() => {
    (async () => {
      const { data } = await readGoals();
      setGoals(data);
    })();
  }, []);
  return (
    <div>
      <div className="mx-5 mt-16 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-[2rem]">Home</h1>
          <button onClick={openSetupGoal}>
            <Image src={"/plus.svg"} width={24} height={24} alt="create new plan" />
          </button>
        </div>
      </div>
      <SwiperList
        className="mb-16"
      >
        {goals.map((goal) => (
          <SwiperItem
            key={goal.id}
          >
            <div className="mx-5">
              <Link href={`/goals/${goal.id}`} className="border rounded-xl border-[#E5E7EB] w-full h-32 p-4 block">
                <p className="text-[#333] text-[2rem]">{goal.name}</p>
                <div className="w-full bg-[#F4F4F5] rounded-full h-5 mt-4">
                  <div className="bg-[#333] h-full rounded-full" style={{ "width": `${Math.round(goal.complete / goal.totals * 100) || 0}%` }}></div>
                </div>
                <p className="text-[#71717A] text-[0.625rem]">{Math.round(goal.complete / goal.totals * 100) || 0}% of goals completed</p>
              </Link>
              <p className="text-2xl text-[#333] mt-4 mb-2">Sub goals</p>
              <div className="flex flex-col">
                {goal.subGoals.map((subGoal: any) => (
                  <Link href={`/goals/${goal.id}/sub-goals/${subGoal.id}`} className="border rounded-lg border-[#E5E7EB] w-full h-24 p-4 my-2" key={subGoal.id}>
                    <p className="text-[#333333] text-xs font-medium">{subGoal.name}</p>
                    <div className="w-full bg-[#F4F4F5] rounded-full h-3 mt-4">
                      <div className="bg-[#333] h-full rounded-full" style={{ "width": `${Math.round(subGoal.complete / subGoal.totals * 100) || 0}%` }}></div>
                    </div>
                    <p className="text-[#71717A] text-[0.625rem]">{Math.round(subGoal.complete / subGoal.totals * 100) || 0}% of goals completed</p>
                  </Link>
                ))}
              </div>
            </div>
          </SwiperItem>
        ))}
      </SwiperList>

      <SetupGoalDialog isOpen={isSetupGoalOpen} onClose={closeSetupGoal} onComplete={complete} />
    </div>
  );
}
