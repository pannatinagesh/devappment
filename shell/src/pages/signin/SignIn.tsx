import { Button } from '@/components/custom/button'
import Iconify from '@/components/custom/iconify'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { _login } from '@/redux/actions/signin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

type FormValues = z.infer<typeof FormSchema>

const defaultValues: FormValues = { email: '', password: '' }

const SignIn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isloading } = useAppSelector((root) => root.signin)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues,
  })

  const { errors } = form.formState

  const handleSubmit = async (data: FormValues) => {
    const result = await dispatch(
      _login({ value: { email: data.email, password: data.password }, navigate })
    )

    if (_login.fulfilled.match(result)) {
      toast.success('Signed in successfully.')
      navigate('/dashboard')
    } else {
      const payload = result.payload as { message?: string } | undefined
      toast.error(payload?.message || 'Invalid email or password.')
    }
  }

  return (
    <div className='h-screen w-full'>
      <div className='grid h-full grid-cols-1 lg:grid-cols-2'>
        {/* Brand / illustration panel */}
        <div className='relative hidden lg:block h-screen'>
          <img
            src={'/image.jpg'}
            alt='Devappment'
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-0 bg-[#001b71]/40' />
          <div className='absolute bottom-10 left-10 right-10 text-white'>
            <h2 className='text-3xl font-bold'>Devappment</h2>
            <p className='mt-2 max-w-md text-sm text-white/90'>
              Manage your tasks, track your team, and stay productive — all in
              one place.
            </p>
          </div>
        </div>

        {/* Form panel */}
        <div className='flex items-center justify-center h-screen p-6 sm:p-10'>
          <div className='w-full max-w-sm'>
            <div className='mb-8 flex flex-col items-center text-center'>
              <img
                src={'/logo.jpg'}
                alt='Logo'
                className='mb-4 h-12 w-12 rounded-md object-cover'
              />
              <h1 className='text-2xl font-bold text-[#001b71]'>Welcome back</h1>
              <p className='mt-1 text-sm text-muted-foreground'>
                Sign in to continue to your dashboard
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='flex flex-col gap-4'
              noValidate
            >
              <div className='flex flex-col gap-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  autoComplete='email'
                  placeholder='you@example.com'
                  aria-invalid={!!errors.email}
                  {...form.register('email')}
                />
                {errors.email ? (
                  <p className='text-xs text-destructive'>{errors.email.message}</p>
                ) : null}
              </div>

              <div className='flex flex-col gap-1.5'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'>Password</Label>
                  <button
                    type='button'
                    className='text-xs text-[#001b71] hover:underline'
                    onClick={() => toast.info('Password reset coming soon.')}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    placeholder='Enter your password'
                    className='pr-10'
                    aria-invalid={!!errors.password}
                    {...form.register('password')}
                  />
                  <Iconify
                    icon={showPassword ? 'tabler:eye-off' : 'tabler:eye'}
                    className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </div>
                {errors.password ? (
                  <p className='text-xs text-destructive'>
                    {errors.password.message}
                  </p>
                ) : null}
              </div>

              <Button
                type='submit'
                size='lg'
                loading={isloading || form.formState.isSubmitting}
                className='mt-2 w-full'
              >
                Sign In
              </Button>
            </form>

            <p className='mt-6 text-center text-sm text-muted-foreground'>
              Don&apos;t have an account?{' '}
              <button
                type='button'
                className='font-medium text-[#001b71] hover:underline'
                onClick={() => navigate('/sign-up')}
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
