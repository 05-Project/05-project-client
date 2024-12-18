import {
  updateGoal,
} from "@/actions";
import { categories } from "@/utils";
import {
  SubmitHandler,
  useForm,
} from "react-hook-form";

type GoalForm = {
  category: string,
  name: string,
}
type EditGoalProps = {
  goalId: number,
  category: string,
  name: string,
  onComplete: () => void,
}
export function EditGoal({
  goalId,
  category,
  name,
  onComplete,
}: EditGoalProps) {
  const { register, handleSubmit } = useForm<GoalForm>({ defaultValues: { name, category } });
  const onSubmit: SubmitHandler<GoalForm> = async (body) => {
    const { success } = await updateGoal(goalId, body.name, body.category);
    if (success) {
      onComplete();
    }
  };
  return (
    <form id="edit-goal" className="flex flex-col mx-5" onSubmit={handleSubmit(onSubmit)}>
      <select className="w-40" {...register("category", { required: true })}>
        {Object.keys(categories).map((key) => (
          <option value={(categories as any)[key]}>{key}</option>
        ))}
      </select>
      <input placeholder="Enter goal" className="border-b text-xl mt-2" {...register("name", { required: true })} />
    </form>
  );
}
