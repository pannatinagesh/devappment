import { Button } from "@/components/custom/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { _getAllTask } from "@/redux/actions/task";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateEditTask from "./CreateEditTask";

type open = {
  open: boolean;
  id: null | number;
}

const ListTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { taskDetails, isloadingById } = useAppSelector((root) => root.task);
  const [open, setOpen] = useState<open>({ open: false, id: null });

  useEffect(() => {
    dispatch(_getAllTask({ navigate }))
  }, [])

  const handleOpenChange = () => {
    setOpen({ open: false, id: null })
  }

  const handleStatus = (status: string) => {
    switch (status) {
      case 'todo':
        return 'TODO'
      case 'in_progress':
        return 'In Progress'
      case 'done':
        return 'Completed'
    }
  }

  const handlePriority = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High'
      case 'medium':
        return 'Medium'
      case 'low':
        return 'Low'
    }
  }

  const handleConvertDate = (originalDate: Date | null) => {
    const dateObj = new Date(originalDate);

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC'
    }).format(dateObj);

    return formattedDate
  }
  return (
    <div className="h-full w-full p-4">
      <div className="flex justify-between items-center">
        <Label>User Task</Label>
        <Button onClick={() => setOpen({ open: true, id: null })}>Create Task</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Priority</TableHead>
            <TableHead className="text-right">Due Date</TableHead>
            <TableHead className="text-center">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isloadingById ?
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 7 }).map((_, colIndex) => (
                  <TableCell> <Skeleton key={colIndex} className="w-full h-4 bg-gray-300" /></TableCell>
                ))}
              </TableRow>
            ))
            : taskDetails.length > 0 && taskDetails.map((task, i) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell >{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell className="text-right">{handleStatus(task.status)}</TableCell>
                <TableCell className="text-right">{handlePriority(task.priority)}</TableCell>
                <TableCell className="text-right">{task.dueDate ? handleConvertDate(task.dueDate) : null}</TableCell>
                <TableCell className="text-center"><Button onClick={() => setOpen({ open: true, id: task.id })}>Edit</Button></TableCell>
              </TableRow>
            ))}
        </TableBody>

      </Table>

      <CreateEditTask open={open} handleOpenChange={handleOpenChange} />
    </div>
  )
};

export default ListTable;
