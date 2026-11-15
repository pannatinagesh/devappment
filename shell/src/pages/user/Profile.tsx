import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

// Assumes your backend provides POST /api/profile.
async function saveProfile(previousState, formData) {
    console.log(formData)
    console.log(previousState)
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    return { message: "Please enter your name." };
  }

  try {
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    return {
      message: response.ok
        ? "Profile saved."
        : "Unable to save profile.",
    };
  } catch {
    return { message: "Network error. Please try again." };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default function ProfileForm() {
  const [state, formAction, isPending] = useActionState(
    saveProfile,
    { message: "Profile" }
  );

  console.log(state)

  return (
    <div className="p-3">
    <form action={formAction} aria-busy={isPending}>
        <div className="flex flex-col gap-2">
      <label>
        Name
        <Input name="name" required />
      </label>

      <SubmitButton />
      </div>
      <p role="status">{state.message}</p>
    </form>
    </div>
  );
}