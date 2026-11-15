import { Button } from "@/components/custom/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { _getAllTask, _getByIdTask, _postTask, _putTask } from "@/redux/actions/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from 'zod';

const FormSchema = z.object({
    id: z.number().optional().nullable(),
    title: z.string().trim().min(2, "Title must contain at least 2 characters").max(100, "Title cannot exceed 100 characters"),
    description: z.string().max(2000, "Description cannot exceed 2000 characters"),
    status: z.enum(["todo", "in_progress", "done"]),
    priority: z.enum(['high', 'medium', 'low']),
    due_date: z
        .string({ error: "Due date is required" })
        .min(1, "Due date is required")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date")
        .refine((value) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            // parse as local date to avoid timezone shifting
            const [year, month, day] = value.split("-").map(Number);
            const picked = new Date(year, month - 1, day);
            return picked >= today;
        }, "Due date cannot be in the past")
});

const defaultValue = { title: '', description: '', status: "todo" as const, priority: 'low' as const, due_date: '' }

const CreateEditTask = ({ open, handleOpenChange }: { open: { open: boolean, id: number | null }, handleOpenChange: () => void }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { taskIdDetails }: any = useAppSelector((root) => root.task);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: 'onChange',
        defaultValues: defaultValue
    })

    const { errors } = form.formState;
    console.log(form.getValues())

    useEffect(() => {
        if (open && open.id) {
            dispatch(_getByIdTask({ id: open.id, navigate }))
        }
    }, [open.id])

    useEffect(() => {
        if (taskIdDetails && taskIdDetails.data && taskIdDetails.data.status) {
          form.reset({...taskIdDetails.data.data})
        }
    }, [taskIdDetails])

    const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
        if (data.id) {
            const { payload }: any = await dispatch(_putTask({ id: data.id, value: data, navigate }))
            if (payload && payload.data && payload.data.status) {
                toast("Task Updated Succesfully")
                form.reset(defaultValue)
                handleOpenChange()
                dispatch(_getAllTask({ navigate }))
            }
            else {
                toast.error(payload?.data?.message || 'Please Try Again')
            }
        }
        else {
            const { payload }: any = await dispatch(_postTask({ data, navigate }))
            if (payload && payload.data && payload.data.status) {
                toast("Task Created Succesfully")
                form.reset(defaultValue)
                handleOpenChange()
                dispatch(_getAllTask({ navigate }))
            }
            else {
                toast.error(payload?.data?.message || 'Please Try Again')
            }
        }
    }

    return (
        <Dialog open={open.open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>Create Task</DialogHeader>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input placeholder="Enter Title" {...form.register("title")} />
                        {errors.title ? (
                            <p className="mt-1 text-xs text-destructive">{errors.title.message}</p>
                        ) : null}
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input placeholder="Enter Description" {...form.register("description")} />
                        {errors.description ? (
                            <p className="mt-1 text-xs text-destructive">{errors.description.message}</p>
                        ) : null}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label>Status</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                {...form.register("status")}
                            >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            {errors.status ? (
                                <p className="mt-1 text-xs text-destructive">{errors.status.message}</p>
                            ) : null}
                        </div>
                        <div>
                            <Label>Priority</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                {...form.register("priority")}
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            {errors.priority ? (
                                <p className="mt-1 text-xs text-destructive">{errors.priority.message}</p>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <Label>Due Date</Label>
                        <Input type="date" value={form.watch('due_date') ? form.watch('due_date').split('T')[0] : null}
                         onChange={(e) => form.setValue('due_date', e.target.value)} />
                        {errors.due_date ? (
                            <p className="mt-1 text-xs text-destructive">{errors.due_date.message}</p>
                        ) : null}
                    </div>
                    <DialogFooter className="flex items-end justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => handleOpenChange()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting} className="cursor-pointer">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
};

export default CreateEditTask;
