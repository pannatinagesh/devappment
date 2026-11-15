import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { _getuser_details, _postUserDetails, _putUserDetails } from "@/redux/actions/userDetails";
import { Fragment, startTransition, useEffect, useRef, useState, ViewTransition } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";

interface User {
  id?: number;
  user_name: string;
  user_email: string;
}

const getInitials = (name?: string) => {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const FormSchema = z.object({
  id: z.number().optional().nullable(),
  user_name: z.string().min(1, 'User Name is Required'),
  user_email: z.email().min(1, 'User Email is Required')
});

const UserDetails = () => {
  const { userDetails, isloading } = useAppSelector((state) => state.userDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const fragment = useRef(null);
console.log(fragment.current)
  const [showDetails, setShowDetails] = useState(false);

  function toggleDetails() {
    startTransition(() => {
      setShowDetails((previous) => !previous);
    });
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: { user_email: '', user_name: '' }
  })

  const { errors } = form.formState

  useEffect(() => {
    dispatch(_getuser_details({ navigate }));
  }, []);

  const users: User[] = Array.isArray(userDetails) ? userDetails : [];

  const handleCreate = () => {
    form.reset({ user_name: '', user_email: '' })
    setOpen(true)
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      form.reset({ user_name: '', user_email: '' })
    }
    setOpen(next)
  }

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (data.id) {
      const { payload }: any = await dispatch(_putUserDetails({ id: data.id, value: data, navigate }))
      if (payload && payload.data && payload.data.status) {
        toast("User Updated Succesfully")
        form.reset({ user_name: '', user_email: '' })
        setOpen(false)
        dispatch(_getuser_details({ navigate }))
      }
      else {
        toast.error(payload?.data?.message || 'Please Try Again')
      }
    }
    else {
      const { payload }: any = await dispatch(_postUserDetails({ data, navigate }))
      if (payload && payload.data && payload.data.status) {
        toast("User Created Succesfully")
        form.reset({ user_name: '', user_email: '' })
        setOpen(false)
        dispatch(_getuser_details({ navigate }))
      }
      else {
        toast.error(payload?.data?.message || 'Please Try Again')
      }
    }
  }

  const handleEditUser = (val: z.infer<typeof FormSchema>) => {
    form.reset({ ...val })
    setOpen(true)
  }

  return (
    <div className="space-y-4 p-4 md:p-6">

       <button onClick={toggleDetails}>
        {showDetails ? "Hide details" : "Show details"}
      </button>

      {showDetails && (
        <ViewTransition>
          <article
            style={{
              padding: 20,
              marginTop: 12,
              background: "#eef2ff",
              borderRadius: 12,
            }}
          >
            <h2>Invoice INV-101</h2>
            <p>Customer: Example Exports</p>
            <p>Amount: ₹50,000</p>
          </article>
        </ViewTransition>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage and review registered users.
          </p>
        </div>
        {!isloading && (
          <Fragment ref={fragment}>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {users.length} {users.length === 1 ? "user" : "users"}
            </span>
            <Button onClick={handleCreate} className="cursor-pointer">Create</Button>
          </Fragment>
        )}
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-16 text-center">#</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isloading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell className="text-center">
                    <Skeleton className="mx-auto h-8 w-8 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                </TableRow>
              ))
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={user?.id ?? index}>
                  <TableCell className="text-center text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(user?.user_name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {user?.user_name ?? "-"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user?.user_email ? (
                      <a
                        href={`mailto:${user.user_email}`}
                        className="hover:text-foreground hover:underline"
                      >
                        {user.user_email}
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button className="cursor-pointer" onClick={() => handleEditUser(user)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>Create User</DialogHeader>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>User Name</Label>
                <Input placeholder="Enter User Name" {...form.register("user_name")} />
                {errors.user_name ? (
                  <p className="mt-1 text-xs text-destructive">{errors.user_name.message}</p>
                ) : null}
              </div>
              <div>
                <Label>User Email</Label>
                <Input type="email" placeholder="Enter User Email" {...form.register("user_email")} />
                {errors.user_email ? (
                  <p className="mt-1 text-xs text-destructive">{errors.user_email.message}</p>
                ) : null}
              </div>
            </div>
            <DialogFooter className="flex items-end justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting} className="cursor-pointer">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDetails;
